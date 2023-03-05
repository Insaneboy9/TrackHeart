import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams, useLocation } from "react-router-dom";

function UpdatePatient() {
  const { patientId } = useParams();
  const { state } = useLocation();

  console.log(patientId, state);

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title="UPDATE PATIENT" />
      </div>
    </div>
  );
}

export default UpdatePatient;
