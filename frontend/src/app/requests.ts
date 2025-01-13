import { UserData } from "./redux/userSlice";

export const loginRequest = async (email: string, 
  password: string 
) => {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const getUserInfo = async (accessToken: string) => {
  const response = await fetch('http://localhost:8000/user/me', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const updateUserInfo = async (formData: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch('http://localhost:8000/user/update', {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response.json();
};
