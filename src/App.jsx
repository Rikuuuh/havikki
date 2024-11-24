import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Navbar from './components/Navbar';
import Map from './Map';
import SchoolTable from './SchoolTable';
import Cart from './Cart';
import Footer from './components/Footer';

const initialLocations = [
  { id: 1, name: 'Viikarin koulu', lat: 63.0745, lng: 27.6703, waste: { 'Lihapyörykät': '5 KG', 'Perunasose': '2,5 KG', 'Tomaattikastike': '5 KG', 'Salaatti': '2 KG' } },
  { id: 2, name: 'Saharan koulu', lat: 63.0748, lng: 27.676, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '5 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } },
  { id: 3, name: 'Päivärinteen koulu', lat: 63.077, lng: 27.681, waste: { 'Lihapyörykät': '0 KG', 'Perunasose': '0 KG', 'Tomaattikastike': '0 KG', 'Salaatti': '0 KG' } }
];

const App = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [cartItems, setCartItems] = useState([]);  // Alusta cartItems tyhjäksi taulukoksi
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

  const handleAddToCart = (location) => {
    setCartItems(prevCartItems => [
      ...prevCartItems, 
      { name: location.name, amount: '1kg' }
    ]);
  };

  const handlePlaceOrder = () => {
    // Tee tilaus
  };

  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={userName} />
      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6 flex flex-col">
          <Routes>
            <Route path="/admin" element={<AdminPanel locations={locations} updateWaste={updateWaste} />} />
            <Route path="/" element={
              <div className="main-content flex-grow">
                <Map locations={locations} selectedLocation={selectedLocation} onMarkerClick={handleLocationClick} mapRef={mapRef} />
              </div>
            } />
          </Routes>
        </div>
        {location.pathname !== '/admin' && (
          <div className="lg:w-1/4 p-6 flex flex-col">
            <SchoolTable locations={locations} selectedLocation={selectedLocation} onLocationClick={handleLocationClick} onAddToCart={handleAddToCart} />
          </div>
        )}
        {location.pathname !== '/admin' && (
          <div className="lg:w-1/4 p-6 flex flex-col">
            <Cart cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;