import React from "react";
import ApexChart from "react-apexcharts";

function BarChart({ title, data }) {
  return (
    <div className="w-1/2 bg-white p-5 rounded-lg h-full">
      <div className="">
        <h1 className="text-accentColor font-bold text-2xl">{title}</h1>
      </div>
      <ApexChart
        type="bar"
        height="90%"
        width="100%"
        series={[
          {
            data: data?.map((item) => item.output),
          },
        ]}
        options={{
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
          xaxis: {
            categories: data?.map((item) => item.label),
          },
          labels: {
            style: {
              fontSize: "12px",
            },
          },
          colors: ["#ff9f1a"],
        }}
      />
    </div>
  );
}

export default BarChart;
