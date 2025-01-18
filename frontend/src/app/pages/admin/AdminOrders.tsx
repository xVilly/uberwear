import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';
import { getOrders } from '../../requests';
import { UserData } from '../../redux/userSlice';
import { RootState } from '../../store/mainStore';
import { connect } from 'react-redux';
import { Order } from '../../models/Order';
import { DeliveryIcon } from '../../components/SVG';

export const translateStatus = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'Oczekujące na płatność';
        case 'Shipped':
            return 'W trakcie realizacji';
        case 'Delivered':
            return 'Dostarczone';
        case 'Canceled':
            return 'Anulowane';
        default:
            return status;
    }
}

const AdminOrders = ({userData}: {userData : UserData}) => {

    const [ordersList, setOrdersList] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const orders = await getOrders(userData.access);
            setOrdersList(orders);
          } catch (error) {
            console.error('Failed to fetch orders:', error);
          }
        };
    
        fetchOrders();
      }, []);

    return (
        <div className="h-screen flex bg-gray-100 text-[#1E3A5F]">
              {/* Left Navigation Bar */}
              {<AdminSidebar />}
        
              {/* Main Content */}
              <div className="flex-1 p-10">
                {/* Caption */}
                <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
                    Wszystkie zamówienia
                </h1>

                {/* Orders */}
                <div className="flex flex-col gap-4">
                    {ordersList.length === 0 && (
                        <p className="text-center text-gray-500">Brak zamówień</p>
                    )}
                    {ordersList.map(order => (
                        <Link
                            to={`/admin/orders/${order.id}`}
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200"
                        >
                            <div>
                                <h2 className="text-xl font-bold">Zamówienie nr {order.id}</h2>
                                <p className="text-sm text-gray-500">{translateStatus(order.status)}</p>
                            </div>
                            <div className="flex-col text-right">
                                <p className="text-sm text-gray-500">Złożono {order.date}</p>
                                <div className="flex space-x-1">
                                    <DeliveryIcon width={20} height={20} color="text-gray-500" />
                                    <p className="text-sm text-gray-500">{order.courier.name} {order.courier.surname} ({order.courier.license_plate})</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};



const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(AdminOrders);