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

export const updateUserInfo = async (accessToken: string, formData: any) => {
  const body = {
    name: formData.Imię,
    surname: formData.Nazwisko,
    email: formData.Email,
    phone: formData['Numer Telefonu'],
    password: formData.Hasło,
  }

  const response = await fetch('http://localhost:8000/user/me', {
    method: 'PATCH',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const getOrders = async (accessToken: string) => {
  const response = await fetch('http://localhost:8000/orders', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.json();
}