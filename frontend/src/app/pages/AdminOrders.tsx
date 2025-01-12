import React from 'react';
import { Link } from 'react-router-dom';

export const AdminOrders = () => {
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
                            to="/admin/orders"
                            style={{
                                textDecoration: 'none',
                                color: '#F3F4F6',
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Pokaż zamówienia
                        </Link>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <Link
                            to="/admin/couriers"
                            style={{
                                textDecoration: 'none',
                                color: '#F3F4F6',
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Pokaż kurierów
                        </Link>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <Link
                            to="/admin/users"
                            style={{
                                textDecoration: 'none',
                                color: '#F3F4F6',
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Pokaż użytkowników
                        </Link>
                    </li>
                </ul>
            </nav>
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
                        textAlign: 'center',
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
            </div>
        </div>
    );
};


