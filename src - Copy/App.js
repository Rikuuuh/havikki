import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage';
import AdminPanel from './AdminPanel';
import Navbar from './Navbar';
import './App.css';

const initialLocations = [
  { id: 1, name: 'Viikarin koulu', lat: 63.083, lng: 27.672, waste: '0kg' },
  { id: 2, name: 'Saharan koulu', lat: 63.081, lng: 27.654, waste: '3kg' },
  { id: 3, name: 'Päivärinteen koulu', lat: 63.086, lng: 27.668, waste: '4kg' }
];

const App = () => {
  const [locations, setLocations] = useState(initialLocations);
  const userName = "Käyttäjä"; // Korvaa tämä kirjautuneen käyttäjän nimellä

  const updateWaste = (locationId, wasteAmount) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === locationId ? { ...location, waste: `${wasteAmount}kg` } : location
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Navbar userName={userName} />
        <Routes>
          <Route path="/admin" element={<AdminPanel locations={locations} updateWaste={updateWaste} />} />
          <Route path="/" element={<Home locations={locations} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;