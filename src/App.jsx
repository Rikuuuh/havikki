import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Navbar from './components/Navbar';
import Map from './Map';
import SchoolTable from './SchoolTable';

const initialLocations = [
  { id: 1, name: 'Viikarin koulu', lat: 63.0745, lng: 27.6703, waste: { 'Lihapyörykät': '5 KG', 'Perunasose': '2,5 KG', 'Tomaattikastike': '5 KG', 'Salaatti': '2 KG' } },
  { id: 2, name: 'Saharan koulu', lat: 63.0748, lng: 27.676, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '5 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } },
  { id: 3, name: 'Päivärinteen koulu', lat: 63.077, lng: 27.681, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '0 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } }
];

const App = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const mapRef = useRef(null);
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
      <div className="">
        <Navbar userName={userName} />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            <Route path="/admin" element={<AdminPanel locations={locations} updateWaste={updateWaste} />} />
            <Route path="/" element={
              <div className="main-content">
                <Map locations={locations} selectedLocation={selectedLocation} onMarkerClick={handleLocationClick} mapRef={mapRef} />
                <SchoolTable locations={locations} selectedLocation={selectedLocation} onLocationClick={handleLocationClick} />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;