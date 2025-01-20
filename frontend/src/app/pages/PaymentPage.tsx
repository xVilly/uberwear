import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useCart } from './CartContext';

export function PaymentPage() {

  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const location = useLocation();
  const { cart } = useCart();
  const totalPrice = location.state?.totalPrice || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Payment information submitted:', paymentInfo);
    // You can add further logic for submitting payment
  };

  // Check if all payment fields are filled
  const isPaymentValid = Object.values(paymentInfo).every((field) => field.trim() !== '');

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
        Uzupełnij dane o płatności 
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

      <form
        onSubmit={handleSubmit}
        style={{
          width: '80%',
          maxWidth: '600px',
          background: '#FFFFFF',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Numer karty</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Data ważności</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>

         <div style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {/* Kwota do zapłaty: {totalPrice} zł */}
      </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            background: '#FFBF00',
            color: '#1E3A5F',
            border: 'none',
            borderRadius: '4px',
            cursor: isPaymentValid ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
          disabled={!isPaymentValid}
        >
          Zatwierdź płatność
        </button>
      </form>

      {/* Cart Summary */}

      <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        padding: '20px',
        position: 'fixed',
        right: '270px'
      }}
    >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '70px',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Podsumowanie koszyka</h2>
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                {/* Item details */}
                <div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {item.color} {item.name} - {item.size}
                  </p>
                  <p>{item.price} zł</p>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '15px' }}>
            Całkowita cena: {totalPrice} zł
          </h3>
        </div>
        </div>
      
    </div>
  );
}
