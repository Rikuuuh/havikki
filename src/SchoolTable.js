import React, { useEffect } from 'react';
import './SchoolTable.css';

const SchoolTable = ({ locations, selectedLocation, onLocationClick }) => {
  useEffect(() => {
    if (!selectedLocation && locations.length > 0) {
      onLocationClick(locations[0]);
    }
  }, [selectedLocation, locations, onLocationClick]);

  return (
    <div className="school-table">
      <div className="school-list">
        <h2>Valitse Koulu</h2>
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              onClick={() => onLocationClick(location)}
              className={selectedLocation && selectedLocation.id === location.id ? 'selected' : ''}
            >
              {location.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="school-details">
        {selectedLocation && (
          <>
            <h2>{selectedLocation.name}</h2>
            <p>Jäljellä oleva hävikki:</p>
            <ul>
              {Object.entries(selectedLocation.waste).map(([dish, amount], idx) => (
                <li key={idx}>{dish}: {amount}</li>
              ))}
            </ul>
            <div className="button-container">
              <button>Varaa 1kg annos</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolTable;