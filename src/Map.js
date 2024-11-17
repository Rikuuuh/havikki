import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import greenMarker from './images/green-marker.png';
import redMarker from './images/red-marker.png';

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
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 15);
    }
  }, [selectedLocation, mapRef]);

  return (
    <MapContainer center={[selectedLocation.lat, selectedLocation.lng]} zoom={13} style={{ height: '500px', width: '500px' }} whenCreated={mapInstance => { mapRef.current = mapInstance; }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={location.waste !== '0kg' ? greenIcon : redIcon}
          eventHandlers={{
            click: () => {
              onMarkerClick(location);
            },
          }}
        >
          <Popup>
            <h2>{location.name}</h2>
            <p>Jäljellä oleva hävikki: {location.waste}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;