/* eslint-disable no-undef */
import { useState, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { useMenuPanel } from "../../hooks/useMenuPanel";
import SidePanel from "../SidePanel";
import MenuPanel from "../MenuPanel";
import Legend from "../Legend";
import IconButton from "@mui/material/IconButton";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { isOpen: isMenuPanelOpen, toggleMenu: toggleMenuPanel } =
    useMenuPanel();
  const mapRef = useRef(null);

  useMap(mapRef, (markerData) => {
    setSelectedMarker(markerData);
    setIsSidePanelOpen(true);
  });

  const handleSidePanelClose = () => {
    setIsSidePanelOpen(false);
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
      <Legend />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleMenuPanel}
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "15px",
          "&:hover": {
            backgroundColor: "white",
            opacity: 0.8,
          },
        }}
      >
        <AnalyticsIcon fontSize="large" sx={{ color: "#353535" }} />
      </IconButton>

      <SidePanel
        selectedMarker={selectedMarker}
        isOpen={isSidePanelOpen}
        onClose={handleSidePanelClose}
      />
      <MenuPanel isOpen={isMenuPanelOpen} toggleMenuPanel={toggleMenuPanel} />
    </>
  );
};

export default Map;
