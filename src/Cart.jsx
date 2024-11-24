import React from 'react';

const Cart = ({ cartItems = [], onPlaceOrder }) => {
  // Varmistetaan, että cartItems on aina taulukko
  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="cart p-6 bg-white shadow-md rounded-lg h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Ostoskori</h2>
      {items.length === 0 ? (
        <p>Ei varauksia vielä</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name} - {item.amount}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onPlaceOrder}
        className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Tilaa
      </button>
    </div>
  );
};

export default Cart;