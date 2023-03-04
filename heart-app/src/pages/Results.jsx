import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

function Results() {
  const { pathname } = useLocation();
  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title={pathname.slice(1).toUpperCase()} />
      </div>
    </div>
  );
}

export default Results;
