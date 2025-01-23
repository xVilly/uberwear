import React, { useEffect, useState } from 'react';
import { getOrdersByClient } from '../requests';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';
import { AccountSidebar } from './AccountSidebar';
import { translateStatus } from './admin/AdminOrders';
import { useNavigate } from 'react-router-dom';
import { requestCancelOrder } from './admin/adminRequests';
import { enqueueSnackbar } from 'notistack';

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
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByClient(userData.access, userData.clid);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userData.access]);

  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      <AccountSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto" style={{ maxHeight: '70vh' }}>
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
              <div className="flex-col text-right justify-end content-end">
                <p className="text-sm text-gray-500">Złożono {order.date}</p>
                <div className="flex justify-end">
                  <ul className="list-none">
                    {order.products.map((product, idx) => (
                      <li key={idx} className="text-sm text-gray-500">
                        {product.product.name} - {product.ordered_amount} szt. - {product.product.price} PLN
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2 justify-end">
                  <button onClick={() => {navigate(`/purchase/delivery/${order.id}`)}}
                  className="p-1 mt-2 rounded-md text-center text-sm bg-emerald-400 border-emerald-700 text-white shadow-md hover:shadow-lg border hover:bg-emerald-500 hover:border-emerald-800 transition-all duration-200">
                    Śledź postęp
                  </button>
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