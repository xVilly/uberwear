import React from 'react';

export function NYClothes() {
  const categories = [
    {
      name: 'Bluzy',
      folder: '/clothes/shop1/hoodies/',
      suffix: '_h.jpg',
      colors: ['black', 'blue', 'brown', 'grey', 'white'],
    },
    {
      name: 'Spodnie dresowe', 
      folder: '/clothes/shop1/sweatpants/',
      suffix: '_sw.jpg',
      colors: ['black', 'brown', 'grey'],
    },
    {
      name: 'T-shirty',
      folder: '/clothes/shop1/t-shirts/',
      suffix: '_t.jpg',
      colors: ['black', 'green', 'pink', 'purple', 'yellow'],
    },
  ];


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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>Wybierz kategorię</h1>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Wybierz kategorię</h2>

      {/* Category Tiles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {categories.map((category) => (
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
            onClick={() => alert(`You selected ${category.name}!`)} // Placeholder for navigation
          >
            {/* Representative Image */}
           
            <img
            src={`${category.folder}${category.colors[0]}${category.suffix}`}
            alt={category.name}
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'scale-down',
              marginLeft: category.name === 'Spodnie dresowe' ? '4px' : '0', // Adjust the value as needed
            }}
          />

            {/* Category Name */}
            <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
