import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const token = jwt.sign({ data: payload }, secret, {expiresIn} as SignOptions);
  return token;
};

export const jwtHelper = { generateToken };
