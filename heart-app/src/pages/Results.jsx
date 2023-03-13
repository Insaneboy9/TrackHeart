import React from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Results() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        <h1 className="text-center mt-10 mb-10 font-opensans text-3xl font-bold text-accentColor">
          PATIENT RESULT
        </h1>
          <>
            <div className="flex justify-center items-center">
              {state.output[0]===1 ? (
                <div className="flex flex-col items-center space-y-2 w-1/2">
                  <motion.div
                    initial={{ scale: 10 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "linear", duration: 1 }}
                    className="flex flex-col items-center justify-center "
                  >
                    <CloseCircleFilled
                      style={{
                        fontSize: "98px",
                        height: "100px",
                        width: "100px",
                      }}
                      className="text-red mt-10 mb-10"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 2 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <h1 className="text-red text-2xl font-bold">
                      The patient has a high chance of heart attack
                    </h1>
                    <p className="text-center text-grey">
                      Please advise the patient to schedule an in-person
                      consultation at the hospital in order to obtain more
                      precise diagnostic outcomes and prevent potential
                      exacerbation of symptoms.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 w-1/2">
                  <motion.div
                    initial={{ scale: 10 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "linear", duration: 1 }}
                    className="flex flex-col items-center justify-center "
                  >
                    <CheckCircleFilled
                      style={{
                        fontSize: "98px",
                        height: "100px",
                        width: "100px",
                      }}
                      className="text-darkGreen mt-10 mb-10"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 2 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <h1 className="text-darkGreen text-2xl font-bold">
                      The patient has a low chance of heart attack
                    </h1>
                    <p className="text-center text-grey">
                      We advise notifying the patient that the incidence of
                      heart attack is relatively low. However, should any
                      symptoms arise, it is recommended to seek medical
                      attention promptly to prevent progression to advanced
                      stages.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
            <div className="w-full h-fit flex justify-center items-center mt-10">
              <motion.button
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 2 }}
                className="bg-red p-5 text-white rounded-2xl"
                onClick={() => navigate("/home")}
              >
                Go back to Home
              </motion.button>
            </div>
          </>
      </div>
    </div>
  );
}

export default Results;
