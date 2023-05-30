import React from "react";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useTypedSelector";
import User from "../components/User";

const Users = () => {
  const { getUsers } = useActions();
  const users = useAppSelector((state) => state.userReducer.users);
  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1 className="text-[35px] font-bold mb-2">
        Данные всех пользователей :
      </h1>
      {users && users.length > 0 ? (
        <table>
          <tbody>
            {users.map((user) => (
              <User
                fullName={user.fullName}
                _id={user._id}
                key={user._id}
                login={user.login}
                password={user.password}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-[25px] font-bold">Пользователей пока нет</h1>
      )}
    </div>
  );
};

export default Users;
