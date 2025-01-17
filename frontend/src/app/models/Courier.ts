
export interface Courier {
    courier_ID: number;
    user_ID: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    created_at: string;
    status: string;
    last_login: string|null;
    delivery_transport: string;
    license_plate: string;
}