import React, { useEffect, useState } from 'react';
import { getOrdersByClient } from '../requests';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';
import { AccountSidebar } from './AccountSidebar';
import { translateStatus } from './admin/AdminOrders';

interface Order {
  id: number;
  date: string;
  status: string;
  products: {
    product: {
      name: string;
      price: number;
      shop: {
        name: string;
      };
    };
    ordered_amount: number;
  }[];
}

export function AccountPageOrders({ userData }: { userData: UserData }) {
  const [orders, setOrders] = useState<Order[]>([]);

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
  }, [userData.access]);

  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      <AccountSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
          Zamówienia
        </h1>
        <div className="flex flex-col gap-4">
          {orders.length === 0 && (
            <p className="text-center text-gray-500">Brak zamówień</p>
          )}
          {orders.map((order) => (
            <div
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
                  <p className="text-sm text-gray-500">Produkty:</p>
                  <ul className="ml-5 list-disc">
                    {order.products.map((product, idx) => (
                      <li key={idx} className="text-sm text-gray-500">
                        {product.product.name} - {product.ordered_amount} szt. - {product.product.price} PLN
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(AccountPageOrders);