import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../components/SVG';

export function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  // Calculate the total sum of the cart items
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-[#1E3A5F] font-playfair p-5">
      <h1 className="text-4xl font-bold mb-5">
        Twój Koszyk
        <span className="block h-1 bg-amber-500 mt-2 mx-auto rounded"></span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-xl text-[#1E3A5F] text-center mt-5">
          Twój koszyk jest pusty
        </p>
      ) : (
        <div className="w-4/5 max-w-2xl bg-white p-5 rounded-lg shadow-md">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-5 p-2 rounded-lg border-2 border-amber-500 bg-gray-50"
            >
              <img
                src={item.image}
                alt={item.color}
                className="w-24 h-24 object-contain mr-5 rounded border border-gray-300"
              />
              <div className="flex-1">
                <p className="text-xl font-bold mb-1">
                  {item.name} - kolor {item.color.toLowerCase()}
                </p>
                <p className="text-lg text-gray-600">Rozmiar: {item.size}</p>
                <p className="text-xl text-[#1E3A5F]">{item.price} zł</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product_ID)}
                className="bg-red-600 text-white p-2 rounded-lg cursor-pointer font-bold"
              >
                <DeleteIcon width={28} height={28} color="text-white" />
              </button>
            </div>
          ))}

          {/* Display Total Price */}
          <div className="mt-5 text-right">
            <h2 className="text-2xl font-bold">
              Suma: {totalPrice} zł
            </h2>
          </div>
        </div>
      )}

      {/* Display "Przejdź do płatności" button if there are items in the cart */}
      {cart.length > 0 && (
        <button
          className="mt-5 bg-amber-500 text-[#1E3A5F] p-4 rounded outline outline-3 outline-[#1E3A5F] cursor-pointer font-bold text-xl transition-all duration-200 hover:scale-105"
          onClick={() => navigate('/purchase/payment', { state: { cart, totalPrice } })}
        >
          Przejdź do kasy
        </button>
      )}
    </div>
  );
}
