/* eslint-disable no-undef */
import { useState, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import SidePanel from "../SidePanel";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const mapRef = useRef(null);

  useMap(mapRef, (markerData) => {
    setSelectedMarker(markerData);
    setIsOpen(true);
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
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
      <SidePanel
        selectedMarker={selectedMarker}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default Map;
