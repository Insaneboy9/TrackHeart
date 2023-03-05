import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import axios from "axios";

function Home() {
  const { pathname } = useLocation();
  const [chestData, setChestData] = useState();

  const getChestData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/chestPainChartData"
      );
      setChestData(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChestData();
  }, []);

  return (
    <div className="bg-bg flex">
      <Sidebar />
      <div className="w-5/6">
        <Navbar title={pathname.slice(1).toUpperCase()} />
        <div>
          <DonutChart title="" data={chestData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
