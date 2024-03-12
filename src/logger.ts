import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    new Date().toUTCString(),
    req.method,
    req.path,
    JSON.stringify(req.headers),
    JSON.stringify(req.body),
  );
  next();
};
