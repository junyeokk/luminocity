import { useState, useEffect } from "react";
import csvData from "../assets/jsonData/markers.json";

const useBannerRanking = () => {
  const [bannerRankings, setBannerRankings] = useState([]);

  useEffect(() => {
    const bannerResults = csvData
      .map((marker) => ({
        name: marker.markerName,
        points:
          marker.total_population_202310 +
          marker.total_population_202311 +
          marker.total_population_202312,
      }))
      .sort((a, b) => b.points - a.points);

    setBannerRankings(bannerResults);
  }, []);

  return bannerRankings;
};

export default useBannerRanking;
