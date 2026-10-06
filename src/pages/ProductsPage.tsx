// This component creates a product page that allows the user to create, read, update, and delete products.
// It fetches the product list from Firestore and displays it in a grid format.
//  The user can add a new product using the form at the top of the page, edit an existing product by clicking the "Edit" button, or delete a product by clicking the "Delete" button. The component handles form validation, loading states, and error messages. After each successful create, update, or delete operation, the product list is refreshed to reflect the changes.

import { useEffect, useState, useCallback } from 'react';

import type { Product } from '../types/Product';
import { productStyles } from '../styles/product-styles';

import {
  getProducts,
  createProduct,
  editProduct,
  removeProduct,
} from '../services/productService';

const emptyForm = {
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // READ: Fetch products from Firestore
  const loadProducts = useCallback(async () => {
    try {
      setError('');
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('Could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  // Update form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // CREATE or UPDATE a product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = Number(form.price);

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      !form.image.trim() ||
      form.price.trim() === '' ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError('Enter valid product details and a non-negative price.');
      return;
    }

    const productData = {
      title: form.title.trim(),
      price,
      description: form.description.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
    };

    try {
      setSaving(true);
      setError('');

      if (editingId) {
        await editProduct(editingId, productData);
      } else {
        await createProduct(productData);
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProducts();
    } catch (err) {
      console.error(err);
      setError('Could not save the product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Load product details into the form
  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setForm({
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
    });

    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DELETE an existing product
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    try {
      setError('');
      await removeProduct(id);
      await loadProducts();

      if (editingId === id) {
        handleCancel();
      }
    } catch (err) {
      console.error(err);
      setError('Could not delete the product. Please try again.');
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main style={productStyles.page}>
      <h1 style={productStyles.heading}>Product Management</h1>

      {error && <p role="alert" style={productStyles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={productStyles.form}>
        <h2 style={productStyles.formTitle}>{editingId ? 'Edit Product' : 'Add Product'}</h2>

        <label htmlFor="title" style={productStyles.label}>Product name</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          style={productStyles.input}
        />

        <label htmlFor="price" style={productStyles.label}>Price</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          style={productStyles.input}
        />

        <label htmlFor="description" style={productStyles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          style={productStyles.textarea}
        />

        <label htmlFor="category" style={productStyles.label}>Category</label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          style={productStyles.input}
        />

        <label htmlFor="image" style={productStyles.label}>Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          required
          style={productStyles.input}
        />

        <div style={productStyles.buttonRow}>
          <button type="submit" disabled={saving} style={productStyles.button}>
            {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button type="button" onClick={handleCancel} style={productStyles.secondaryButton}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr />

      <h2 style={productStyles.sectionHeader}>Existing Products ({products.length})</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products found. Add your first product above.</p>
      ) : (
        <div style={productStyles.productsGrid}>
          {products.map((product) => (
            <article key={product.id} style={productStyles.productCard}>
              <img
                src={product.image}
                alt={product.title}
                width="180"
                loading="lazy"
                style={productStyles.productImage}
              />

              <h3 style={productStyles.productTitle}>{product.title}</h3>
              <p style={productStyles.productPrice}>${product.price.toFixed(2)}</p>
              <p style={productStyles.productMeta}>{product.category}</p>
              <p style={productStyles.productDescription}>{product.description}</p>

              <div style={productStyles.actions}>
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  style={productStyles.smallButton}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  style={productStyles.dangerButton}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;