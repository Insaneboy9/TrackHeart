import React from "react";
import ApexChart from "react-apexcharts";

function GraphBarChart({ title, data }) {
  // const cleanedData = data.filter((item) => item !== null);

  return (
    <div className="w-full h-full bg-white p-5 rounded-lg">
      <h1 className="text-accentColor font-bold text-2xl mb-10">{title}</h1>
      <ApexChart
        height="90%"
        width="100%"
        series={[
          {
            name: "Age Range",
            type: "column",
            data: data.map((item) => item.count),
          },
          {
            name: "Heart Attack",
            type: "line",
            data: data.map((item) => item.output),
          },
        ]}
        options={{
          colors: ["#3c40c6", "#ffd32a"],
          chart: {
            height: 350,
            type: "line",
          },
          stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: data.map((item) => item._id),
          yaxis: [
            {
              title: {
                text: "Age Range",
              },
            },
            {
              opposite: true,
              title: {
                text: "Heart Attack",
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default GraphBarChart;
