/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import markerData from "../../assets/jsonData/markers.json";
import Icon from "../../assets/markerIcon.png";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initTmap = async () => {
      try {
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

        markerData.forEach((marker) => {
          const position = new Tmapv3.LatLng(marker.latitude, marker.longitude);
          const mapMarker = new Tmapv3.Marker({
            position: position,
            title: marker.markerName,
            icon: Icon,
            iconSize: new Tmapv3.Size(33, 43),
            map: map,
          });

          mapMarker.addListener("click", () => {
            alert(`마커 위치: ${marker.name}`);
          });
        });
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    };

    initTmap();
  });

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        position: "fixed",
      }}
    />
  );
};

export default Map;
