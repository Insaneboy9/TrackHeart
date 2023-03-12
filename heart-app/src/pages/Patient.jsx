import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Datatable from "../components/Datatable";
import Loader from "../components/Loader";
import ComfirmDialog from "../components/ConfirmDialog";

function Patient() {
  const { pathname } = useLocation();
  const [patientData, setPatientData] = useState();
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: () => {},
  });

  // close dialog on delete
  const onDeleteClick = (id) => {
    console.log("PRESS");
    setConfirmDialog({
      isOpen: true,
      title: "Delete",
      subtitle: "Are you sure to delete?",
      onConfirm: () => {
        deleteRow(id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const getPatientData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/fullData");
      setPatientData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const patientRows = patientData?.map((patient, index) => ({
    fullData: patient,
    no: index + 1,
    id: patient._id,
    age: patient.age,
    sex: patient.sex == 1 ? "Male" : "Female",
    exang: patient.exang == 1 ? "Yes" : "No",
    ca: patient.ca,
    cp:
      patient.cp == 1
        ? "Typical Angina"
        : patient.cp == 2
        ? "Atypical Angina"
        : patient.cp == 3
        ? "Non-anginal Pain"
        : "Asymptomatic",
    trtbps: patient.trtbps,
    chol: patient.chol,
    fbs: patient.fbs == 1 ? "True" : "False",
    ecg:
      patient.rest_ecg == 0
        ? "Normal"
        : patient.rest_ecg == 1
        ? "ST-T Wave Abnormality"
        : "Venticular Hypertrophy by Estes' Criteria",
    thalach: patient.thalach,
    output: patient.output == 1 ? "Yes" : "No",
  }));

  const patientColumns = [
    { field: "no", headerName: "NO", width: 70 },
    {
      field: "age",
      headerName: "Age",
    },
    {
      field: "sex",
      headerName: "Gender",
    },
    {
      field: "exang",
      headerName: "Execise induced Angina",
    },
    {
      field: "ca",
      headerName: "Number of Major Vessels",
    },
    {
      field: "cp",
      headerName: "Chest Pain Type",
    },
    {
      field: "trtbps",
      headerName: "Blood Pressure (mm Hg)",
    },
    {
      field: "chol",
      headerName: "Cholestoral (mg/dl)",
    },
    {
      field: "fbs",
      headerName: "Fasting Blood Sugar > 120mg",
    },
    {
      field: "ecg",
      headerName: "Resting Electrocardiographic Results",
    },
    {
      field: "thalach",
      headerName: "Maximum Heart Rate",
    },
    {
      field: "output",
      headerName: "Heart Attack",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <Link to={`/patients/${params.row.id}`} state={params.row.fullData}>
              <div className="p-1 border-2 border-green rounded-md text-green">
                View
              </div>
            </Link>
            <button
              onClick={() => {
                onDeleteClick(params.row.id);
              }}
            >
              <div className="border-red p-1 border-2 rounded-md text-red">
                Delete
              </div>
            </button>
          </div>
        );
      },
    },
  ];

  // delete a row
  const deleteRow = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      getPatientData();
      console.log(response);
    } catch (Error) {
      console.log(Error);
    }
  };

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6 flex flex-col">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        <div className="p-10 h-full">
          <h1 className="text-3xl font-opensans font-bold text-accentColor mb-10">
            Patient Table
          </h1>
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Loader className="w-12 h-12 text-indigo-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 text-center pt-6">
                Fetching latest table...
              </h1>
            </div>
          ) : (
            <Datatable columns={patientColumns} rows={patientRows} />
          )}
        </div>
      </div>
      <ComfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default Patient;
