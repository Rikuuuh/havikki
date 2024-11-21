import React, { useState, useEffect } from 'react';

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
    <div className="mt-20 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{menu[0].date}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="location" className="block text-lg font-medium mb-2">Valitse koulu:</label>
          <select id="location" value={selectedLocation} onChange={handleLocationChange} className="w-full p-2 border border-gray-300 rounded-md">
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Ruoka</th>
                <th className="px-4 py-2 border-b">Jäljellä (KG)</th>
              </tr>
            </thead>
            <tbody>
              {menu[0].dishes.map((dish, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{dish.name}</td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      value={parseFloat(wasteAmounts[dish.name]) || 0}
                      onChange={(e) => handleWasteChange(e, dish.name)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Päivitä hävikkiruoan määrät!
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AdminPanel;