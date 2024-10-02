import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";

// Define a generic error handler function
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof QueryFailedError) {
    // Handle database errors
    res
      .status(400)
      .json({ message: "Database query failed", details: err.message });
  } else {
    // Handle all other errors
    res
      .status(500)
      .json({ message: "Internal server error", details: err.message });
  }
};
