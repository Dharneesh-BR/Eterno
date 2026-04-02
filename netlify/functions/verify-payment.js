const crypto = require("crypto");
const admin = require("firebase-admin");

// Firebase Admin init (Netlify-safe)
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      orderData,
    } = JSON.parse(event.body);

    // Validate input
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !orderData?.courseId ||
      !orderData?.courseTitle
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
      };
    }

    // 🔐 Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid Razorpay signature",
        }),
      };
    }

    // ✅ Add course to My Courses
    const courseRef = db
      .collection("users")
      .doc(userId)
      .collection("courses")
      .doc(orderData.courseId);

    await courseRef.set(
      {
        courseId: orderData.courseId,
        courseTitle: orderData.courseTitle,
        status: "active",
        purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: razorpay_payment_id,
      },
      { merge: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Course added to My Courses",
      }),
    };
  } catch (error) {
    console.error("Verify payment error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};
