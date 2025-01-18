import { UserData } from "./redux/userSlice";

export const getClientID = async (accessToken: string) => {
  const response = await fetch('http://localhost:8000/user/me', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.client_id;
}


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

// Account
export const registerRequest = async (email: string, password: string) => {
  const response = await fetch('http://localhost:8000/register', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const createAdminRequest = async (accessToken: string, email: string, password: string) => {
  const response = await fetch('http://localhost:8000/user/admin', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getAccountReturns = async (accessToken: string) => {
  const response = await fetch('http://localhost:8000/account/returns', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const getAccountFavBrands = async (accessToken: string) => {
  const response = await fetch('http://localhost:8000/account/favbrands', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

// Shop
export const getShops = async () => {
  const response = await fetch('http://localhost:8000/shops', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const getShop = async (shopId: string) => {
  const response = await fetch(`http://localhost:8000/shop/${shopId}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const updateShop = async (shopId: string, shopData: any) => {
  const response = await fetch(`http://localhost:8000/shop/${shopId}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shopData),
  });
  return response.json();
};

export const deleteShop = async (shopId: string) => {
  const response = await fetch(`http://localhost:8000/shop/${shopId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const addShop = async (shopData: any) => {
  const response = await fetch('http://localhost:8000/shop', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shopData),
  });
  return response.json();
};

// Product
export const getProducts = async () => {
  const response = await fetch('http://localhost:8000/products', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const getProduct = async (productId: string) => {
  const response = await fetch(`http://localhost:8000/product/${productId}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const updateProduct = async (productId: string, productData: any) => {
  const response = await fetch(`http://localhost:8000/product/${productId}`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return response.json();
};

export const deleteProduct = async (productId: string) => {
  const response = await fetch(`http://localhost:8000/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const addProduct = async (shopId: string, productData: any) => {
  const response = await fetch(`http://localhost:8000/shop/${shopId}/product`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return response.json();
};

// Order
export const getOrdersByClient = async (accessToken: string,client_id: string) => {
  const response = await fetch(`http://localhost:8000/client/${client_id}/orders`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const getOrdersByCourier = async (courierId: string) => {
  const response = await fetch(`http://localhost:8000/courier/${courierId}/orders`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const getAllOrders = async () => {
  const response = await fetch('http://localhost:8000/orders', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const makeOrder = async (orderData: any) => {
  const response = await fetch('http://localhost:8000/orders', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const payOrder = async (orderId: string) => {
  const response = await fetch(`http://localhost:8000/orders/${orderId}/pay`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const cancelOrder = async (orderId: string) => {
  const response = await fetch(`http://localhost:8000/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const deleteOrder = async (orderId: string) => {
  const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const deliverOrder = async (orderId: string) => {
  const response = await fetch(`http://localhost:8000/orders/${orderId}/deliver`, {
    method: 'PATCH',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const getCouriers = async () => {
  const response = await fetch('http://localhost:8000/admin/couriers', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const assignCourier = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/admin/${userId}/courier`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};

export const removeCourier = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/admin/${userId}/courier`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
    },
  });
  return response.json();
};