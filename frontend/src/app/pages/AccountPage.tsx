import React from 'react';

export function AccountPage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Left Navigation Bar */}
      <nav
        style={{
          width: '250px',
          background: '#1E3A5F',
          borderRight: '3px solid #FFC107',
          padding: '20px',
          color: '#F3F4F6',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {['Twoje dane', 'Zamówienia', 'Zwroty', 'Punkty', 'Ulubione Marki'].map((item) => (
            <li
              key={item}
              style={{
                marginBottom: '15px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '500',
                color: '#F3F4F6',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '40px',
        }}
      >
        {/* Caption */}
        <h1
          style={{
            fontSize: '36px',
            marginBottom: '10px',
            position: 'relative',
            fontWeight: 'bold',
          }}
        >
          Twoje konto
          <span
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '3px', // Height of the line
              backgroundColor: 'rgba(255, 193, 7, 0.8)', // Amber color with opacity
            }}
          ></span>
        </h1>
      </div>
    </div>
  );
}
