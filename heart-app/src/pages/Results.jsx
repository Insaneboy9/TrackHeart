import React from "react";
import { useLocation } from "react-router-dom";
import { Empty } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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
          <div className="flex justify-center items-center">
            {state.output ? (
              <div className="flex flex-col items-center space-y-2">
                <HeartOutlined style={{ fontSize: "48px", height: "64px", width: "64px" }} className="text-red mt-10" />
                <h1 className="text-red text-2xl font-bold">
                  The patient has a high chance of heart attack
                </h1>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <HeartOutlined style={{ fontSize: "48px", height: "64px", width: "64px" }} className="text-green mt-5 `" />
                <h1 className="text-green text-2xl font-bold">
                  The patient has a low chance of heart attack
                </h1>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div>
              <Empty
                style={{ fontSize: "3rem" }}
                imageStyle={{ height: "15rem" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
