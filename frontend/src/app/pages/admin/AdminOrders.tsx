import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';
import { getOrders } from '../../requests';
import { UserData } from '../../redux/userSlice';
import { RootState } from '../../store/mainStore';
import { connect } from 'react-redux';
import { Order } from '../../models/Order';



const AdminOrders = ({userData}: {userData : UserData}) => {

    const [ordersList, setOrdersList] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const orders = await getOrders(userData.access);
            console.log(orders);
            setOrdersList(orders);
          } catch (error) {
            console.error('Failed to fetch orders:', error);
          }
        };
    
        fetchOrders();
      }, []);

    return (
        <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
              {/* Left Navigation Bar */}
              {<AdminSidebar />}
        
              {/* Main Content */}
              <div className="flex-1 p-10">
                {/* Caption */}
                <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
                    Wszystkie zamówienia
                </h1>
            </div>
        </div>
    );
};



const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(AdminOrders);