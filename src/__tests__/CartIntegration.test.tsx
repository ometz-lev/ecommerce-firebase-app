//This test file is for integration testing of the cart functionality in the e-commerce app.
//It checks if adding a product to the cart updates the Redux store, renders the correct UI and asserts the expected behavior.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddToCartButton from '../components/AddToCartButton';
import cartReducer from '../store/cartSlice';
import type { Product } from '../types/Product';

// Define a sample product to be used in the test
const product: Product = {
  id: 'abcd01',
  title: 'Wireless Keyboard',
  price: 39.99,
  description: 'Ergonomic wireless keyboard',
  category: 'Electronics',
  image: 'https://example.com/keyboard.jpg',
};

// Describe the integration test suite for the cart functionality
describe('Cart integration', () => {
  it('updates the cart when a product is added', async () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    const user = userEvent.setup();

    // Render the AddToCartButton component within the Redux Provider to provide access to the store
    const { container } = render(
      <Provider store={store}>
        <AddToCartButton product={product} />
      </Provider>
    );

    expect(container).toMatchSnapshot();

    // Get the "Add to Cart" button and assert its presence in the document
    const addButton = screen.getByRole('button', { name: /\+ add/i });

    expect(addButton).toBeInTheDocument();

    // Assert that the cart is initially empty
    expect(store.getState().cart.items).toEqual([]);

    // Simulate a user clicking the "Add to Cart" button
    await user.click(addButton);

    // Assert that the cart now contains the added product with a count of 1
    expect(store.getState().cart.items).toEqual([
      {
        ...product,
        count: 1,
      },
    ]);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '−' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
