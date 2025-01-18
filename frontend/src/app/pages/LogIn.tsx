import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest, getUserInfo, getClientID } from '../requests';
import { AppDispatch, RootState } from '../store/mainStore';
import { setUserDataThunk, UserData } from '../redux/userSlice';
import { enqueueSnackbar } from 'notistack';

interface Props {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

function LogInPage({userData, setUserData}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await loginRequest(email, password);
      if (data.access_token) {
        const userInfo = await getUserInfo(data.access_token);
        const clientID = await getClientID(data.access_token);
        
        setUserData({
          type: userInfo.user.user_type,
          name: userInfo.user.name,
          lastname: userInfo.user.surname,
          email: userInfo.user.email,
          access: data.access_token,
          clid: clientID
        });

        if (userInfo.user.user_type === 'Admin') {
          navigate("/admin");
          enqueueSnackbar('Zalogowano jako administrator, witaj ' + userInfo.user.name + '!', { variant: 'success' });
        } else if (userInfo.user.user_type === 'Courier') {
          navigate("/courier");
          enqueueSnackbar('Zalogowano jako kurier, witaj '+ userInfo.user.name + '!', { variant: 'success' });
        } else if (userInfo.user.user_type === 'Client') {
          navigate("/account/data");
          enqueueSnackbar('Zalogowano, witaj ' + userInfo.user.name + '!', { variant: 'success' });
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1E3A5F',
        color: 'white',
        fontFamily: "'Playfair Display', serif",
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          marginBottom: '20px',
          fontSize: '36px',
        }}
      >
        Zakupy szybko i w Twoim stylu - zaloguj się.
      </h1>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          gap: '15px',
        }}
      >
        {/* Email Field */}
        <label style={{ fontSize: '18px' }}>
          Email:
          <input
            type="email"
            placeholder="Wprowadź email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              color: '#000', // Set text color to black
              backgroundColor: '#fff', // Ensure contrast with the text
            }}
          />
        </label>

        {/* Password Field */}
        <label style={{ fontSize: '18px' }}>
          Hasło:
          <input
            type="password"
            placeholder="Wprowadź hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              color: '#000', // Set text color to black
              backgroundColor: '#fff', // Ensure contrast with the text
            }}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '5px',
            background: '#1E3A5F',
            color: 'white',
            fontWeight: 'bold',
            border: '2px solid #FFBF00',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}



const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        setUserData: (data: UserData) =>
            dispatch(setUserDataThunk(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);