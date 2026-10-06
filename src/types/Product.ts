// This component defines the structure of a product throughout the app

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CartItem extends Product {
    count: number;
}