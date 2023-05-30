import { NextFunction, Response, Request } from "express";
import { IToken } from "../models/token.js";
import tokenServices from "../services/tokenService.js";
import dotenv from "dotenv";
dotenv.config();
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers?.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const data = tokenServices.validateToken(token) as IToken;
      if (req.params) {
        req.params.userId = data.id;
      }
      next();
    } catch (error) {
      return res.status(403).json({ message: "Нет доступа" });
    }
  } else {
    return res.status(403).json({ message: "Нет доступа" });
  }
};
