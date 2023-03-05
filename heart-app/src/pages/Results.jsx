import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import { Empty } from 'antd';

function Results() {
  const { pathname, state } = useLocation();

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        <h1 className="text-center mt-10 mb-10 font-opensans text-3xl font-bold text-accentColor">
          PATIENT RESULT
        </h1>
        {state ? (
          <div className="w-full h-full flex justify-center items-center">
          <h1>No Patient Results</h1>
        </div>
        ):(
          <div className="flex justify-center items-center" >
          <div>
          <Empty style={{ fontSize: '3rem' }} 
      imageStyle={{ height: '15rem' }}/>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
