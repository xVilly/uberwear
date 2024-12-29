import React from 'react';
import backgroundImage from '../../images/main_site_background.jpg'; // Adjust the relative path

export function HomePage() {
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
        <h1 className="text-white text-5xl font-bold flex justify-center items-center h-full">
          Placeholder dla HTMLA strony głównej
        </h1>
      </div>
    );
  }