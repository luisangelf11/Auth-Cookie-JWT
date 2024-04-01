import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
import { parse } from "cookie";

interface IPayload {
  iat: number,
  expo: number,
  username: string
  id: number
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
    // Parse the cookies
    const cookies = parse(req.headers.cookie || '');
    if(!cookies.myCookie) return res.status(404).json({"message": "Access denied!"});
  //Verify token
  const token = jwt.verify(cookies.myCookie, SECRET_KEY || "secret") as IPayload;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, token expired or incorrect" });
  req.userId = token.id.toString();   
  next();
};
