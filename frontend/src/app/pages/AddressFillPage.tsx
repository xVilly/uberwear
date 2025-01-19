import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext'; // Importing the useCart hook
import { enqueueSnackbar } from 'notistack';

export function AddressFillingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart(); // Accessing the cart from context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    postalCode: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Address data submitted:', formData);
  };

  //Checking if all fields are filled
  const isFormValid = Object.values(formData).every((field) => field.trim() !== ''); 
  // Calculate total price based on cart items
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
        Uzupełnij Adres
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Imię</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nazwisko</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
            Ulica, nr domu, nr mieszkania
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Kod pocztowy</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
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
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Miejscowość</label>
          <input
            type="text"
            name="city"
            value={formData.city}
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

        <button

          type="submit"
          onClick={() => navigate('/purchase/payment', { state: { totalPrice } })}
          style={{
            width: '100%',
            padding: '15px',
            background: '#FFBF00',
            color: '#1E3A5F',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
          disabled={!isFormValid}
        >
          Zatwierdź
        </button>
      </form>

      {/* Cart Summary */}

        <div
          style={{
            width: '80%',
            maxWidth: '400px',
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '30px',
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
                    marginRight: '15px',
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
  );
}
