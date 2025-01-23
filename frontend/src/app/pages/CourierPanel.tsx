import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrdersByCourier, deliverOrder } from '../requests'; 
import { UserData } from '../redux/userSlice';
import { connect } from 'react-redux';
import { Order } from '../models/Order';
import { RootState } from '../store/mainStore';



export function CourierPanelPage({ userData }: { userData: UserData }) {
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersByCourier(userData.access, userData.coid);
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
    }, [userData.access]);

    const handleDeliverOrder = async (orderId: number) => {
        await deliverOrder(userData.access ,orderId);
    };

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
                    {/* Sidebar left empty */}
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
                    Panel Kuriera
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
                <div>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            maxHeight: '70vh',
                            overflowY: 'auto',
                        }}
                    >
                        {orders.length === 0 && (
                            <p style={{ textAlign: 'center', color: '#A0AEC0' }}>Brak zamówień</p>
                        )}
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '20px',
                                    background: '#F3F4F6',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '5px',
                                    marginBottom: '20px',
                                    transition: 'box-shadow 0.2s',
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                        Zamówienie nr {order.id}
                                    </h2>
                                    <p style={{ fontSize: '16px', color: '#A0AEC0' }}>
                                        {order.status}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '16px', color: '#A0AEC0' }}>
                                        Zamówione {order.date}
                                    </p>
                                    <p style={{ fontSize: '16px', color: '#A0AEC0' }}>
                                        Adres: {order.address.city}, {order.address.street}{' '} {order.address.postcode}
                                    </p>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <p style={{ fontSize: '16px', color: '#A0AEC0' }}>
                                            Produkty:
                                        </p>
                                        <ul style={{ marginLeft: '10px' }}>
                                            {order.products.map((product, idx) => (
                                                <li
                                                    key={idx}
                                                    style={{ fontSize: '16px', color: '#A0AEC0' }}
                                                >
                                                    {product.product.name} - {product.ordered_amount} szt. -{' '}
                                                    {product.product.price} PLN
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        style={{
                                            padding: '10px 20px',
                                            background: order.status === 'Delivered' ? '#A0AEC0' : '#1E40AF',
                                            color: '#F3F4F6',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: order.status === 'Delivered' ? 'not-allowed' : 'pointer',
                                            marginTop: '10px',
                                        }}
                                        onClick={async () => {
                                            if (order.status !== 'Delivered') {
                                                await handleDeliverOrder(order.id);
                                                window.location.reload();
                                            }
                                        }}
                                        disabled={order.status === 'Delivered'}
                                    >
                                        Dostarcz
                                    </button>
                                </div>
                            </div>
                        ))}

                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    );

};

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(CourierPanelPage);