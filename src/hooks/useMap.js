/* eslint-disable no-undef */
import { useEffect } from "react";
import markerData from "../assets/jsonData/markers.json";
import Icon from "../assets/img/markerIcon.png";

export const useMap = (mapRef, setSelectedMarker) => {
  useEffect(() => {
    if (!mapRef.current) return;

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

    markerData.forEach((marker) => {
      const position = new Tmapv3.LatLng(marker.latitude, marker.longitude);
      const mapMarker = new Tmapv3.Marker({
        position: position,
        title: marker.markerName,
        icon: Icon,
        iconSize: new Tmapv3.Size(33, 43),
        map: map,
      });

      addListenerToMarker(mapMarker, marker);
    });
  }, [mapRef, setSelectedMarker]);
};
