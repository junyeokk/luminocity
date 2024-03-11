/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState();
  const mapRef = useRef(null);

  useMap(mapRef, setSelectedMarker);

  useEffect(() => {
    if (selectedMarker) {
      alert(
        `[selected marker info]\n\nname: ${selectedMarker.markerName}\nlatitude: ${selectedMarker.latitude}\nlongitude: ${selectedMarker.longitude}\n`
      );
    }
  }, [selectedMarker]);

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
