//This component logouts a user

import {useEffect, useState} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);

        alert('You have been logged out successfully.');
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
        setLoading(false);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      {loading ? <p>Logging out...</p> : <p>Logout failed. Please try again.</p>}
    </div>
  );
};

export default Logout;