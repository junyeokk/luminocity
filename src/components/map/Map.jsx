/* eslint-disable no-undef */
import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

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

        mapInstance.current = map;

        // const addListenerToMarker = (marker, markerData) => {
        //   marker.on("click", () => onMarkerClick(markerData));
        // };

        if ("ontouchstart" in window) {
          map.addListener("touchstart", () => {});
        } else {
          map.addListener("click", () => {});
        }
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
