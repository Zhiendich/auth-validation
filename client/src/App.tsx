import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Users from "./pages/Users";
import { useActions } from "./hooks/useActions";
import { useAppSelector } from "./hooks/useTypedSelector";
import { IUser } from "./types/user";
import Home from "./pages/Home";

function App() {
  const { getUser } = useActions();
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getUser();
    }
  }, []);
  const [user, setUser] = React.useState<IUser | null | undefined>(null);
  const currentUser = useAppSelector((state) => state.authReducer.user);
  React.useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/registration"
        element={user ? <Navigate to="/" replace /> : <Registration />}
      />

      <Route
        path="/"
        element={window.localStorage.getItem("token") ? <Home /> : <Login />}
      >
        <Route path="edit" element={<EditUser />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
