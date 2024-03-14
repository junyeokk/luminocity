/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import csvData from "../../assets/jsonData/markers.json";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};

const PopulationChart = ({ selectedMarkerId }) => {
  const extractChartData = () => {
    const labels = ["2023.10", "2023.11", "2023.12"];
    const selectedMarker = csvData.find(
      (marker) => marker.markerId === selectedMarkerId
    );

    const additionalMarkers = csvData
      .filter((marker) => marker.markerId !== selectedMarkerId)
      .map((marker) => ({
        ...marker,
        distance: calculateDistance(
          selectedMarker.latitude,
          selectedMarker.longitude,
          marker.latitude,
          marker.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);

    const datasets = selectedMarker
      ? [
          {
            label: selectedMarker.markerName,
            data: [
              selectedMarker.total_population_202310,
              selectedMarker.total_population_202311,
              selectedMarker.total_population_202312,
            ],
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            tension: 0.4,
          },
        ]
      : [];

    additionalMarkers.forEach((marker, index) => {
      datasets.push({
        label: marker.markerName,
        data: [
          marker.total_population_202310,
          marker.total_population_202311,
          marker.total_population_202312,
        ],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      });
    });

    return { labels, datasets };
  };

  const chartData = extractChartData();

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
        text: "지점별 유동 인구",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PopulationChart;
