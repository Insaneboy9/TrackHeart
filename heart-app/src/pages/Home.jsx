import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import axios from "axios";
import Loader from "../components/Loader";
import BarChart from "../components/BarChart";
import GraphBarChart from "../components/GraphBarChart";

function Home() {
  const { pathname } = useLocation();
  const [chestData, setChestData] = useState();
  const [ecgData, setEcgData] = useState();
  const [ageData, setAgeData] = useState();
  const [loading, setLoading] = useState(true);

  const getChestData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/chestPainChartData"
      );
      setChestData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getEcgData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/ecgChartResult");
      setEcgData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAgeData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/ageChartData");
      setAgeData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    await Promise.all([getChestData(), getEcgData(), getAgeData()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="p-5 flex gap-x-4 justify-center items-cente h-96">
              <DonutChart
                title="Heart attack based on the type of Chest Pain"
                data={chestData}
              />
              <BarChart
                title="Heart Attack based on Resting Electrocardiographic"
                data={ecgData}
              />
            </div>
            <div className="p-5 flex gap-x-4 justify-center items-center h-xl">
              <GraphBarChart title="Heart Attack based on Age" data={ageData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
