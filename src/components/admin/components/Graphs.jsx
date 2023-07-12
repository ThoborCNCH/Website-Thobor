import React, { useState } from "react";
// import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function Graphs() {
  const [chartData, setChartData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Sample Dataset",
        data: [
          1,66,45,30,98,87
        ],
        backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"],
      },
    ],
  });

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="adminpage">
      <div>
        <Chart type="line" data={chartData} />
      </div>
    </div>
  );
}

export default Graphs;
