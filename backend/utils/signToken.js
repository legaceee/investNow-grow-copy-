import jwt from "jsonwebtoken";

export const signToken = (id, username) => {
  console.log("JWT_SECRET in signToken:", process.env.JWT_SECRET);

  return jwt.sign(
    { id, username }, // payload
    process.env.JWT_SECRET, // secret
    { expiresIn: "1h" } // options
  );
};
