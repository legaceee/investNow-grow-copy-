import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

export const signToken = (id, username) => {
  return jwt.sign(
    { id, username }, // payload
    SECRET_KEY, // secret
    { expiresIn: "1h" } // options
  );
};
