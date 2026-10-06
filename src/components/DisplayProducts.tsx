//This component allows the user to fetch and view all products from the Firestore database

import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}


const DisplayData = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Products List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>Title: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Category: {product.category}</p>
          <img src={product.imageUrl} alt={product.title} />
        </div>
      ))}
    </div>
  );
};

export default DisplayData;