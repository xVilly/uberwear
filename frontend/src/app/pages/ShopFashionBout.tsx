import React from 'react';

export function FashionBout() {
  const categories = {
    men: {
      name: 'Ubrania Męskie',
      image: '/clothes/shop2/men_jackets/black_jack.jpg', // Reprezentatywne zdjęcie
    },
    women: {
      name: 'Ubrania Damskie',
      image: '/clothes/shop2/woman_jackets/black_jack.jpg', // Reprezentatywne zdjęcie
    },
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
      {/* Header */}
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Wybierz kategorię
      </h1>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Wybierz kategorię</h2>

      {/* Clothing Categories */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {Object.values(categories).map((category) => (
          <div
            className="category-tile"
            key={category.name}
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
            onClick={() => alert(`Wybrano ${category.name}!`)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
              }}
            />
            <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}