import React, { useState, useRef } from 'react';
import Map from './Map';
import './HomePage.css';
import KuntaLogo from './Kunta.jpg'; // Tuo kuva src-hakemistosta

const Home = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const mapRef = useRef();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo([location.lat, location.lng], 15);
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo([location.lat, location.lng], 15);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={KuntaLogo} alt="Siilinjärvi logo" className="logo" />
        <h1 className="title">Hävikkisovellus</h1>
      </header>
      <div className="content">
        <div className="map-container">
          <Map
            locations={locations}
            selectedLocation={selectedLocation}
            onMarkerClick={handleMarkerClick}
            mapRef={mapRef}
          />
        </div>
        <div className="info-container">
          <h2>Koulut</h2>
          <ul className="school-list">
            {locations.map((location) => (
              <li
                key={location.id}
                onClick={() => handleLocationClick(location)}
                className={location.id === selectedLocation.id ? 'selected' : ''}
              >
                {location.name} ({location.waste})
              </li>
            ))}
          </ul>
          <div className="waste-info">
            <h3>{selectedLocation.name}</h3>
            <p>Jäljellä oleva hävikki: {selectedLocation.waste}</p>
          </div>
          <button
            className={`reserve-button ${selectedLocation.waste === '0kg' ? 'disabled' : ''}`}
            disabled={selectedLocation.waste === '0kg'}
          >
            Osta hävikki ruokaa {selectedLocation.name}sta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;