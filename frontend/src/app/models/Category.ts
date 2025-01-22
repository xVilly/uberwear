
export interface Category {
    name: string;
    image: string;
}

export interface CategoriesResponse {
    shop_id: number;
    categories: Category[];
}