import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NYTees() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const tees = {
    name: 'T-shirty',
    folder: '/clothes/shop1/t-shirts/',
    suffix: '_t.jpg',
    colors: ['black', 'green', 'pink', 'purple', 'yellow'] as const,
    colorTranslations: {
      black: 'czarny',
      green: 'zielony',
      pink: 'różowy',
      purple: 'fioletowy',
      yellow: 'żółty',
    } as const,
  };

  const handleColorClick = (color: keyof typeof tees.colorTranslations) => {
    // Navigate to the purchase page with the selected color
    navigate(`/purchase/tees/${color}`);
  };

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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>Wybierz T-shirty</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {tees.colors.map((color) => (
          <div
            className="tee-tile"
            key={color}
            style={{
              width: '300px',
              borderRadius: '8px',
              background: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
            }}
            onClick={() => handleColorClick(color)} // Navigate to the purchase page with the color
          >
            <img
              src={`${tees.folder}${color}${tees.suffix}`}
              alt={`${color} T-shirt`}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'scale-down',
              }}
            />
            <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
              {`T-shirt - ${tees.colorTranslations[color]}`}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
