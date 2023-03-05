import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Assessment from "./pages/Assessment";
import Patient from "./pages/Patient";
import UpdatePatient from "./pages/UpdatePatient";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home/" element={<Home />} />
          <Route path="results/" index element={<Results />} />
          <Route path="assessment/" index element={<Assessment />} />
          <Route path="patients/">
            <Route index element={<Patient />} />
            <Route path=":patientId" index element={<UpdatePatient />} />
          </Route>

          {/* <Route path="patients/" index element={<Patient />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
