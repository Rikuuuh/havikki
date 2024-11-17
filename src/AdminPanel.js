import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ locations, updateWaste }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
  const [wasteAmounts, setWasteAmounts] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const menu = [
      {
        date: '18.11.2024 Maanantai',
        dishes: [
          { name: 'Lihapyörykät', remaining: '10 KG' },
          { name: 'Perunasose', remaining: '5 KG' },
          { name: 'Tomaattikastike', remaining: '2 KG' },
          { name: 'Salaatti', remaining: '3 KG' },
        ],
      },
      // Lisää muita päiviä ja ruokia tarvittaessa
    ];

    const initialWasteAmounts = {};
    menu[0].dishes.forEach(dish => {
      initialWasteAmounts[dish.name] = '0 KG';
    });
    setWasteAmounts(initialWasteAmounts);
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(parseInt(event.target.value));
  };

  const handleWasteChange = (event, dishName) => {
    setWasteAmounts({
      ...wasteAmounts,
      [dishName]: `${event.target.value} KG`,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateWaste(selectedLocation, wasteAmounts);
      setMessage('Hävikkimäärät päivitetty onnistuneesti!');
    } catch (error) {
      setMessage('Hävikkimäärien päivitys ei onnistunut!');
    }
    setWasteAmounts({});
  };

  const menu = [
    {
      date: '18.11.2024 Maanantai',
      dishes: [
        { name: 'Lihapyörykät', remaining: '10 KG' },
        { name: 'Perunasose', remaining: '5 KG' },
        { name: 'Tomaattikastike', remaining: '2 KG' },
        { name: 'Salaatti', remaining: '3 KG' },
      ],
    },
    // Lisää muita päiviä ja ruokia tarvittaessa
  ];

  return (
    <div className="admin-panel">
      <h1>{menu[0].date}</h1>
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
        <div className="menu-day">
          <table>
            <thead>
              <tr>
                <th>Ruoka</th>
                <th>Jäljellä (KG)</th>
              </tr>
            </thead>
            <tbody>
              {menu[0].dishes.map((dish, idx) => (
                <tr key={idx}>
                  <td>{dish.name}</td>
                  <td>
                    <input
                      type="number"
                      value={parseFloat(wasteAmounts[dish.name]) || 0}
                      onChange={(e) => handleWasteChange(e, dish.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Päivitä hävikkiruoan määrät!</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminPanel;