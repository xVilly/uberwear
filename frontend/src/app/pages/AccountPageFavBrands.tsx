import React, { useEffect, useState } from 'react';
import { AccountSidebar } from './AccountSidebar';
import { getOrdersByClient } from '../requests';
import { connect } from 'react-redux';
import { RootState } from '../store/mainStore';
import { UserData } from '../redux/userSlice';

interface BrandRanking {
  brand: string;
  count: number;
}

export function AccountPageFavBrands({ userData }: { userData: UserData }) {
  const [favBrands, setFavBrands] = useState<BrandRanking[]>([]);

  useEffect(() => {
    const fetchFavBrands = async () => {
      try {
        const data = await getOrdersByClient(userData.access, userData.clid);
        const brandCount: { [key: string]: number } = {};

        data.forEach((order: any) => {
          order.products.forEach((product: any) => {
            const brand = product.product.shop.name;
            if (brandCount[brand]) {
              brandCount[brand] += product.ordered_amount;
            } else {
              brandCount[brand] = product.ordered_amount;
            }
          });
        });

        const sortedBrands = Object.entries(brandCount)
          .map(([brand, count]) => ({ brand, count }))
          .sort((a, b) => b.count - a.count);

        setFavBrands(sortedBrands);
      } catch (error) {
        console.error('Failed to fetch favorite brands:', error);
      }
    };

    fetchFavBrands();
  }, [userData.access]);

  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      <AccountSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
          Ulubione Marki
        </h1>
        <ul>
          {favBrands.map((brand, index) => (
            <li key={index} className="mb-5 p-4 bg-white shadow-md rounded-md">
              <div className="text-xl font-bold">{brand.brand}</div>
              <div className="text-lg">Ilość zamówionych ubrań: {brand.count}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(AccountPageFavBrands);
