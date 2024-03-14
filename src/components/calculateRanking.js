/* eslint-disable no-unused-vars */
import csvData from "../assets/jsonData/markers.json";
const calculateRanking = (selectedMarkerId) => {
  const markerTotals = csvData.map((marker) => ({
    markerId: marker.markerId,
    totalPopulation:
      marker.total_population_202310 +
      marker.total_population_202311 +
      marker.total_population_202312,
  }));
  const sortedMarkers = markerTotals.sort(
    (a, b) => b.totalPopulation - a.totalPopulation
  );
  const ranking =
    sortedMarkers.findIndex((marker) => marker.markerId === selectedMarkerId) +
    1;
  return ranking;
};

export default calculateRanking;
