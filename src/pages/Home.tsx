// This component displays the products from the Firestore database.
// It fetches products and displays them with Add to Cart functionality.

import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { getProducts } from '../services/productService';
import { productStyles } from '../styles/product-styles';
import { useImageFallback } from '../hooks/useImageFallback';
import AddToCartButton from '../components/AddToCartButton';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { handleImageError, hasFailed } = useImageFallback();

  // READ: Fetch products from Firestore
  useEffect(() => {
    const loadProducts = async () => {
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
    };

    void loadProducts();
  }, []);                         // Fetch products on component mount

  // Extract unique categories
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filter products by category
  const filteredProducts =
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleClearFilter = () => {
    setActiveCategory('all');
  };

  if (loading) {
    return <p style={productStyles.dashboardLoading}>Loading products...</p>;
  }

  return (

    <main style={productStyles.page}>
      <h1 style={productStyles.heading}>Our Products</h1>

      <div style={productStyles.filterStyle}>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          onClear={handleClearFilter}
        />
      </div>

      {error && <p role="alert" style={productStyles.error}>{error}</p>}

      {message && (
        <div style={{
          ...productStyles.error,
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #bbf7d0',
        }}>
          {message}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <p style={productStyles.noFilterProducts}>No products available.</p>
      ) : (
        <div style={{ ...productStyles.productsGrid, width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          {filteredProducts.map((product) => (
            <article key={product.id} style={productStyles.productCard}>
              <img
                src={hasFailed(product.id) ? 'https://via.placeholder.com/180x180?text=No+Image' : product.image}
                alt={product.title}
                width="180"
                loading="lazy"
                style={productStyles.productImage}
                onError={() => handleImageError(product.id)}
              />

              <h3 style={productStyles.productTitle}>{product.title}</h3>
              <p style={productStyles.productPrice}>${product.price.toFixed(2)}</p>
              <p style={productStyles.productMeta}>{product.category}</p>
              <p style={productStyles.productDescription}>{product.description}</p>

              <div style={productStyles.actions}>
                <AddToCartButton
                  product={product}
                  onMessage={setMessage}
                  className="btn btn-sm"
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;