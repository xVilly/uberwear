import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../requests';
import { RootState } from '../store/mainStore';
import { connect } from 'react-redux';
import AdminData from './admin/AdminData';
import { UserData } from '../redux/userSlice';

type FormData = {
  Imię: string;
  Nazwisko: string;
  Email: string;
  'Numer Telefonu': string;
  Hasło: string;
};
function AccountPageData({userData}: {userData: UserData}) {
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
    console.log("test");
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
        console.log(userInfo);
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
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Left Navigation Bar */}

      <nav
        style={{
          width: '250px',
          background: '#1E3A5F',
          borderRight: '3px solid #FFC107',
          padding: '20px',
          color: '#F3F4F6',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/data"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Twoje dane
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/orders"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Zamówienia
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/returns"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Zwroty
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/points"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Punkty
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link
              to="/account/favbrands"
              style={{
                textDecoration: 'none',
                color: '#F3F4F6',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              Ulubione Marki
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '40px',
        }}
      >
        {/* Caption */}
        <h1
          style={{
            fontSize: '36px',
            marginBottom: '30px',
            position: 'relative',
            fontWeight: 'bold',
          }}
        >
          Twoje dane
          <span
            style={{
              position: 'absolute',
              left: 0,
              bottom: -10,
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 193, 7, 0.8)',
            }}
          ></span>
        </h1>

        {/* Data Fields */}
        {Object.entries(formData).map(([field, value]) => (
          <div
            key={field}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '2px solid #FFBF00',
              borderRadius: '5px',
              padding: '15px 20px',
              marginBottom: '20px',
              backgroundColor: '#1E3A5F',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: 'white',
              }}
            >
              <strong>{field}:</strong> {value}
            </div>
            <button
              style={{
                padding: '10px',
                borderRadius: '5px',
                background: '#1E3A5F',
                color: 'white',
                fontWeight: 'bold',
                border: '2px solid #FFBF00',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              onClick={() => handleEditClick(field as keyof FormData)}
            >
              Edytuj
            </button>
          </div>
        ))}

        {/* Popup Window */}
        {isPopupOpen && currentField && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h2
                style={{
                  marginBottom: '20px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1E3A5F',
                }}
              >
                Edytuj {currentField}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    Nowa wartość:
                  </label>
                  <input
                    type={currentField === 'Hasło' ? 'password' : 'text'}
                    value={formData[currentField]}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '2px solid #FFBF00',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={closePopup}
                    style={{
                      padding: '10px 15px',
                      borderRadius: '5px',
                      background: '#FF4B4B',
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      fontSize: '16px',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 15px',
                      borderRadius: '5px',
                      background: '#1E3A5F',
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
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


export default connect(mapStateToProps)(AccountPageData);