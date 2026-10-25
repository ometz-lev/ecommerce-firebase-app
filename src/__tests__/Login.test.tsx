// This test component is for the Login component, which handles user login functionality in the ecommerce-firebase-app.
// It uses Jest and React Testing Library to simulate user interactions and verify that the login process works as expected.
// The test checks that the user can input their email and password, submit the form, and that the appropriate Firebase authentication function is called with the correct arguments.
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { useAuth } from '../context/useAuth';
import Login from '../services/Login';

// Mocking the necessary modules and functions for testing
const mockNavigate = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args: unknown[]) =>
    mockSignInWithEmailAndPassword(...args),
}));

jest.mock('../firebaseConfig', () => ({
  auth: {},
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('../context/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Test suite for the Login component
describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();                             //Clears any previous mock calls
    (useAuth as jest.Mock).mockReturnValue({           //Mocks the useAuth hook to return a default state
      user: null,
      loading: false,
    });
  });

  it('accepts user input and submits the login form', async () => {
    const user = userEvent.setup();

    // Mocks the Firebase signInWithEmailAndPassword function to resolve with a user object
    mockSignInWithEmailAndPassword.mockResolvedValue({          
      user: { uid: 'abc123' },
    });

    const { container } = render(<Login />);                  //Renders the Login component for testing

    expect(container).toMatchSnapshot();                      //Snapshot test for the initial render

    // Simulate user input and form submission
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'Password123');

    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('Password123');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'user@example.com',
        'Password123'
      );
    });
  });
});
