import React from 'react';

const Cart = ({ cartItems = [], onPlaceOrder, onUpdateCartItem, userName, selectedLocation }) => {
  // Varmistetaan, että cartItems on aina taulukko
  const items = Array.isArray(cartItems) ? cartItems : [];

  const handleIncrease = (index) => {
    const newItems = [...items];
    newItems[index].amount = `${parseInt(newItems[index].amount) + 1}kg`;
    onUpdateCartItem(newItems);
  };

  const handleDecrease = (index) => {
    const newItems = [...items];
    if (parseInt(newItems[index].amount) > 1) {
      newItems[index].amount = `${parseInt(newItems[index].amount) - 1}kg`;
      onUpdateCartItem(newItems);
    }
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + parseInt(item.amount) * 2, 0);
  };

  return (
    <div className="cart p-6 bg-white shadow-md rounded-lg h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Ostoskori</h2>
        {items.length === 0 ? (
          <p>Ei varauksia vielä</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{item.name} - {item.amount}</span>
                <div className="flex items-center">
                  <button onClick={() => handleDecrease(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">-</button>
                  <button onClick={() => handleIncrease(index)} className="bg-green-500 text-white px-2 py-1 rounded-md ml-2">+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-4 text-center">
          <p>Nimellä: {userName}</p>
          <p>Koulu: {selectedLocation.name}</p>
          <p>Kilomäärä: {items.reduce((total, item) => total + parseInt(item.amount), 0)}kg</p>
          <p>Voit hakea tilauksen 12.00-14.00 välisenä aikana.</p>
        </div>
      )}
      <div>
        <p className="text- font-bold">Hinta: {calculateTotalPrice()}€</p>
        <button
          onClick={onPlaceOrder}
          className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Tilaa
        </button>
      </div>
    </div>
  );
};

export default Cart;