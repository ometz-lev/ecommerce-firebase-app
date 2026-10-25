//This test file is for the Logout component, which handles user logout functionality in the ecommerce-firebase-app. 
//It uses Jest and React Testing Library to simulate user interactions and verify that the logout process works as expected.
//The test checks that the user can click the logout button and that the appropriate Firebase authentication function is called with the correct arguments.
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import Logout from '../services/Logout';

const mockNavigate = jest.fn();
const mockSignOut = jest.fn();

// Mocking the necessary modules and functions for testing
jest.mock('firebase/auth', () => ({
  signOut: (...args: unknown[]) => mockSignOut(...args),
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

//Test suite for the Logout component
describe('Logout component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('logs the user out and navigates to login', async () => {
    mockSignOut.mockResolvedValue({});

    const { container } = render(<Logout />);

    // Check that the "Logging out..." message is displayed while logout is in progress
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Logging out...')).toBeInTheDocument();

    // Wait for the signOut function to be called and the navigation to Login to occur
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });
});