//This component renders a button that allows users to add a product to their shopping cart.
//If the product is already in the cart, it displays a quantity selector with "+" and "−" buttons to increase or decrease the quantity.
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { addToCart, removeOneFromCart } from '../store/cartSlice';
import type { Product } from '../types/Product';

type AddToCartButtonProps = {
  product: Product;
  onMessage?: (message: string) => void;
  className?: string;
};

const AddToCartButton = ({ product, onMessage, className = '' }: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const normalizedClassName = className.replace(/\b(?:w-100|flex-fill)\b/g, '').trim();

  const quantity = items.find((item) => item.id === product.id)?.count ?? 0;
  const expanded = quantity > 0;

  // Handler for adding the product to the cart
  const handleAdd = () => {
    dispatch(addToCart(product));
    if (onMessage) {
      onMessage(`${product.title} added to cart`);
    }
  };

  // Handler for decreasing the quantity of the product in the cart
  const handleDecrease = () => {
    dispatch(removeOneFromCart(product.id));
  };

  // Handler for increasing the quantity of the product in the cart
  const handleIncrease = () => {
    dispatch(addToCart(product));
    if (onMessage) {
      onMessage(`${product.title} added to cart`);
    }
  };

  if (expanded) {
    return (
      <div
        className={`d-inline-flex align-items-center border rounded-pill overflow-hidden shadow-sm bg-light ${normalizedClassName}`}
        style={{ minWidth: '104px', width: 'fit-content', height: '38px' }}
      >
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleDecrease}
          className="rounded-0 border-0 px-2 py-1"
          style={{ minWidth: '32px', height: '100%', fontSize: '1.1rem', lineHeight: 1 }}
        >
          −
        </Button>

        <span className="flex-grow-1 text-center px-2 fw-semibold" style={{ fontSize: '0.95rem' }}>
          {quantity}
        </span>

        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleIncrease}
          className="rounded-0 border-0 px-2 py-1"
          style={{ minWidth: '32px', height: '100%', fontSize: '1.1rem', lineHeight: 1 }}
        >
          +
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      className={`rounded-pill ${normalizedClassName}`}
      onClick={handleAdd}
      style={{
        minWidth: '96px',
        width: 'fit-content',
        whiteSpace: 'nowrap',
        padding: '0.5rem 0.9rem',
        fontSize: '0.9rem',
        fontWeight: 600
      }}
    >
      + Add
    </Button>
  );
};

export default AddToCartButton;
