const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { mobile, otp } = JSON.parse(event.body);

    if (!mobile || !otp) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Mobile and OTP required" }),
      };
    }

    // Fetch OTP record
    const { data, error } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("mobile", mobile)
      .eq("otp", otp)
      .single();

    if (error || !data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid OTP" }),
      };
    }

    // Check expiry
    if (new Date(data.expires_at) < new Date()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "OTP expired" }),
      };
    }

    // Delete OTP after verification
    await supabase.from("otp_codes").delete().eq("id", data.id);

    // Generate JWT token
    const token = jwt.sign(
      { mobile },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token,
      }),
    };
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "OTP verification failed",
        details: error.message,
      }),
    };
  }
};