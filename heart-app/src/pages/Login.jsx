import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleValid = async (data) => {
    console.log(data);
    navigate("/home");
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1">
        <img
          className="object-cover h-full w-full"
          src={require("../assets/login-bg.jpg")}
          alt="logo"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-1/2 h-1/2 min-w-min min-h-min bg-white bg-blue-500 shadow-lg border rounded-lg flex justify-center items-center flex-col">
          <img
            className="mb-8"
            src={require("../assets/logo.png")}
            alt="logo"
          />
          <form
            onSubmit={handleSubmit(handleValid)}
            className="flex-col flex justify-center items-center"
          >
            <input
              className="mb-2 rounded-md p-2 border-2"
              placeholder="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red text-center">Password is required</p>
            )}
            <input
              className="rounded-md p-2 border-2"
              placeholder="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red text-center">Password is required</p>
            )}
            <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 p-2 w-full mt-5 rounded-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
