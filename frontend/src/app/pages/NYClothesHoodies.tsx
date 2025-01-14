// NYHoodies.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

export function NYHoodies() {
  const navigate = useNavigate(); // Updated hook

  const hoodies = {
    name: 'Bluzy',
    folder: '/clothes/shop1/hoodies/',
    suffix: '_h.jpg',
    colors: ['black', 'blue', 'brown', 'grey', 'white'] as const,
    colorTranslations: {
      black: 'czarna',
      blue: 'niebieska',
      brown: 'brązowa',
      grey: 'szara',
      white: 'biała',
    } as const,
  };

  const handleSelectHoodie = (color: string) => {
    // Use navigate instead of history.push()
    navigate(`/purchase/hoodie/${color}`);
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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>Wybierz Bluzy</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {hoodies.colors.map((color) => (
          <div
            key={color}
            className="hoodie-tile"
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
            onClick={() => handleSelectHoodie(color)}
          >
            <img
              src={`${hoodies.folder}${color}${hoodies.suffix}`}
              alt={`${color} hoodie`}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'scale-down',
              }}
            />
            <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
              {`Bluza - ${hoodies.colorTranslations[color]}`}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
