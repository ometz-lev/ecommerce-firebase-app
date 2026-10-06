//This component allows users to create new products and add them to the Firestore database
//Users can input product details such as title, description, price, category, and image URL

import React, { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface CreateProductsProps {
  onProductCreated?: () => void;
  initialValues?: Partial<ProductFormState>;
  productId?: string;
  mode?: 'create' | 'edit';
}

interface ProductFormState {
  title: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
}

interface ProductDocument {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt?: string;
}

const initialForm: ProductFormState = {
  title: '',
  description: '',
  price: '',
  category: '',
  imageUrl: '',
};

const formStyles: Record<string, React.CSSProperties> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '500px',
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fff',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
  },
  error: {
    color: '#b00020',
    margin: 0,
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.8rem 1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#0d6efd',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const CreateProducts: React.FC<CreateProductsProps> = ({
  onProductCreated,
  initialValues,
  productId,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<ProductFormState>({
    ...initialForm,
    ...initialValues,
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { title, description, price, category, imageUrl } = formData;

    if (!title.trim() || !description.trim() || Number(price) <= 0 || !category.trim()) {
      setError('Please fill in all fields with valid values.');
      return;
    }

    try {
      const productData: ProductDocument = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
        createdAt: new Date().toISOString(),
      };

      if (mode === 'edit' && productId) {
        const updateData = {
          title: productData.title,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          imageUrl: productData.imageUrl,
          createdAt: productData.createdAt,
        };
        await updateDoc(doc(db, 'products', productId), updateData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      setFormData({ ...initialForm, ...initialValues });
      onProductCreated?.();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        style={formStyles.input}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={formStyles.textarea}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        style={formStyles.input}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        style={formStyles.input}
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        style={formStyles.input}
      />

      {error && <p style={formStyles.error}>{error}</p>}

      <button type="submit" style={formStyles.button}>
        {mode === 'edit' ? 'Save Changes' : 'Create Product'}
      </button>
    </form>
  );
};

export default CreateProducts;