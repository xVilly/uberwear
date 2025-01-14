import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NYClothes() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Bluzy',
      folder: '/clothes/shop1/hoodies/',
      suffix: '_h.jpg',
      color: 'black',
      path: '/offer/nyclothes/hoodies',
    },
    {
      name: 'Spodnie dresowe',
      folder: '/clothes/shop1/sweatpants/',
      suffix: '_sw.jpg',
      color: 'black',
      path: '/offer/nyclothes/sweatpants',
    },
    {
      name: 'T-Shirty',
      folder: '/clothes/shop1/t-shirts/',
      suffix: '_t.jpg',
      color: 'black',
      path: '/offer/nyclothes/tees',
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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
      Wybierz kategorię 
      </h1>

      {/* Category Tiles */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-tile"
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
            onClick={() => navigate(category.path)}
          >
            {/* Representative Image */}
            <img
              src={`${category.folder}${category.color}${category.suffix}`}
              alt={category.name}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'scale-down',
              }}
            />

            {/* Category Name */}
            <h2
              style={{
                padding: '10px',
                background: '#1E3A5F',
                color: '#fff',
              }}
            >
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
