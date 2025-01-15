import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByClient } from '../requests';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';

function AccountPageOrders({ userData }: { userData: UserData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByClient(userData.access, userData.clid);
        setOrders(data);
      
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };


    fetchOrders();
  }
  , [userData.access]);


  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Left Navigation Bar */}
      <nav
        style={{
          width: '250px',
          background: '#1E3A5F',
          borderRight: '3px solid #FFC107',
          padding: '20px',
          color: '#F3F4F6',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/data"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Twoje dane
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/orders"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Zamówienia
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/returns"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Zwroty
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/points"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Punkty
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/favbrands"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Ulubione Marki
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            marginBottom: '30px',
            position: 'relative',
            fontWeight: 'bold',
          }}
        >
          Zamówienia
          <span
            style={{
              position: 'absolute',
              left: 0,
              bottom: -10,
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 193, 7, 0.8)',
            }}
          ></span>
        </h1>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(AccountPageOrders);