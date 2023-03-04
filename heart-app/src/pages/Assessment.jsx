import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RadioButton from "../components/RadioButton";
import DropdownList from "../components/DropdownList";

function Assessment() {
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleValid = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6 mb-20">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        <h1 className="text-center mt-10 mb-10 font-opensans text-3xl font-bold text-accentColor">
          PATIENT INFORMATION
        </h1>
        <div className="bg-white w-4/6 flex justify-center items-center m-auto rounded-lg p-5 bg-blue-500 shadow-lg ">
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
              <p className="text-red text-center">{errors.age.message}</p>
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
              value={[0, 1, 2, 3]}
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
              value={[1, 2, 3, 4]}
            />
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
                placeholder="Enter blood pressure"
              />
            </div>
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
              value={[0, 1, 2]}
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
                placeholder="Enter blood pressure"
              />
            </div>
            <div className="w-full justify-center items-center flex">
              <button className="p-5 bg-red w-3/4 rounded-lg mt-10 mb-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
