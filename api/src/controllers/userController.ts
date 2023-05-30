import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(400).json({ message: "Пользователи не найдены" });
      }
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Не удалось получить пользователей" });
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.updateOne({ $set: req.body.newData });
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Не удалось изменить пользователя" });
    }
  }
}

export default new UserController();
