import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar({ title }) {
  const navigate = useNavigate();
  const { username } = JSON.parse(window.localStorage.getItem("user"));
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="bg-white min-h-nav flex items-center justify-between">
      <div className="p-5">
        <span className="text-accentColor font-playfair text-3xl font-bold">
          {title}
        </span>
      </div>
      <div className="p-5 flex-">
        <span className="text-accentColor font-playfair">Welcome! </span>
        <span className="mr-5 font-playfair">{username}</span>
        <IconButton onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
