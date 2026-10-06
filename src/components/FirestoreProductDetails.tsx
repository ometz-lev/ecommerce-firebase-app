import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Card, Spinner, Button } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface FirestoreProduct {
  id?: string;
  title?: string;
  description?: string;
  price?: number | string;
  imageUrl?: string;
  category?: string;
}

const FirestoreProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<FirestoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const productRef = doc(db, 'products', productId);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
          setError('Product not found.');
          setProduct(null);
          return;
        }

        setProduct({
          id: snapshot.id,
          ...(snapshot.data() as FirestoreProduct),
        });
      } catch (err) {
        console.error('Error loading product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <p className="text-danger">{error}</p>
        <Link to="/products-page">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <p>Product not found.</p>
        <Link to="/products-page">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <div className="row g-0">
          <div className="col-md-5 p-3 d-flex align-items-center justify-content-center bg-light">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title || 'Product'}
                style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
              />
            ) : (
              <div className="text-muted">No image available</div>
            )}
          </div>

          <div className="col-md-7">
            <Card.Body className="p-4">
              <p className="text-uppercase text-secondary small fw-bold mb-2">
                {product.category || 'Product'}
              </p>
              <Card.Title as="h2" className="mb-3">
                {product.title}
              </Card.Title>
              <Card.Text className="text-success fw-bold fs-4 mb-3">
                ${Number(product.price || 0).toFixed(2)}
              </Card.Text>
              <Card.Text className="text-muted mb-4">{product.description}</Card.Text>

              <div className="d-flex gap-2">
                <Link to="/products-page">
                  <Button variant="secondary">Back to Products</Button>
                </Link>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default FirestoreProductDetails;
