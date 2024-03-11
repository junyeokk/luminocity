import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PopulationChart = () => {
  const data = {
    labels: ["2023.10", "2023.11", "2023.12"],
    datasets: [
      {
        label: "평균 유동인구",
        data: [1200, 1350, 1500],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PopulationChart;
