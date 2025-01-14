import { Link } from "react-router-dom";


export function AdminSidebar() {
    return (
        <nav className="w-64 bg-[#1E3A5F] border-r-4 border-yellow-500 p-5 text-gray-100">
            <ul className="list-none p-0 m-0">
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/admin/data"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Twoje dane
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/admin/orders"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Pokaż zamówienia
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/admin/couriers"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Pokaż kurierów
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/admin/users"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Pokaż użytkowników
                    </Link>
                </li>
            </ul>
        </nav>
    );
}