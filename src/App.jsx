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
  const [showPopup, setShowPopup] = useState(false);
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

  const handleUpdateCartItem = (newItems) => {
    setCartItems(newItems);
  };

  const handlePlaceOrder = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCartItems([]); // Tyhjennetään ostoskori
  };

  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={userName} />
      <div className="flex-grow flex flex-col lg:flex-row justify-center">
        <div className="lg:w-1/3 p-6 flex flex-col">
          <Routes>
            <Route path="/admin" element={<AdminPanel locations={locations} updateWaste={updateWaste} />} />
            <Route path="/havikki" element={
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
            <Cart cartItems={cartItems} onPlaceOrder={handlePlaceOrder} onUpdateCartItem={handleUpdateCartItem} userName={userName} selectedLocation={selectedLocation} />
          </div>
        )}
      </div>
      <Footer />
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Tilaus otettu vastaan</h2>
            <p>Nimellä: {userName}</p>
            <p>Koulu: {selectedLocation.name}</p>
            <p>Kilomäärä: {cartItems.reduce((total, item) => total + parseInt(item.amount), 0)}kg</p>
            <p>Voit hakea tilauksen 12.00-14.00 välisenä aikana.</p>
            <button onClick={handleClosePopup} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Sulje</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AppWrapper = () => (
  <Router basename="/havikki">
    <App />
  </Router>
);

export default AppWrapper;