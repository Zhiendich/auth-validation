import { NextFunction, Request, Response } from "express";
import authService from "../services/authService.js";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, login, password } = req.body;
      const user = (await authService.registration(
        fullName,
        login,
        password
      )) as object;
      if ("error" in user) {
        throw new Error();
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Не удалось зарегестрировать пользователя" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const user = (await authService.login(login, password)) as object;
      if ("error" in user) {
        throw new Error();
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Неправильный логин или пароль" });
    }
  }
  async isUserAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await authService.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Не удалось получить пользователя" });
    }
  }
}

export default new AuthController();
