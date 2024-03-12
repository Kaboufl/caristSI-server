import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const SECRET_KEY = "JAIMELESLICORNESETLEURSJOLIESCORNES";

export const generateToken = (
  id: string,
  firstName: string,
  lastName: string,
): string => {
  return jwt.sign({ id, firstName, lastName }, SECRET_KEY, {
    expiresIn: "1 hours",
  });
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
