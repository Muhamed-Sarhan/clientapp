import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as L from "leaflet";

const MapView = ({ vehicles }) => {
  const map = useRef();
  const clusterLayer = useRef();

  useEffect(() => {
    clusterLayer.current?.remove();
    if (!map.current) {
      return;
    }

    if (clusterLayer && clusterLayer.current) {
      map.current.removeLayer(clusterLayer.current);
      clusterLayer.current?.remove();
    }

    clusterLayer.current = L.markerClusterGroup();

    vehicles.forEach((vehicle) =>
      L.marker(L.latLng(vehicle.lat, vehicle.long))
        .bindTooltip(`Vehicle Name is ${vehicle.name}`)
        .addTo(clusterLayer.current)
    );
    map.current.addLayer(clusterLayer.current);
  }, [vehicles]);

  useEffect(() => {
    const mapNode = ReactDOM.findDOMNode(document.getElementById("mapId"));

    if (!mapNode || map.current) {
      return;
    }
    map.current = L.map(mapNode).setZoom(11).setView(L.latLng(30.78, 31.0));
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
    }).addTo(map.current);
  }, []);
  return <div style={{ width: "100%", height: "100vh" }} id="mapId" />;
};

export default MapView;
