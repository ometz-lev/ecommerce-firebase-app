//This is the main application component that sets up routing for the e-commerce web app.
//It imports necessary components and pages, and defines routes for different parts of the
// application, including the dashboard, profile, registration, login, logout, products, shopping cart, checkout, and order history.

import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Register from './services/Register';
import Login from './services/Login';
import Logout from './services/Logout';
import ProductsPage from './pages/ProductsPage';
import FirestoreProductDetails from './components/FirestoreProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import CheckOut from './components/CheckOut';
import OrderHistory from './pages/OrderHistory';


function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />                // Home page route
      <Route path="/profile" element={<Profile />} />         // User profile route
      <Route path="/register" element={<Register />} />        // User registration route
      <Route path="/login" element={<Login />} />              // User login route
      <Route path="/logout" element={<Logout />} />            // User logout route
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<FirestoreProductDetails />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<CheckOut />} />
    </Routes>
    </>
  );

}

export default App;
