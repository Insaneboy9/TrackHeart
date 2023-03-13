import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import RadioButton from "../components/RadioButton";
import DropdownList from "../components/DropdownList";
import ComfirmDialog from "../components/ConfirmDialog";

function Assessment() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: () => {},
  });

  const handleValid = async (data) => {
    console.log(data);
    setConfirmDialog({
      isOpen: true,
      title: "Submit",
      subtitle: "Are you sure to submit?",
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:8080/predict",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // handle the data received from the backend
          const responseData = response.data;
          console.log(responseData);
          setLoading(false);
          navigate("/results", { state: { output: responseData } });
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      },
    });
  };
  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6 flex flex-col">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        {loading ? (
          <div className="w-full h-full flex flex-auto flex-col p-10 items-center justify-center">
            <Loader className="w-12 h-12 text-indigo-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 text-center pt-6">
              Running K Nearest Neighbour to get the most accurate result...
            </h1>
          </div>
        ) : (
          <>
            <h1 className="text-center mt-10 mb-10 font-opensans text-3xl font-bold text-accentColor">
              PATIENT INFORMATION
            </h1>
            <div className="bg-white w-4/6 flex justify-center items-center m-auto rounded-lg p-5 shadow-lg mb-20">
              <form className="w-1/2" onSubmit={handleSubmit(handleValid)}>
                <div className="mb-5 flex flex-col">
                  <span className="text-black text-opacity-60 mb-1">Age</span>
                  <input
                    {...register("age", {
                      required: "This field is required",
                    })}
                    className="w-full rounded-md p-2 border-2"
                    type="number"
                    min={0}
                    max={130}
                    placeholder="Enter an age"
                  />
                </div>
                {errors.age && (
                  <p className="text-red text-center mb-5">
                    {errors.age.message}
                  </p>
                )}
                <RadioButton
                  title="Gender"
                  label="sex"
                  register={register}
                  options={["male", "female"]}
                />
                <RadioButton
                  title="Exercise Induced Angina"
                  label="exang"
                  register={register}
                  options={["no", "yes"]}
                />
                <DropdownList
                  title="Number of Major Vessels"
                  label="ca"
                  register={register}
                  options={["0", "1", "2", "3"]}
                  value={["0", "1", "2", "3"]}
                />
                <DropdownList
                  title="Chest Pain Type"
                  label="cp"
                  register={register}
                  options={[
                    "Typical Angina",
                    "Atypical Angina",
                    "Non-anginal Pain",
                    "Asymptomatic",
                  ]}
                  value={["1", "2", "3", "4"]}
                />
                <DropdownList
                  title="Slope Value"
                  label="slp"
                  register={register}
                  options={["0", "1", "2"]}
                  value={["0", "1", "2"]}
                />
                <DropdownList
                  title="Thal Rate"
                  label="thall"
                  register={register}
                  options={["0", "1", "2", "3"]}
                  value={["0", "1", "2", "3"]}
                />
                <div className="mb-5 flex flex-col">
                  <span className="text-black text-opacity-60 mb-1">
                    Previous Peak
                  </span>
                  <input
                    {...register("oldpeak", {
                      required: "This field is required",
                    })}
                    className="w-full rounded-md p-2 border-2"
                    type="number"
                    step=".1"
                    min={0}
                    placeholder="Enter previous peak value"
                  />
                </div>
                <div className="mb-5 flex flex-col">
                  <span className="text-black text-opacity-60 mb-1">
                    Resting Blood Pressure (in mm Hg)
                  </span>
                  <input
                    {...register("trtbps", {
                      required: "This field is required",
                    })}
                    className="w-full rounded-md p-2 border-2"
                    type="number"
                    min={0}
                    placeholder="Enter blood pressure"
                  />
                </div>
                {errors.trtbps && (
                  <p className="text-red text-center mb-5">
                    {errors.trtbps.message}
                  </p>
                )}
                <div className="mb-5 flex flex-col">
                  <span className="text-black text-opacity-60 mb-1">
                    Cholestoral in mg/dl fetched via BMI sensor
                  </span>
                  <input
                    {...register("chol", {
                      required: "This field is required",
                    })}
                    className="w-full rounded-md p-2 border-2"
                    type="number"
                    min={0}
                    placeholder="Enter cholestoral level"
                  />
                </div>
                {errors.chol && (
                  <p className="text-red text-center mb-5">
                    {errors.chol.message}
                  </p>
                )}
                <RadioButton
                  title="Fasting Blood Sugar > 120 mg/dl"
                  label="fbs"
                  register={register}
                  options={["False", "True"]}
                />
                <DropdownList
                  title="Resting Electrocardiographic Results"
                  label="rest_ecg"
                  register={register}
                  options={[
                    "Normal",
                    "Having ST-T wave abnormality",
                    "Showing probable or definite left ventricular hypertrophy by Estes' criteria",
                  ]}
                  value={["0", "1", "2"]}
                />
                <div className="mb-5 flex flex-col">
                  <span className="text-black text-opacity-60 mb-1">
                    Maximum Heart Rate Achieved
                  </span>
                  <input
                    {...register("thalach", {
                      required: "This field is required",
                    })}
                    className="w-full rounded-md p-2 border-2"
                    type="number"
                    min={0}
                    placeholder="Enter max heart rate"
                  />
                </div>
                {errors.thalach && (
                  <p className="text-red text-center mb-5">
                    {errors.thalach.message}
                  </p>
                )}
                <div className="w-full justify-center items-center flex">
                  <button className="p-5 bg-red w-3/4 rounded-lg mt-10 mb-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <ComfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default Assessment;
