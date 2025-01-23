import React from 'react';
import backgroundImage from '../../images/main_site_background.jpg'; // Adjust the relative path
import { useNavigate } from "react-router-dom";


const TriangleOverlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden', // Prevent overflow
        pointerEvents: 'none', // Prevent the triangle from blocking interactions with other content
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '30%',
          width: 0,
          height: 0,
          borderLeft: '70vw solid transparent',
          borderRight: '80vw solid transparent',
          borderTop: '150vh solid rgba(30, 58, 95, 0.98)', // Jeans color equivalent (RGB: 30, 58, 95)
        }}
      ></div>
    </div>
  );
};


export function HomePage() {
const navigate = useNavigate();
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          marginTop: '-4rem',
        }}
      >
    <TriangleOverlay />
        <h1 className="text-white text-5xl font-bold flex items-center h-full"
          style={{

                    fontFamily: "'Playfair Display', serif", // Artistic font
                    fontWeight: 700, // Use a bold weight for emphasis
//                     textShadow: '2px 2px 3px black, -2px -2px 3px black, 2px -2px 3px black, -2px 2px 3px black',
                    position: 'relative',
                    top: '-10rem', // Przesuwamy napis do góry
                    textAlign: 'left', // Align the text to the left
                     marginLeft: '5rem',

                }}
        >
           Dostarczamy styl, <br /> który pasuje do Ciebie!
        </h1>

         <div
        className="text-white font-playfair text-6xl"
        style={{
          fontFamily: "'Playfair Display', serif",
          position: 'absolute', // Position relative to parent container
          bottom: '12rem', // Adjust this value to place the text above the button
          left: '77.5%', // Center horizontally
          top: '65%',
          transform: 'translateX(-50%)', // Center the text
           textShadow: '4px 4px 6px black', // Add black shadow to the text
        }}
      >
        Dołącz do nas!
      </div>

      <button
        onClick={() => navigate("/offer")}
        className="bg-[#1E3A5F] text-white font-playfair py-8 px-16 rounded-full shadow-md text-3xl absolute"
        style={{
          fontFamily: "'Playfair Display', serif",
          bottom: '22rem', // Adjust this value to place the button below the header
          left: '8%',
//           transform: 'translateX(-50%)', // Center the button horizontally
          border: '2px solid #FFBF00', // Amber border color (adjust thickness as needed)
          transition: 'all 0.3s ease-in-out', // Smooth transition for all properties
        }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'} // Type assertion for HTMLButtonElement
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'} // Reset scale when hover endskkk
      >
        Odkryj ofertę
      </button>

        <button
          className="bg-[#1E3A5F] text-white font-playfair py-8 px-16 rounded-full shadow-md text-3xl fixed bottom-32 right-64  "
          style={{
                fontFamily: "'Playfair Display', serif",
                transition: 'all 0.3s ease-in-out', // Smooth transition for all properties
                border: '2px solid #FFBF00', // Amber border color (adjust thickness as needed)
          }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'} // Type assertion for HTMLButtonElement
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'} // Reset scale when hover endskkk

           onClick={() => navigate("/create-account")}
        >
          Utwórz Konto
        </button>

      </div>
    );
  }


