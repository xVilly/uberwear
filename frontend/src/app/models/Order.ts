
export interface Order {
    id: number;
    date: string;
    status: string;
    client: {
        id: number;
        name: string;
        surname: string;
    };
    payment: {
        id: number;
        status: string;
        method: string;
    };
    address: {
        street: string;
        city: string;
        postcode: string;
    };
    courier: {
        id: number;
        name: string;
        surname: string;
        delivery_transport: string;
        license_plate: string;
    };
    products: {
        product: {
            id: number;
            name: string;
            price: number;
            shop: {
                id: number;
                name: string;
            };
        };
        ordered_amount: number;
    }[];

}