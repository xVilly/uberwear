import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/clothes_logo.png';

export function UserLoggedNavbar({ userName }: { userName: string }) {
    const navigate = useNavigate();

    return (
        <nav className="sticky left-0 top-0 z-40 max-h-20 min-w-full flex-shrink-0 flex-grow-0 print:hidden">
            <div className="bg-[#1E3A5F] border-b-amber-300 border-b-4 h-full max-h-20 shadow-2xl">
                <div className="page-container flex h-full items-center text-lg text-white">
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="flex flex-row space-x-8 items-center">
                            <img
                                src={Logo}
                                alt="logo"
                                onClick={() => window.open('')}
                                className="w-24 -mt-3 hover:scale-110 transition-all duration-500 cursor-pointer"
                            />
                            <div className="font-playfair text-2xl">QuickFit</div>
                        </div>
                        <div className="flex flex-row space-x-8 items-center">
                            <div
                                className="font-light text-2xl cursor-pointer"
                                onClick={() => navigate('/profile')}
                            >
                                Witaj, {userName}
                            </div>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={() => {
                                    navigate('/gate/login');
                                }}
                            >
                                Wyloguj się
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
