import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Navbar from './Navbar';
import Map from './Map';
import SchoolTable from './SchoolTable';
import './App.css';

const initialLocations = [
  { id: 1, name: 'Viikarin koulu', lat: 63.083, lng: 27.672, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '0 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } },
  { id: 2, name: 'Saharan koulu', lat: 63.081, lng: 27.654, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '0 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } },
  { id: 3, name: 'Päivärinteen koulu', lat: 63.086, lng: 27.668, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '0 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } }
];

const App = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const userName = "Käyttäjä"; // Korvaa tämä kirjautuneen käyttäjän nimellä

  const updateWaste = (locationId, wasteAmounts) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === locationId ? { ...location, waste: { ...location.waste, ...wasteAmounts } } : location
      )
    );
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <Router>
      <div className="app">
        <Navbar userName={userName} />
        <Routes>
          <Route path="/admin" element={<AdminPanel locations={locations} updateWaste={updateWaste} />} />
          <Route path="/" element={
            <div className="main-content">
              <Map locations={locations} selectedLocation={selectedLocation} onMarkerClick={handleLocationClick} mapRef={{ current: null }} />
              <SchoolTable locations={locations} selectedLocation={selectedLocation} onLocationClick={handleLocationClick} />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;