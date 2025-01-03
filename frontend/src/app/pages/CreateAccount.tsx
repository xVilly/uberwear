import React from 'react';

export function CreateAccountPage() {
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
        flexDirection: 'column', // Allows positioning of the header within the flex container
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif", // Ensures font style is applied
          marginBottom: '20px', // Adjust as needed to move it up
          marginTop: '-300px', // Negative margin to move it upwards
          fontSize: '36px'

        }}
      >
           Sign up to dress and impress
      </h1>
    </div>
  );
}
