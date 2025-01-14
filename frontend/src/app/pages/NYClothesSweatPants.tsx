import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NYSweatPants() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const sweatpants = {
    name: 'Spodnie dresowe',
    folder: '/clothes/shop1/sweatpants/',
    suffix: '_sw.jpg',
    colors: ['black', 'brown', 'grey'] as const, // 'as const' ensures that the color values are treated as specific string literals
    colorTranslations: {
      black: 'czarne',
      brown: 'brązowe',
      grey: 'szare',
    } as const, // 'as const' ensures that colorTranslations keys are treated as specific keys
  };

  const handleColorClick = (color: keyof typeof sweatpants.colorTranslations) => {
    // Navigate to the purchase page with the selected color
    navigate(`/purchase/sweatpants/${color}`);
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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>Wybierz Spodnie Dresowe</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {sweatpants.colors.map((color) => (
          <div
            className="sweatpants-tile"
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
              src={`${sweatpants.folder}${color}${sweatpants.suffix}`}
              alt={`${color} sweatpants`}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'scale-down',
              }}
            />
            <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
              {`Spodnie Dresowe - ${sweatpants.colorTranslations[color]}`}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
