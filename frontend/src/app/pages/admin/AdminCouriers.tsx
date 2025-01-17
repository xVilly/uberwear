import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';
import { getOrders } from '../../requests';
import { UserData } from '../../redux/userSlice';
import { RootState } from '../../store/mainStore';
import { connect } from 'react-redux';
import { Order } from '../../models/Order';
import { DeliveryIcon, MailIcon, PhoneIcon } from '../../components/SVG';
import { Courier } from '../../models/Courier';
import { getCouriers } from './adminRequests';

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

const AdminCouriers = ({userData}: {userData : UserData}) => {

    const [couriersList, setCouriersList] = useState<Courier[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [pageSize] = useState(10); // Number of items per page


    const fetchCouriers = async (start: number) => {
        try {
          const couriers = await getCouriers(userData.access, start, pageSize);
          setCouriersList(couriers);
        } catch (error) {
          console.error('Failed to fetch couriers:', error);
        }
    };


    useEffect(() => {
        fetchCouriers(startIndex);
    }, [startIndex]);

    const handleNextPage = () => {
        setStartIndex(startIndex + pageSize);
    };

    const handlePreviousPage = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - pageSize);
        }
    };

      return (
        <div className="h-screen flex bg-gray-100 text-[#1E3A5F]">
            {/* Left Navigation Bar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-10">
                {/* Caption */}
                <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
                    Dostępni Kurierzy
                </h1>

                {/* Orders */}
                <div className="flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {couriersList.map(courier => (
                        <Link
                            to={`/admin/couriers/${courier.courier_ID}`}
                            key={courier.courier_ID}
                            className="flex items-center justify-between p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200"
                        >
                            <div>
                                <h2 className="text-xl font-bold">{courier.name} {courier.surname} (ID:{courier.courier_ID})</h2>
                                {courier.delivery_transport === 'Car' ?
                                    <p className="text-sm text-gray-500">{courier.delivery_transport} - {courier.license_plate}</p>
                                :
                                    <p className="text-sm text-gray-500">{courier.delivery_transport.length > 0 ? courier.delivery_transport : 'Other transport'}</p>
                                }
                            </div>
                            <div className="flex-col text-right">
                                <div className="flex space-x-1 justify-end">
                                    <PhoneIcon width={20} height={20} color="text-gray-500" />
                                    <p className="text-sm text-gray-500">{courier.phone}</p>
                                </div>
                                <div className="flex space-x-1 justify-end">
                                    <MailIcon width={20} height={20} color="text-gray-500" />
                                    <p className="text-sm text-gray-500">{courier.email}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={startIndex === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:hover:scale-100 hover:scale-110 transition-all duration-200 disabled:opacity-50"
                    >
                        Poprzednia strona
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={couriersList.length < pageSize}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:hover:scale-100 hover:scale-110 transition-all duration-200 disabled:opacity-50"
                    >
                        Następna strona
                    </button>
                </div>
            </div>
        </div>
    );
};



const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(AdminCouriers);