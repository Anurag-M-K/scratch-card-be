import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Response } from "express";

export const store = async (
  req: any | any,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token available");
  }

  try {
    const decoded = jwt.verify(token, "istore") as {
      _id: string;
    };
    req.store = decoded;
    next();
  } catch (error) {
    res.status(401);
    console.log("Error decoding", error);
    throw new Error("Not authorized as staff, You cant access this resource");
  }
};
