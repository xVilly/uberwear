import { connect } from "react-redux";
import { UserData } from "../../redux/userSlice";
import { AdminSidebar } from "./Sidebar";
import { RootState } from "../../store/mainStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { getCourierDetails, getCourierOrders, getOrderDetails, requestActivateUser, requestCancelOrder, requestDeactivateUser, requestDeleteOrder } from "./adminRequests";
import { translateStatus } from "./AdminOrders";
import { CancelIcon, DeleteIcon, DeliveryIcon, LockIcon, UnlockIcon } from "../../components/SVG";
import { enqueueSnackbar } from "notistack";
import { Courier } from "../../models/Courier";


function CourierDetails({ userData }: { userData: UserData }) {
    const { courierId } = useParams<{ courierId: string }>();
    const navigate = useNavigate();

    const [courier, setCourier] = useState<Courier | null>(null);

    const [courierOrders, setCourierOrders] = useState<Order[]>([]);

    const fetchCourier = async () => {
        try {
            if (courierId !== undefined) {
                const data = await getCourierDetails(userData.access, courierId);
                setCourier(data);
            }
        } catch (error) {
            console.error('Failed to fetch courier:', error);
        }
    };

    const fetchCourierOrders = async () => {
        try {
            if (courierId !== undefined) {
                const orders = await getCourierOrders(userData.access, courierId);
                setCourierOrders(orders);
            }
        } catch (error) {
            console.error('Failed to fetch courier orders:', error);
        }
    }

    useEffect(() => {
        fetchCourier();
        fetchCourierOrders();
    }, [courierId]);

    const deactivateCourier = async () => {
        if (!courier) return;
        try {
            await requestDeactivateUser(userData.access, courier.user_ID.toString());
            enqueueSnackbar('Konto kuriera dezaktywowane', { variant: 'success' });
            fetchCourier(); // Refetch the courier after deactivation
        } catch (error) {
            console.error('Failed to deactivate courier:', error);
        }
    }

    const activateCourier = async () => {
        if (!courier) return;
        try {
            await requestActivateUser(userData.access, courier.user_ID.toString());
            enqueueSnackbar('Konto kuriera aktywowane', { variant: 'success' });
            fetchCourier(); // Refetch the courier after activation
        } catch (error) {
            console.error('Failed to activate courier:', error);
        }
    }

    const deleteAccount = async () => {
        if (!courierId) return;
        try {
            //await requestDeleteCourier(userData.access, courierId);
            enqueueSnackbar('Konto kuriera usunięte', { variant: 'success' });
            navigate('/admin/couriers');
        } catch (error) {
            console.error('Failed to delete courier:', error);
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
                    Kurier: {courier?.name} {courier?.surname} (ID: {courierId})
                </h1>

                {/* Order Details */}
                <div className="flex flex-col gap-4">
                    {courier && (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Środek transportu:</span>
                                <span>{courier.delivery_transport} {courier.delivery_transport === 'Car' ? `(numer rej. ${courier.license_plate})` : ''}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Adres email:</span>
                                <span>{courier.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Numer telefonu:</span>
                                <span>{courier.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Założono konto:</span>
                                <span>{courier.created_at ? courier.created_at : 'Brak danych'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Ostatnie logowanie:</span>
                                <span>{courier.last_login ? courier.last_login : 'Nigdy'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Status konta:</span>
                                <span>{courier.status}</span>
                            </div>
                            <div className="flex justify-center space-x-4">
                                {courier.status === 'Active' &&
                                    <button 
                                        className="flex items-center space-x-1 bg-orange-100 shadow-md text-orange-700 border-orange-300 border rounded-lg p-1 hover:shadow-lg hover:bg-orange-200 hover:scale-105 transition-all duration-200"
                                        onClick={deactivateCourier}>
                                        <LockIcon width={20} height={20} color="text-orange-600" />
                                        <span>Dezaktywuj konto</span>
                                    </button>
                                }
                                {courier.status === 'Inactive' &&
                                    <button 
                                        className="flex items-center space-x-1 bg-lime-100 shadow-md text-lime-700 border-lime-300 border rounded-lg p-1 hover:shadow-lg hover:bg-lime-200 hover:scale-105 transition-all duration-200"
                                        onClick={activateCourier}>
                                        <UnlockIcon width={20} height={20} color="text-lime-600" />
                                        <span>Aktywuj konto</span>
                                    </button>
                                }
                                <button 
                                    className="flex items-center space-x-1 bg-red-100 shadow-md text-red-700 border-red-300 border rounded-lg p-1 hover:shadow-lg hover:bg-red-200 hover:scale-105 transition-all duration-200"
                                    onClick={deleteAccount}>
                                    <DeleteIcon width={20} height={20} color="text-red-600" />
                                    <span>Usuń konto</span>
                                </button>
                            </div>

                            <div className="border-t border-gray-300 pt-8 pb-4 mt-2 text-center">
                                <h2 className="text-xl font-bold">Zamówienia obecnie obsługiwane przez kuriera</h2>
                            </div>
                            <div className="flex flex-wrap justify-center items-center gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 600px)' }}>
                                {courierOrders.map(order => (
                                    <div className="flex flex-col items-between bg-cyan-200 bg-opacity-80 shadow-lg mb-5 mt-2 rounded-lg p-2 hover:scale-105 transition-all duration-200 cursor-pointer"
                                        key={order.id}
                                        onClick={()=> navigate(`/admin/orders/${order.id}`)} >
                                        <div className="flex text-center font-light space-x-2">
                                            <div><DeliveryIcon width={20} height={20} color="text-gray-600"/></div>
                                            <div>Zamówienie nr {order.id}</div>
                                        </div>
                                        <div className="flex justify-between font-light text-sm space-x-2">
                                            <span className="text-gray-700">Status:</span>
                                            <span>{translateStatus(order.status)}</span>
                                        </div>
                                        <div className="flex justify-between font-light text-sm space-x-2">
                                            <span className="text-gray-700">Klient:</span>
                                            <span>{order.client.name} {order.client.surname}</span>
                                        </div>
                                    </div>
                                )) 
                                }
                            </div>

                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(CourierDetails);