import crypto from "crypto";

export async function generateOTP() {
  const otp = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit OTP
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, hashedOtp };
}
