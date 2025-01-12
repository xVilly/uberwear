import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAccountPage() {
  const navigate = useNavigate();
//     navigate('/main');


      {/* TODO- account creation validation*/}
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1E3A5F',
        color: 'white',
        fontFamily: "'Playfair Display', serif",
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          marginBottom: '20px',
          fontSize: '36px',
        }}
      >
        Zakupy szybko i w Twoim stylu - zacznij teraz.
      </h1>

      {/* Input Form */}
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          gap: '15px',
        }}
      >
        {/* Email Field */}
        <label style={{ fontSize: '18px' }}>
          Email:
          <input
            type="email"
            placeholder="Wprowadź email"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              color: '#000', // Set text color to black
              backgroundColor: '#fff', // Ensure contrast with the text
            }}
          />
        </label>

        {/* Password Field */}
        <label style={{ fontSize: '18px' }}>
          Hasło:
          <input
            type="password"
            placeholder="Wprowadź hasło"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              color: '#000', // Set text color to black
              backgroundColor: '#fff', // Ensure contrast with the text
            }}
          />
        </label>

        {/* Confirm Password Field */}
        <label style={{ fontSize: '18px' }}>
          Powtórz Hasło:
          <input
            type="password"
            placeholder="Wprowadź hasło jeszcze raz"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              color: '#000', // Set text color to black
              backgroundColor: '#fff', // Ensure contrast with the text
            }}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '5px',
            background: '#1E3A5F',
            color: 'white',
            fontWeight: 'bold',
            border: '2px solid #FFBF00',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px',
          }}

           onClick={() => navigate("/account/data")}
        >
         Utwórz Konto
        </button>
      </form>
    </div>
  );
}
