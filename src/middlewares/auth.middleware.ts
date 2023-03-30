import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request & { user?: { id?: string } },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized. Please provide a valid access token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as { userId: string };
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized. Invalid access token",
    });
  }
};

