import { connect } from "react-redux";
import { UserData } from "../../redux/userSlice";
import { AdminSidebar } from "./Sidebar";
import { RootState } from "../../store/mainStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { getClientDetails, getClientOrders, getCourierDetails, getCourierOrders, getOrderDetails, requestActivateUser, requestCancelOrder, requestDeactivateUser, requestDeleteOrder } from "./adminRequests";
import { translateStatus } from "./AdminOrders";
import { CancelIcon, DeleteIcon, DeliveryIcon, LockIcon, UnlockIcon } from "../../components/SVG";
import { enqueueSnackbar } from "notistack";
import { Courier } from "../../models/Courier";
import { Client } from "../../models/Client";


function ClientDetails({ userData }: { userData: UserData }) {
    const { clientId } = useParams<{ clientId: string }>();
    const navigate = useNavigate();

    const [client, setClient] = useState<Client | null>(null);

    const [clientOrders, setClientOrders] = useState<Order[]>([]);

    const fetchClient = async () => {
        try {
            if (clientId !== undefined) {
                const data = await getClientDetails(userData.access, clientId);
                setClient(data);
            }
        } catch (error) {
            console.error('Failed to fetch client:', error);
        }
    };

    const fetchClientOrders = async () => {
        try {
            if (clientId !== undefined) {
                const orders = await getClientOrders(userData.access, clientId);
                setClientOrders(orders);
            }
        } catch (error) {
            console.error('Failed to fetch client orders:', error);
        }
    }

    useEffect(() => {
        fetchClient();
        fetchClientOrders();
    }, [clientId]);

    const deactivateClient = async () => {
        if (!client) return;
        try {
            await requestDeactivateUser(userData.access, client.user_ID.toString());
            enqueueSnackbar('Konto klienta dezaktywowane', { variant: 'success' });
            fetchClient(); // Refetch the client after deactivation
        } catch (error) {
            console.error('Failed to deactivate client:', error);
        }
    }

    const activateClient = async () => {
        if (!client) return;
        try {
            await requestActivateUser(userData.access, client.user_ID.toString());
            enqueueSnackbar('Konto klienta aktywowane', { variant: 'success' });
            fetchClient(); // Refetch the client after activation
        } catch (error) {
            console.error('Failed to activate client:', error);
        }
    }

    const deleteAccount = async () => {
        if (!clientId) return;
        try {
            //await requestDeleteCourier(userData.access, courierId);
            enqueueSnackbar('Konto klienta usunięte', { variant: 'success' });
            navigate('/admin/clients');
        } catch (error) {
            console.error('Failed to delete client:', error);
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
                    Klient: {client?.name} {client?.surname} (ID: {clientId})
                </h1>

                {/* Details */}
                <div className="flex flex-col gap-4">
                    {client && (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Adres email:</span>
                                <span>{client.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Numer telefonu:</span>
                                <span>{client.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Założono konto:</span>
                                <span>{client.created_at ? client.created_at : 'Brak danych'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Ostatnie logowanie:</span>
                                <span>{client.last_login ? client.last_login : 'Nigdy'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Status konta:</span>
                                <span>{client.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Punkty:</span>
                                <span>{client.loyalty_points}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xl font-bold">Adres:</span>
                                <span>{client.address.street}, {client.address.district} {client.address.postcode} {client.address.city}</span>
                            </div>
                            <div className="flex justify-center space-x-4">
                                {client.status === 'Active' &&
                                    <button 
                                        className="flex items-center space-x-1 bg-orange-100 shadow-md text-orange-700 border-orange-300 border rounded-lg p-1 hover:shadow-lg hover:bg-orange-200 hover:scale-105 transition-all duration-200"
                                        onClick={deactivateClient}>
                                        <LockIcon width={20} height={20} color="text-orange-600" />
                                        <span>Dezaktywuj konto</span>
                                    </button>
                                }
                                {client.status === 'Inactive' &&
                                    <button 
                                        className="flex items-center space-x-1 bg-lime-100 shadow-md text-lime-700 border-lime-300 border rounded-lg p-1 hover:shadow-lg hover:bg-lime-200 hover:scale-105 transition-all duration-200"
                                        onClick={activateClient}>
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
                                <h2 className="text-xl font-bold">Historia zamówień klienta</h2>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-4 py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 600px)' }}>
                                {clientOrders.length === 0 && (
                                    <p className="text-center text-gray-500">Brak zamówień</p>
                                )}
                                {clientOrders.map(order => (
                                    <div key={order.id} 
                                        className="flex items-center w-full cursor-pointer justify-between p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200"
                                        onClick={() => navigate(`/admin/orders/${order.id}`)}>
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
                                    </div>
                                ))}
                            </div>

                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(ClientDetails);