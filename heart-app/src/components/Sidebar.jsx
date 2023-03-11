import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex-1 min-w-min w-1/6 min-h-screen bg-white">
      <Link to="/home">
        <div className="flex justify-center items-center p-2 bg-grey h-28">
          <img
            className="object-cover"
            src={require("../assets/logo.png")}
            alt="logo"
          />
        </div>
      </Link>
      <ul className="p-5">
        <p className="text-lg font-bold text-lightGrey mb-3 font-playfair">
          Menu
        </p>
        <Link to="/home">
          <li className="flex items-center mb-5">
            <DashboardIcon className="icon mr-2" />
            <span className="font-playfair">Dashboard</span>
          </li>
        </Link>
        <Link to="/patients">
          <li className="flex items-center mb-5">
            <AccountBoxIcon className="icon mr-2" />
            <span className="font-playfair">Patients</span>
          </li>
        </Link>
        <Link to="/assessment">
          <li className="flex items-center mb-5">
            <LocalHospitalIcon className="icon mr-2" />
            <span className="font-playfair">Assessment</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
