import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountSidebar } from './AccountSidebar';
import { getLoyaltyPoints } from '../requests';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';

export function AccountPagePoints({ userData }: { userData: UserData }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await getLoyaltyPoints(userData.access);
        setPoints(data);
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    };

    fetchPoints();
  }, [userData.access]);

  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      <AccountSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
      <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
        Punkty lojalnościowe
        </h1>
      <ul>
         
            <li className="mb-5 p-4 bg-white shadow-md rounded-md">
              <div className="text-lg">Ilość punktów, które posidasz: {points}</div>
            </li>
          
        </ul>
        </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(AccountPagePoints);
