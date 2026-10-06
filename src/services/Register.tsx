// This component allows new users to register with email and password using Firebase Authentication
// Upon registration, create a corresponding user document in the users collection in Firestore

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import authStyles from '../styles/Auth-styles';
import type {Address} from '../types/Address';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<Address>({ street: '', city: '', state: '' }); 
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedStreet = address.street.trim();
    const trimmedCity = address.city.trim();
    const trimmedState = address.state.trim();

    // Validate that all fields are filled
    if (!trimmedEmail || !trimmedName || !password || !trimmedStreet || !trimmedCity || !trimmedState) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    let accountCreated = false;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);

      const user = userCredential.user;
      accountCreated = true;

      await updateProfile(user, {
        displayName: trimmedName,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: trimmedName,
        email: trimmedEmail,
        street: trimmedStreet,
        city: trimmedCity,
        state: trimmedState,
        createdAt: serverTimestamp(),
      });

      alert('Registration successful! Please log in.');
      //Reset form fields after successful registration and navigate to login page
      setEmail('');
      setName('');
      setAddress({ street: '', city: '', state: '' });
      setPassword('');
      navigate('/login');
      
    } catch (err: unknown) {
      if (accountCreated && auth.currentUser) {
        // If the account was created but an error occurred afterward, delete the user to avoid 
        // orphaned accounts
        try {
          await deleteUser(auth.currentUser);
        } catch {
          console.error('Error deleting user:', err);
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div style={authStyles.page}>
      <div style={authStyles.card}>
        <h2 style={authStyles.title}>Create Account</h2>

        <form onSubmit={handleRegister} style={authStyles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={authStyles.input}
            autoComplete="name"
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            style={authStyles.input}
            autoComplete="street-address"
            required
          />

          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            style={authStyles.input}
            autoComplete="city-address"
            required
          />

          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            style={authStyles.input}
            autoComplete="state-address"
            required
          />

          <h6>Create Login Information</h6>

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
            autoComplete="new-password"
            minLength={6}
            required
          />

          <button type="submit" style={authStyles.button} disabled={loading}>
            Register
          </button>

          {error && <p role="alert" style={authStyles.error}>{error}</p>}
        </form>

        <p style={authStyles.text}>
          Already have an account?{' '}
          <Link to="/login" style={authStyles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;