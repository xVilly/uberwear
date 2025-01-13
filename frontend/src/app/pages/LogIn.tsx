import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setUserDataThunk, UserData } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/mainStore';

interface Props {
  accessToken: string | null;
  userData: UserData;
  setAccessToken: (token: string) => void;
  setUserData: (data: UserData) => void;
}

function LogInPage({accessToken, userData, setAccessToken, setUserData}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.access_token) {
        // Save the token in local storage or context
        localStorage.setItem('token', data.access_token);
        setAccessToken(data.access_token);
        const response2 = await fetch('http://localhost:8000/user/me', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${data.access_token}`,
          },
        });
        const userInfo = await response2.json();
        setUserData({
          type: userInfo.user.user_type,
          name: userInfo.user.name,
          lastname: userInfo.user.surname,
          email: userInfo.user.email
        });
        //localStorage.setItem('user', JSON.stringify(userInfo));
        
        if (userInfo.user.user_type === 'Admin') {
          navigate("/admin");
        } else if (userInfo.user.user_type === 'Courier') {
          navigate("/courier");
        } else if (userInfo.user.user_type === 'Client') {
          navigate("/account/data");
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



const mapStateToProps = (state: RootState) => ({ accessToken: state.user.accessToken, userData: state.user.user });

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        setAccessToken: (token: string) =>
            dispatch(setAccessToken(token)),
        setUserData: (data: UserData) =>
            dispatch(setUserDataThunk(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);