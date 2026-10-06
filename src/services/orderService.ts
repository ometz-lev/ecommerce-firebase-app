import {collection, addDoc, getDocs, query, where,} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Order } from '../types/Order';

const ordersCollection = collection(db, 'orders');

// CREATE: Save an order to Firestore
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  const docRef = await addDoc(ordersCollection, {
    ...order,
    orderDate: new Date().toISOString(),
  });
  return docRef.id;
};

// READ: Get all orders for a specific user
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

// READ: Get all orders (admin view)
export const getAllOrders = async (): Promise<Order[]> => {
  const querySnapshot = await getDocs(ordersCollection);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};
