import { connect } from "react-redux";
import { UserData } from "../../redux/userSlice";
import { AdminSidebar } from "./Sidebar";
import { RootState } from "../../store/mainStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { getOrderDetails, requestCancelOrder, requestDeleteOrder } from "./adminRequests";
import { translateStatus } from "./AdminOrders";
import { CancelIcon, DeleteIcon } from "../../components/SVG";
import { enqueueSnackbar } from "notistack";


export const translatePaymentStatus = (status: string) => {
    switch (status) {
        case 'Done':
            return 'Opłacono';
        case 'Awaits':
            return 'Jeszcze nie opłacono';
        case 'Canceled':
            return 'Anulowana';
        default:
            return status;
    }
}

export const getTotalPrice = (order: Order) => {
    return order.products.reduce((acc, product) => acc + product.product.price * product.ordered_amount, 0);
}

function OrderDetails({ userData }: { userData: UserData }) {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);

    const fetchOrder = async () => {
        try {
            if (orderId !== undefined) {
                const order = await getOrderDetails(userData.access, orderId);
                setOrder(order);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const cancelOrder = async () => {
        if (!orderId) return;
        try {
            await requestCancelOrder(userData.access, orderId);
            enqueueSnackbar('Anulowano zamówienie nr ' + orderId, { variant: 'success' });
            fetchOrder(); // Refetch the order after cancellation
        } catch (error) {
            console.error('Failed to cancel order:', error);
        }
    }

    const deleteOrder = async () => {
        if (!orderId) return;
        try {
            await requestDeleteOrder(userData.access, orderId);
            enqueueSnackbar('Usunięto zamówienie nr ' + orderId, { variant: 'success' });
            navigate('/admin/orders');
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    }

    return (
        <div className="h-screen flex bg-gray-100 text-[#1E3A5F">
            {/* Left Navigation Bar */}
            {<AdminSidebar />}

            {/* Main Content */}
            <div className="flex-1 p-10">
                {/* Caption */}
                <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
                    Zamówienie nr {orderId}
                </h1>

                {/* Order Details */}
                <div className="flex flex-col gap-4">
                    {order && (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Status:</span>
                                <span>{translateStatus(order.status)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Data zamówienia:</span>
                                <span>{order.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Klient:</span>
                                <span>{order.client.name} {order.client.surname}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Płatność:</span>
                                <span>{translatePaymentStatus(order.payment.status)} ({order.payment.method})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Kurier:</span>
                                <span>{order.courier.name} {order.courier.surname} ({order.courier.license_plate})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Adres dostawy:</span>
                                <span>{order.address.street}, {order.address.city} {order.address.postcode}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 py-1">
                                <span className="text-xl font-bold">Produkty:</span>
                                <div className="flex flex-col gap-2">
                                    {order.products.map(product => (
                                        <div key={product.product.id} className="flex justify-between">
                                            <span>{product.product.name} ({product.ordered_amount} szt.)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <span>Łącznie {getTotalPrice(order)} zł</span>
                            </div>
                            <div className="flex justify-center space-x-4">
                                {order.status !== 'Canceled' && order.status !== 'Delivered' &&
                                    <button 
                                        className="flex items-center space-x-1 bg-orange-100 shadow-md text-orange-700 border-orange-300 border rounded-lg p-1 hover:shadow-lg hover:bg-orange-200 hover:scale-105 transition-all duration-200"
                                        onClick={cancelOrder}>
                                        <CancelIcon width={20} height={20} color="text-orange-600" />
                                        <span>Anuluj zamówienie</span>
                                    </button>
                                }
                                <button 
                                    className="flex items-center space-x-1 bg-red-100 shadow-md text-red-700 border-red-300 border rounded-lg p-1 hover:shadow-lg hover:bg-red-200 hover:scale-105 transition-all duration-200"
                                    onClick={deleteOrder}>
                                    <DeleteIcon width={20} height={20} color="text-red-600" />
                                    <span>Usuń zamówienie</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(OrderDetails);