import React from "react";
import Header from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidabar from "../components/Sidebar";

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("users");
  }, []);
  return (
    <div className="flex mx-3">
      <Sidabar />
      <Outlet />
    </div>
  );
};

export default Home;
