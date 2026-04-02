const Razorpay = require("razorpay");

exports.handler = async function(event) {

  // Allow only POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    };
  }

  try {

    if (!event.body) {
      throw new Error("Request body is empty");
    }

    const { amount, currency } = JSON.parse(event.body);

    // Validate input
    if (!amount || !currency) {
      throw new Error("Missing required fields: amount and currency");
    }

    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid amount. Must be a positive number.");
    }

    // Read Razorpay credentials
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_live_RXhpUtbyMYatfE";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "P2egh0EAkEN2Kh95dMtJaY56";

    console.log("Razorpay credentials check:", {
      hasKeyId: !!keyId,
      hasKeySecret: !!keySecret,
      keyIdPrefix: keyId ? keyId.substring(0, 10) + "..." : "missing"
    });

    if (!keyId || !keySecret) {
      throw new Error("Razorpay credentials not configured in environment variables");
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: Math.round(amount), // amount already in paise
      currency: currency.toUpperCase(),
      receipt: `receipt_${Date.now()}`
    });

    // Success response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        order: order
      })
    };

  } catch (error) {

    console.error("Create order error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };

  }
}
