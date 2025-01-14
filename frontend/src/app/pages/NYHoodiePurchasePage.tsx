import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export function PurchasePageNYH() {
  const { color } = useParams<{ color: string }>(); // Get the color from URL
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [cart, setCart] = useState<{ color: string; size: string; imageUrl: string }[]>([]);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const hoodies = {
    folder: '/clothes/shop1/hoodies/',
    suffix: '_h.jpg',
    colorTranslations: {
      black: 'czarna',
      blue: 'niebieska',
      brown: 'brązowa',
      grey: 'szara',
      white: 'biała',
    } as const, // This ensures that colorTranslations has constant keys
  };

  // Typing selectedColor explicitly to be one of the keys of colorTranslations
  const selectedColor: keyof typeof hoodies.colorTranslations = 
    (color && (color in hoodies.colorTranslations)) ? color as keyof typeof hoodies.colorTranslations : 'black'; // Fallback to 'black'

  const translatedColor = hoodies.colorTranslations[selectedColor];

  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    // Ensure the selectedColor is a key of colorTranslations
    if (!selectedColor) {
      alert('Wybrano nieprawidłowy kolor!');
      return;
    }

    const selectedHoodie = {
      color: selectedColor,
      size: selectedSize,
      imageUrl: `${hoodies.folder}${selectedColor}${hoodies.suffix}`,
    };

    setCart([...cart, selectedHoodie]);
    alert(`Dodano do koszyka: ${translatedColor} bluza w rozmiarze ${selectedSize}`);
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
      {/* Updated caption */}
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Bluza - {translatedColor}
      </h1>

      {/* Display the selected hoodie */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <img
          src={`${hoodies.folder}${selectedColor}${hoodies.suffix}`}
          alt={`${selectedColor} hoodie`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            marginBottom: '20px',
            border: '3px solid #FFBF00',
          }}
        />
      </div>

      {/* Size Selection */}
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="size-select" style={{ fontSize: '1.2rem' }}>
          Wybierz rozmiar: 
        </label>
        <select
          id="size-select"
          value={selectedSize}
          onChange={handleSizeSelect}
          style={{
            padding: '8px',
            fontSize: '1rem',
            margin: '10px',
            borderRadius: '4px',
            width: '65px', 
          }}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        style={{
          padding: '10px 20px',
          background: '#1E3A5F',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Dodaj do koszyka
      </button>

    </div>
  );
}

