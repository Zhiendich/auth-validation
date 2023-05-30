import React from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useTypedSelector";

const EditUser = () => {
  const { updateUser } = useActions();
  const user = useAppSelector((state) => state.authReducer.user);
  const [error, setError] = React.useState<string | null>(null);
  const [login, setLogin] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user?._id && (login || fullName)) {
      updateUser({
        id: user._id,
        ...(login && { login }),
        ...(fullName && { fullName }),
      });
    } else {
      setError("Заполните хотя бы одно поле");
    }
  };
  return (
    <div>
      <h1 className="text-[25px] font-bold mb-2">Изменить данные</h1>
      <form className="flex flex-col justify-between h-[200px]">
        <Input
          fieldType="text"
          placeholder="Логин"
          value={login}
          setValue={setLogin}
        />
        <Input
          fieldType="text"
          placeholder="Полное имя"
          value={fullName}
          setValue={setFullName}
        />
        {error && <span className="text-[red]">{error}</span>}
        <Button onClick={changeHandler} text="Изменить" />
      </form>
    </div>
  );
};

export default EditUser;
