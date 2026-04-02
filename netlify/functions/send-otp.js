const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {

    const { mobile } = JSON.parse(event.body);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expires_at = new Date(Date.now() + 5 * 60 * 1000);

    await supabase.from("otp_codes").delete().eq("mobile", mobile);

    await supabase.from("otp_codes").insert([
      {
        mobile,
        otp,
        expires_at
      }
    ]);

    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: "otp",
        variables_values: otp,
        numbers: mobile
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "OTP sent"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send OTP",
        details: error.response ? error.response.data : error.message
      })
    };
  }
};