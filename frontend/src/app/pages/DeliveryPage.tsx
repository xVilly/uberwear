import React, { useEffect, useState } from 'react';
import krakowMap from '../clothes/background_jeans.png'; // Adjust the relative path
import { useParams } from 'react-router-dom';
import { Order } from '../models/Order';
import { getOrderById } from '../requests';
import { UserData } from '../redux/userSlice';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';

function DeliveryPage({userData}: {userData: UserData}) {
  const { orderId } = useParams<{ orderId: string }>();

  const [time, setTime] = useState(0); // Time simulation state
  const [historyIndex, setHistoryIndex] = useState(0); // Tracks the current courier status

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
      const fetchOrder = async () => {
          try {
              const orderData: Order = await getOrderById(userData.access, orderId?.toString() ?? '');
              setCurrentOrder(orderData);
          } catch (error) {
              console.error('Failed to fetch order:', error);
          }
      };

      fetchOrder();
  }, []);

  const historySteps = [
    "Przetwarzanie zamówienia", // On way to pick up clothes
    "Kurier jest w drodze",    // Picking up clothes
    "Finalizacja zamówienia",  // Delivering clothes
    "Ubrania zostały dostarczone!", // Clothes delivered
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 100) {
          clearInterval(interval); // Stop the interval when 100% is reached
          return prevTime;
        }

        var maxTime = 25;
        if (currentOrder && currentOrder.status === 'Shipped') {
          maxTime = 50;
        } else if (currentOrder && currentOrder.status === 'Delivered') {
          maxTime = 75;
        } else if (currentOrder && currentOrder.status === 'Finalized') {
          maxTime = 100;
        }
        const newTime = Math.min(prevTime + 1, maxTime); // Increment time slower (every 300ms)

        // Map specific `time` values to history steps
        if (newTime === 25) setHistoryIndex(1); // Step 2: "Odbieranie ubrań"
        if (newTime === 50) setHistoryIndex(2); // Step 3: "Dostarczanie ubrań"
        if (newTime === 100) setHistoryIndex(3); // Step 4: "Kurier jest już u Ciebie!"

        return newTime;
      });
    }, 20); // (20ms per increment)

    return () => clearInterval(interval);
  }, [currentOrder]);

  return (
    <div
      style={{
        height: '120vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Background Image Container */}
      <div
        style={{
          height: '50vh',
          width: '100%',
          backgroundImage: `url(${krakowMap})`,
          backgroundSize: 'cover', // Cover the container while maintaining aspect ratio
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: '5px solid #FFBF00', // Amber underline
        }}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >

        {/* Animated Circle with Filling Effect */}
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `conic-gradient(
              #FFE8A3  ${time * 3.6}deg,
              #FFFFFF ${time * 3.6}deg
            )`,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '4px solid #FFBF00',
            top: '-120px',
          }}
        >
          {/* Percentage Display */}
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            {time}%
          </span>
        </div>
        <div
          style={{
            marginTop: '-90px',
            fontSize: '2.6rem',
            fontWeight: 'bold',
            color: '#1E3A5F',
            textAlign: 'center',
          }}
        >
          Twoje zamówienie jest w drodze!
        </div>
        {/* Courier History */}
        <div
          style={{
            flex: 1,
            maxWidth: '300px',
            maxHeight: '325px',
            width: '100%',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            marginTop: '0px',
          }}
        >
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem', color: '#FFBF00' }}>
            Postęp Dostawy
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {historySteps.map((step, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  fontSize: '1.2rem',
                  color: index <= historyIndex ? '#1E3A5F' : '#9CA3AF',
                  fontWeight: index <= historyIndex ? 'bold' : 'normal',
                }}
              >
                {index <= historyIndex ? '✓ ' : '• '} {step}
              </li>
            ))}
          </ul>
          {/* button show after 100% completion */}
          {time === 100 && (
            <button
              onClick={() => alert('Odbiór potwierdzony!')}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#FFBF00',
                color: '',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Potwierdź odbiór
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(DeliveryPage);
