import React from "react";
import ApexChart from "react-apexcharts";

function DonutChart({ title, data }) {
  return (
    <div className="w-1/2 bg-white p-5 rounded-lg h-full">
      <div className="">
        <h1 className="text-accentColor font-bold text-2xl">{title}</h1>
      </div>
      <ApexChart
        type="donut"
        height="90%"
        width="100%"
        series={data?.map((item) => item.output)}
        options={{
          chart: {
            height: 300,
            width: 400,
          },
          labels: data?.map((item) => item.label),
          colors: ["#ff3838", "#17c0eb", "#0be881", "#3c40c6"],
        }}
      />
    </div>
  );
}

export default DonutChart;
