/* eslint-disable no-undef */
import { useEffect } from "react";
import markerData from "../assets/jsonData/markers.json";
import aggregatedData from "../assets/jsonData/pohang/aggregated_population_rounded_202310.json";

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
      if (ranking <= totalMarkers * topRankPercentage) return "#F05650";
      if (ranking > totalMarkers * (1 - bottomRankPercentage)) return "#5858EE";
      return "#808080";
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

    const addHeatmap = () => {
      const heatmapData = [];
      const bounds = new Tmapv3.base.LatLngBounds();
      const maxPopulation = Math.max(
        ...aggregatedData.map((data) => data.population)
      );

      aggregatedData.forEach((data) => {
        const lng = data.longitude;
        const lat = data.latitude;
        const value = (data.population / maxPopulation) * 100;

        const heatmapObject = { lat, lng, value };
        heatmapData.push(heatmapObject);

        bounds.extend(new Tmapv3.LatLng(lat, lng));
      });

      console.log(heatmapData);

      const heatmap = new Tmapv3.extension.HeatMap({
        map: map,
        radius: 20,
        data: {
          data: heatmapData,
          max: 10,
        },
      });

      map.fitBounds(bounds);
      console.log("Heatmap created", heatmap);
    };

    map.on("ConfigLoad", function () {
      addHeatmap();
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
