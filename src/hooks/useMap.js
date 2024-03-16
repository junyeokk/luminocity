/* eslint-disable no-undef */
import { useEffect } from "react";
import markerData from "../assets/jsonData/markers.json";

export const useMap = (mapRef, setSelectedMarker) => {
  useEffect(() => {
    if (!mapRef.current) return;

    // 순위 매기기
    const calculateRankings = () => {
      return markerData
        .map((marker) => ({
          ...marker,
          totalPopulation:
            marker.total_population_202310 +
            marker.total_population_202311 +
            marker.total_population_202312,
        }))
        .sort((a, b) => b.totalPopulation - a.totalPopulation);
    };

    const getMarkerColor = (ranking, totalMarkers) => {
      const topRankPercentage = 0.1; // 상위 10퍼센트
      const bottomRankPercentage = 0.3; // 하위 30퍼센트

      if (ranking <= totalMarkers * topRankPercentage) return "#3CB043";
      if (ranking > totalMarkers * (1 - bottomRankPercentage)) return "#ED544A";
      return "#5858EE";
    };

    const sortedMarkers = calculateRankings();
    const totalMarkers = sortedMarkers.length;

    const map = new Tmapv3.Map(mapRef.current, {
      center: new Tmapv3.LatLng(36.019161, 129.343298),
      width: "100%",
      height: "100%",
      zoom: 13,
      pinchZoom: true,
      scrollwheel: true,
      zoomControl: true,
      httpsMode: true,
    });

    const addListenerToMarker = (marker, markerData) => {
      marker.on("click", () => {
        onMarkerClick(markerData);
      });
    };

    const onMarkerClick = (markerData) => {
      setSelectedMarker(markerData);
    };

    sortedMarkers.forEach((marker, index) => {
      const color = getMarkerColor(index + 1, totalMarkers);
      const position = new Tmapv3.LatLng(marker.latitude, marker.longitude);
      const mapMarker = new Tmapv3.Marker({
        position: position,
        title: marker.markerName,
        iconSize: new Tmapv3.Size(33, 43),
        color: color,
        map: map,
      });

      addListenerToMarker(mapMarker, marker);
    });
  }, [mapRef, setSelectedMarker]);
};
