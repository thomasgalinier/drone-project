import React, { useEffect, useRef, useState } from "react";
import { TileLayer, Marker, MapContainer, Polyline } from "react-leaflet";
import 'leaflet-routing-machine';
import L from 'leaflet';
import DroneIcon from '../../asset/markerMap/drone-marker.svg';
import Markerurl from '../../asset/markerMap/marker.svg';

const MapComponent = () => {
  const pointA = [51.49, -0.09]; // Exemple de valeurs pour le point de départ
  const pointB = [51.51, -0.1]; // Exemple de valeurs pour le point final

  
  const [dronePosition, setDronePosition] = useState(pointA);
  const [flightPath, setFlightPath] = useState([]);
  
  const DroneMarkerIcon = new L.Icon({
    iconUrl: DroneIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  const MarkerIcon = new L.Icon({
    iconUrl: Markerurl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const calculateDistance = (coordA, coordB) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const lat1 = coordA[0];
    const lon1 = coordA[1];
    const lat2 = coordB[0];
    const lon2 = coordB[1];

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  
  useEffect(() => {
    const distance = calculateDistance(pointA, pointB);
    const step = 0.01;
    const numSteps = Math.floor(distance / step);
    const flightPath = [];
    for (let i = 0; i <= numSteps; i++) {
      const lat = pointA[0] + (pointB[0] - pointA[0]) * (i / numSteps);
      const lng = pointA[1] + (pointB[1] - pointA[1]) * (i / numSteps);
      flightPath.push([lat, lng]);
    }
    setFlightPath(flightPath);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < flightPath.length) {
        const newPosition = flightPath[stepIndex];
        setDronePosition(newPosition);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Mettre à jour toutes les secondes

    return () => clearInterval(interval);
  }, []);
  const position = [51.505, -0.09];
  console.log(flightPath);
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pointA} icon={MarkerIcon} />
      <Marker position={pointB} icon={MarkerIcon} />
      <Marker position={dronePosition} icon={DroneMarkerIcon} />
      <Polyline positions={flightPath} color="red" />
    </MapContainer>
  )}

export default MapComponent;
