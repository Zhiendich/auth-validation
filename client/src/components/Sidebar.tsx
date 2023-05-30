import Button from "./UI/Button";
import { NavLink } from "react-router-dom";
import { logout } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";

const Sidabar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <div className="bg-[black] flex flex-col p-3 text-[white] text-center mr-3 w-[330px] h-[200px] mt-3">
      <NavLink to={"/edit"}>Редактировать данные о пользователе</NavLink>
      <NavLink to={"/users"} className="my-4">
        Все пользователи
      </NavLink>
      <Button
        className="border-[1px] border-[white]"
        text="Выйти из аккаунта"
        onClick={logoutHandler}
      />
    </div>
  );
};

export default Sidabar;
