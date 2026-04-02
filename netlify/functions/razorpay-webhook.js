import crypto from "crypto";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "Ignored" };
  }

  try {
    const signature = event.headers["x-razorpay-signature"];
    const body = event.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return { statusCode: 200, body: "Invalid signature" };
    }

    const payload = JSON.parse(body);

    if (payload.event !== "payment.captured") {
      return { statusCode: 200, body: "Event ignored" };
    }

    const payment = payload.payload.payment.entity;

    await sgMail.send({
      to: payment.email,
      from: {
        email: "no-reply@svasam.com",
        name: "SVASAM",
      },
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        payment_id: payment.id,
        amount: (payment.amount / 100).toFixed(2),
        currency: payment.currency,
        method: payment.method,
      },
    });

    return { statusCode: 200, body: "Webhook handled" };
  } catch (error) {
    console.error("Webhook error:", error);
    return { statusCode: 200, body: "Error handled" };
  }
}
