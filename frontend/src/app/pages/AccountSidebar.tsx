import { Link } from "react-router-dom";

export function AccountSidebar() {
    return (
        <nav className="w-64 bg-[#1E3A5F] border-r-4 border-yellow-500 p-5 text-gray-100">
            <ul className="list-none p-0 m-0">
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/account/data"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Twoje dane
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/account/orders"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Zamówienia
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/account/points"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Punkty
                    </Link>
                </li>
                <li className="mb-4 group hover:translate-x-4 transition-all duration-200">
                    <Link
                        to="/account/favbrands"
                        className="no-underline text-gray-100 text-lg font-medium group-hover:text-gray-300 transition-all duration-200"
                    >
                        Ulubione Marki
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
