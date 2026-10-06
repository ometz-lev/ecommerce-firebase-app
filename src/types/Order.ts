//This file defines the TypeScript interface for an Order in the application.
import type { CartItem } from './Product';

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
}
