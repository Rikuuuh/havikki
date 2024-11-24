import React, { useEffect } from 'react';

const SchoolTable = ({ locations, selectedLocation, onLocationClick, onAddToCart }) => {
  useEffect(() => {
    if (!selectedLocation && locations.length > 0) {
      onLocationClick(locations[0]);
    }
  }, [selectedLocation, locations, onLocationClick]);

  const isWasteAvailable = (waste) => {
    return Object.values(waste).some(amount => parseFloat(amount) > 0);
  };

  return (
    <div className="flex flex-col p-5 bg-gray-100 border border-gray-300 rounded-lg w-full shadow-md h-full">
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-3">Valitse Koulu</h2>
        <ul className="list-none p-0 m-0">
          {locations.map((location) => {
            const wasteAvailable = isWasteAvailable(location.waste);
            return (
              <li
                key={location.id}
                onClick={() => wasteAvailable && onLocationClick(location)}
                className={`p-3 cursor-pointer border-b border-gray-300 transition-colors duration-300 ${selectedLocation && selectedLocation.id === location.id ? 'bg-green-500 text-white' : ''} ${wasteAvailable ? 'bg-green-200' : 'bg-red-200 cursor-not-allowed'}`}
              >
                {location.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {selectedLocation && (
          <>
            <h2 className="bg-green-500 text-white p-2 text-lg font-bold mb-3">{selectedLocation.name}</h2>
            <p className="mb-3">Jäljellä oleva hävikki:</p>
            <ul className="list-none p-0 m-0">
              {Object.entries(selectedLocation.waste).map(([dish, amount], idx) => (
                <li key={idx} className="p-2 border-b border-gray-300">{dish}: {amount}</li>
              ))}
            </ul>
            <div className="flex justify-center mt-5">
              <button onClick={() => onAddToCart(selectedLocation)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">Varaa 1kg annos</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolTable;