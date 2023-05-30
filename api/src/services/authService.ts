import bcrypt from "bcryptjs";
import tokenServices from "./tokenService.js";
import User from "../models/user.js";
class AuthService {
  async registration(fullName: string, login: string, password: string) {
    try {
      const findCandidate = await User.findOne({ login });
      if (findCandidate) {
        return { error: "Этот login уже занят" };
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        login,
        fullName,
        password: hashPassword,
      });
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      return { error: "Пользователь уже занят" };
    }
  }
  async login(login: string, password: string) {
    try {
      const user = await User.findOne({ login });
      if (user === null) {
        return { error: "Такого пользователя не существует" };
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return { error: "Неверный пароль" };
      }
      const token = tokenServices.generateToken({ id: user._id });
      return { token, user };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getUser(id: string) {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return { message: "Пользователь не найден" };
      }

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new AuthService();
