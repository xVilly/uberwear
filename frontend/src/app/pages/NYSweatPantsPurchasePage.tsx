import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you are using a CartContext like in your hoodie component

export function PurchasePageNYSw() {
  const { color } = useParams<{ color: string }>(); // Get the color from URL
  const [selectedSize, setSelectedSize] = useState<string>('S');
  
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const sweatpants = {
    folder: '/clothes/shop1/sweatpants/',
    suffix: '_sw.jpg',
    price: 150, // Add price for sweatpants
    colorTranslations: {
      black: 'czarne',
      brown: 'brązowe',
      grey: 'szare',
    } as const,
  };

  const selectedColor: keyof typeof sweatpants.colorTranslations = 
    (color && (color in sweatpants.colorTranslations)) ? color as keyof typeof sweatpants.colorTranslations : 'black'; // Fallback to 'black'

  const translatedColor = sweatpants.colorTranslations[selectedColor];
  
  const { addToCart } = useCart(); // Assuming addToCart is defined in the context

  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Wybrano nieprawidłowy kolor!');
      return;
    }

    const selectedSweatpants = {
      name: 'spodnie dresowe',
      color: translatedColor,
      size: selectedSize,
      price: sweatpants.price, // Include price here
      imageUrl: `${sweatpants.folder}${selectedColor}${sweatpants.suffix}`,
    };

    addToCart(selectedSweatpants); // Add to cart using the context
    alert(`Dodano do koszyka: ${translatedColor} spodnie dresowe w rozmiarze ${selectedSize} za ${sweatpants.price} zł`);
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
      <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Spodnie Dresowe - {translatedColor}
      </h1>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <img
          src={`${sweatpants.folder}${selectedColor}${sweatpants.suffix}`}
          alt={`${selectedColor} sweatpants`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            marginBottom: '10px',
            border: '3px solid #FFBF00',
          }}
        />
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E3A5F' }}>
          {sweatpants.price} zł
        </p>
      </div>

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
    