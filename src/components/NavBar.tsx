// React bootstrap components for the navigation bar
//Navigation Bar component with links to Profile, Products, Register and Shopping Cart
import { useAuth } from '../context/useAuth';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const NavBar = () => {
  const { user } = useAuth();
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + item.count, 0));

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand ms-auto">
          My E-Commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>            
                <Nav.Link as={Link} to="/products">
                  Product Management
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/orders">
                  Orders
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              <span style={{ fontSize: '1.2rem' }} aria-hidden>🛒</span>
              {cartCount > 0 ? (
                <Badge bg="danger" pill className="ms-2">
                  {cartCount}
                </Badge>
              ) : null}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
