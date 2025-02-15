import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShops } from '../../requests';
import { Shop } from '../../models/Shop';


export function OfferPage() {
  const navigate = useNavigate();
  // const brands = [
  //   { name: 'Fashion Bout', img: '/brands/fashion_bout.jpg', path: '/offer/fashionbout'},
  //   { name: 'NY Clothes', img: '/brands/nyclothes.jpg', path: '/offer/nyclothes'},
  // ];
  const [shops, setShops] = useState<Shop[]>([]);
  
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopData = await getShops();
        setShops(shopData);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchShops();
  }, []);


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
        flexDirection: 'column',
      }}
    >
               <h1
          style={{
            marginBottom: '40px', // Space below the header
            fontSize: '4rem', // Large text size
            fontWeight: 'bold', // Makes the text stand out
            textAlign: 'center', // Centers the text
            color: '#1E3A5F', // Primary text color
            top: '0', // Position at the top
            position: 'relative', // Enables positioning adjustments if needed
          }}
        >
          Znajdź swój styl już dziś
        </h1>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {shops.map((shop: Shop, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Tile for Image */}
            <div
              style={{
                width: '200px',
                height: '200px',
                backgroundImage: `url(${shop.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
//               onClick={() => alert(`You selected ${brand.name}`)}
              onClick={() => navigate(`/offer/${shop.shop_ID}`)}

              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            ></div>

            {/* Name Under Tile */}
            <span
              style={{
                marginTop: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center',
              }}
            >
              {shop.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
