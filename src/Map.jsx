import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import greenMarker from './images/green-marker.png';
import redMarker from './images/red-marker.png';
import './Map.css'; // Lisää tämä rivi

// Korjaa Leafletin oletusikonien ongelma
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: greenMarker,
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ locations, selectedLocation, onMarkerClick, mapRef }) => {
  return (
    <MapContainer center={[selectedLocation.lat, selectedLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }} whenCreated={mapInstance => { mapRef.current = mapInstance; }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater selectedLocation={selectedLocation} mapRef={mapRef} />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={Object.values(location.waste).some(amount => amount !== '0 KG') ? greenIcon : redIcon}
          eventHandlers={{
            click: () => {
              onMarkerClick(location);
            },
          }}
        >
          <Tooltip permanent>
            <span>{location.name}</span>
          </Tooltip>
          <Popup>
            <h2>{location.name}</h2>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const MapUpdater = ({ selectedLocation, mapRef }) => {
  const map = useMap();

  useMemo(() => {
    if (map) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 15, {
        animate: true,
        duration: 0.5, // Animaation kesto sekunneissa 
      });
    }
  }, [selectedLocation, map]);

  return null;
};

export default Map;