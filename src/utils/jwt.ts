import jwt from "jsonwebtoken";

export type Payload = {
  id: number;
  email: string;
  password: string;
};

const secret = process.env.JWT_SECRET;

export const signToken = (payload: Payload) => jwt.sign(payload, secret);

export const verifyToken = (token: string) => jwt.verify(token, secret);
