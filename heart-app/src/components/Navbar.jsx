import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar({ title }) {
  return (
    <div className="bg-white h-28 flex items-center justify-between">
      <div className="p-5">
        <span className="text-accentColor font-playfair text-3xl font-bold">
          {title}
        </span>
      </div>
      <div className="p-5 flex-">
        <span className="text-accentColor font-playfair">Welcome! </span>
        <span className="mr-5 font-playfair">Insaneboy9</span>
        <Link to="/">
          <ExitToAppIcon />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
