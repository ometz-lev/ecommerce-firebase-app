import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../firebaseConfig';
import type { Product } from '../types/Product';

const productsCollection = collection(db, 'products');

// READ: Fetch all products from Firestore DB
export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(productsCollection);

  return querySnapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  })) as Product[];
};

// CREATE: Add a product to Firestore DB
export const createProduct = async (
  product: Omit<Product, 'id'>
): Promise<string> => {
  const docRef = await addDoc(productsCollection, product);
  return docRef.id;
};

// UPDATE: Edit an existing product in Firestore
export const editProduct = async (
  id: string,
  product: Partial<Omit<Product, 'id'>>
): Promise<void> => {
  const productRef = doc(db, 'products', id);
  await updateDoc(productRef, product);
};

// DELETE: Remove a product from Firestore DB
export const removeProduct = async (id: string): Promise<void> => {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
};