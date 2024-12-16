import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Use an environment variable for this in production

export const generateToken = (payload: object, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
