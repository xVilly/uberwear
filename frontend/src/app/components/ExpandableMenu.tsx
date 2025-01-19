import React, { useState } from 'react';
import Hamburger from '../../images/hamburger.png'
import { Link } from 'react-router-dom';

interface MenuItemProps {
  icon: string; // Icon is expected to be a string (like an emoji or an SVG path)
  label: string; // Label is a string
  isExpanded: boolean; // Boolean to indicate if the menu is expanded
}

export function ExpandableMenu({ isExpanded, setIsExpanded }: { isExpanded: boolean; setIsExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
<>
      {/* Menu Container */}
      <div
        style={{
          width: isExpanded ? '250px' : '70px',
          transition: 'width 0.3s ease',
          backgroundColor: '#1E3A5F',
          color: 'white',
          overflow: 'hidden',
          boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed', // Fix the menu to the left side
          left: 0, // Align to the left
          top: 0, // Align to the top
          bottom:0,
          height: '100vh', // Full height
          paddingTop: '80px',
          outline: '2px solid #FFBF00', // Amber outline
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Menu Header */}
        <div
          style={{
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            borderBottom: '1px solid #4B5563',
          }}
        >
           {isExpanded ? (
            <span>Menu</span>
          ) : (
            <img src={Hamburger} alt="Hamburger Icon" style={{ width: '30px', height: '30px' }} />
          )}
        </div>

        {/* Menu Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            gap: '10px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem icon="🏠" label="Strona główna" isExpanded={isExpanded} />
          </Link>
          <Link to="/account/data" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem icon="👨🏻" label="Twoje konto" isExpanded={isExpanded} />
          </Link>

          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem icon="ℹ️" label="O nas" isExpanded={isExpanded} />
          </Link>

          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem icon="📞" label="Kontakt" isExpanded={isExpanded} />
          </Link>

          <Link to="/register-shop" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem icon="🛒" label="Zarejestruj swój sklep" isExpanded={isExpanded} />
          </Link>

        </div>
      </div>

    </>
  );
}

function MenuItem({ icon, label, isExpanded }: MenuItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
      }}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ fontSize: '1.5rem', marginRight: isExpanded ? '10px' : '0' }}>{icon}</span>
      {isExpanded && <span style={{ fontSize: '1rem' }}>{label}</span>}
    </div>
  );
}
