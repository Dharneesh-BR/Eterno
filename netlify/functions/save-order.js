// netlify/functions/save-order.js
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

// Initialize Firebase ONLY ONCE (outside handler)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Method Not Allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      items,
      guestInfo,
      address,
      status
    } = data;

    // Create deterministic doc id (helps avoid duplicates)
    const orderId = razorpay_payment_id || `order_${Date.now()}`;

    const orderData = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      items,
      guestInfo,
      address,
      status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Write to Firestore
    await setDoc(doc(db, "orders", orderId), orderData);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        orderId
      })
    };
  } catch (error) {
    console.error("Save order error:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}

