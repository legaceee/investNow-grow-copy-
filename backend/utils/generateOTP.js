import crypto from "crypto";

export const generateOTP = async () => {
  const otp = crypto.randomInt(10000, 99999).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  return { otp, hashedOtp };
};
