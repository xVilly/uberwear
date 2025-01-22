import React from 'react';
import { AccountSidebar } from './AccountSidebar';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';

export function AccountPageReturns() {
  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      <AccountSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
          Zwroty
        </h1>
        <ul>
          {/* Render return item details here */}
        </ul>
      </div>
    </div>
  );
}

export default AccountPageReturns;
