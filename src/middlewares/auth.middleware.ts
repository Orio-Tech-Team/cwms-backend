import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
//
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // Verify Token
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        //
        next();
      } catch (error: any) {
        console.log(error);
        res.status(401);
        throw new Error(error.message);
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
export default protect;
