import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../auth";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    console.log("authMiddleware : session found :",session)
    res.status(401).json({
      message: "unauthorized",
    });

    return;
  }

  req.user = session.user;
  console.log("session in the middleware :",session)
  // console.log("req.user in the middleware :",req.user)
  next();
};

export default authMiddleware;

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   user?: { id: string; email: string; role: string };
// }

// export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "Missing token" });

//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token,  process.env.JWT_SECRET) as any;
//     req.user = { id: payload.id, email: payload.email, role: payload.role };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
