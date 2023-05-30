import React from "react";
import { IUser } from "../types/user";

const User = ({ fullName, _id, login, password }: IUser) => {
  return (
    <tr>
      <td>Имя пользователя : {fullName}</td>
      <td>Логин пользователя : {login}</td>
      <td>Зашифрованный пароль : {password}</td>
    </tr>
  );
};

export default User;
