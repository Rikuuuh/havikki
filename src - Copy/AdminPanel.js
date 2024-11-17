import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ locations, updateWaste }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
  const [wasteAmount, setWasteAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(parseInt(event.target.value));
  };

  const handleWasteChange = (event) => {
    setWasteAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateWaste(selectedLocation, wasteAmount);
      setMessage('Hävikkimäärä päivitetty onnistuneesti!');
    } catch (error) {
      setMessage('Hävikkimäärän päivitys ei onnistunut!');
    }
    setWasteAmount('');
  };

  return (
    <div className="admin-panel">
      <h2>Lisää hävikkimäärät</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Valitse koulu:</label>
          <select id="location" value={selectedLocation} onChange={handleLocationChange}>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="waste">Hävikkiruoan määrä (kg):</label>
          <input
            type="number"
            id="waste"
            value={wasteAmount}
            onChange={handleWasteChange}
            required
          />
        </div>
        <button type="submit">Päivitä hävikkiruoan määrä(kg)</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminPanel;