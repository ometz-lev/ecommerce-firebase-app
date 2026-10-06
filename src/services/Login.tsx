// This component allows users to log in with email and password using Firebase Authentication
// Upon login, the user's session will be managed by Firebase

import { useEffect, useState, type FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { auth } from '../firebaseConfig';
import authStyles from '../styles/Auth-styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
 
  //authLoading tracks whether Firebase is still checking the user's authentication status
  const { user, loading: authLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    //Authenticated users are directed to the profile page, while unauthenticated users remain on the login page.
    if (!authLoading && user) {
      navigate('/profile', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      //Resets the input fields after user is successfully authenticated
      setEmail('');
      setPassword('');

    } catch (err: unknown) {
      // Handle specific Firebase Authentication errors and provide user-friendly messages
      const code =
        err && typeof err === 'object' && 'code' in err
          ? String(err.code)
          : '';

      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;

        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;

        case 'auth/too-many-requests':
          setError(
            'Too many unsuccessful attempts. Please try again later.'
          );
          break;

        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;

        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div style={authStyles.page}>
      <div style={authStyles.card}>
        <h2 style={authStyles.title}>Login</h2>

        <form onSubmit={handleLogin} style={authStyles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={authStyles.input}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={authStyles.input}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            style={authStyles.button}
            disabled={loginLoading || authLoading}          //Button is disabled while request is in progress
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <p role="alert" style={authStyles.error}>
              {error}
            </p>
          )}
        </form>

        <p style={authStyles.text}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={authStyles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;