import React from 'react';
import { useCart } from './CartContext';

export function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Calculate the total sum of the cart items
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Twój Koszyk
        <span
          style={{
            display: 'block',
            height: '4px',
            backgroundColor: '#FFBF00', 
            margin: '8px auto 0', 
            borderRadius: '2px',
          }}
        />
      </h1>

      {cart.length === 0 ? (
        <p
          style={{
            fontSize: '1.2rem',
            color: '#1E3A5F',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Twój koszyk jest pusty
        </p>
      ) : (
        <div
          style={{
            width: '80%',
            maxWidth: '800px',
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #FFBF00', // Amber outline
                background: '#F9FAFB',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.color}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  marginRight: '20px',
                  borderRadius: '4px',
                  border: '1px solid #E5E7EB',
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  {item.color} {item.name} 
                </p>
                <p style={{ fontSize: '1.15rem', color: '#4B5563' }}>Rozmiar: {item.size}</p>
                <p style={{ fontSize: '1.3rem',  color: '#1E3A5F' }}>
                  {item.price} zł
                </p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: '#FF0000',
                  color: '#fff',
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                <img
              src="/trashbinlogo.png" 
              alt="Usuń"
              style={{
                width: '30px',   
                height: '30px', 
              }}
            />
              </button>
            </div>
          ))}

          {/* Display Total Price */}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
              Suma: {totalPrice} zł
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
