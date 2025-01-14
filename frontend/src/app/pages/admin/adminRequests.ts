export const getOrderDetails = async (accessToken: string, orderId: string) => {
    const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.json();
}

export const requestCancelOrder = async (accessToken: string, orderId: string) => {
    const response = await fetch(`http://localhost:8000/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.json();
}

export const requestDeleteOrder = async (accessToken: string, orderId: string) => {
    const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.json();
}