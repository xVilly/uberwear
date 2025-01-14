import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../../requests';
import { AppDispatch, RootState } from '../../store/mainStore';
import { connect } from 'react-redux';
import { UserData } from '../../redux/userSlice';
import { enqueueSnackbar } from 'notistack';
import { AdminSidebar } from './Sidebar';

type FormData = {
  Imię: string;
  Nazwisko: string;
  Email: string;
  'Numer Telefonu': string;
  Hasło: string;
};

function AdminData({ userData }: { userData: UserData }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentField, setCurrentField] = useState<keyof FormData | null>(null); // Typed to keys of FormData or null
  const [formData, setFormData] = useState<FormData>({
    Imię: '',
    Nazwisko: '',
    Email: '',
    'Numer Telefonu': '',
    Hasło: '********',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(userData.access);
        setFormData({
          Imię: userInfo.user.name,
          Nazwisko: userInfo.user.surname,
          Email: userInfo.user.email,
          'Numer Telefonu': userInfo.user.phone,
          Hasło: '********',
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);


  // Open popup
  const handleEditClick = (field: keyof FormData) => {
    setCurrentField(field);
    setIsPopupOpen(true);
  };

  // Close popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentField(null);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentField) {
      setFormData({
        ...formData,
        [currentField]: e.target.value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserInfo(userData.access, formData);
      closePopup();
      enqueueSnackbar('Zaktualizowano dane', { variant: 'success' });
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 text-[#1E3A5F] font-playfair">
      {/* Left Navigation Bar */}
      {<AdminSidebar />}

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Caption */}
        <h1 className="text-4xl mb-8 relative font-bold text-center border-b-yellow-400 border-b-2">
          Twoje dane
        </h1>

        {/* Data Fields */}
        {Object.entries(formData).map(([field, value]) => (
          <div
            key={field}
            className="flex items-center justify-between border-2 border-yellow-500 rounded-md p-4 mb-5 bg-[#1E3A5F]"
          >
            <div className="text-lg font-light text-white">
              <strong>{field}:</strong> {value}
            </div>
            <button
              className="p-2 rounded-md bg-[#1E3A5F] text-white font-bold border-2 border-yellow-500 text-lg cursor-pointer hover:scale-110 transition-all duration-200"
              onClick={() => handleEditClick(field as keyof FormData)}
            >
              Edytuj
            </button>
          </div>
        ))}

        {/* Popup Window */}
        {isPopupOpen && currentField && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-[#1E3A5F]">
                Edytuj {currentField}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block mb-2 text-lg font-medium">
                    Nowa wartość:
                  </label>
                  <input
                    type={currentField === 'Hasło' ? 'password' : 'text'}
                    value={formData[currentField]}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-2 border-yellow-500 text-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="py-1 px-2 rounded-md bg-red-600 text-white shadow-md border-red-900 border text-lg mr-2 cursor-pointer hover:scale-110 transition-all duration-200"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="py-1 px-2 rounded-md bg-[#1E3A5F] text-white shadow-md border-black border text-lg cursor-pointer hover:scale-110 transition-all duration-200"
                  >
                    Zapisz
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const mapStateToProps = (state: RootState) => ({ userData: state.user.user });


export default connect(mapStateToProps)(AdminData);