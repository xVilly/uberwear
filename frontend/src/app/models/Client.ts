
export interface Client {
    client_ID: number;
    user_ID: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    created_at: string;
    status: string;
    last_login: string|null;
    loyalty_points: number;
    address: {
        address_ID: number;
        street: string;
        city: string;
        postcode: string;
        district: string;
    }
}