//This component allows users to view and edit their profile information
//Users can update their display name, address, profile pic and also delete their account
// Email is displayed but not editable since it is used for authentication and should not be changed.

import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { updateProfile, deleteUser } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import authStyles from '../styles/Auth-styles';


const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Load user profile from Firestore when the component mounts or when the user changes
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setDisplayName('');
        setEmail('');
        setStreet('');
        setCity('');
        setState('');
        setAvatarUrl('');
        return;
      }

      // Load user profile from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName((data.name as string) || user.displayName || '');
          setEmail((data.email as string) || user.email || '');
          setStreet((data.street as string) || '');
          setCity((data.city as string) || '');
          setState((data.state as string) || '');
          setAvatarUrl((data.avatarUrl as string) || '');
        } else {
          setDisplayName(user.displayName || '');
          setEmail(user.email || '');
          setStreet('');
          setCity('');
          setState('');
          setAvatarUrl('');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unable to load profile.');
        }
      }
    };

    void loadUserProfile();
  }, [user]);

  //Handle profile image upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const storageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setAvatarUrl(downloadUrl);
      await setDoc(
        doc(db, 'users', user.uid),
        { avatarUrl: downloadUrl },
        { merge: true }
      );
      setSuccess('Profile image uploaded successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Image upload failed.');
      }
    }
  };

  //Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for updating profile
    setError('');
    setSuccess('');
    if (!user) {
      setError('No user is logged in.');
      return;
    }
    try {
      await updateProfile(user, { displayName });
      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: displayName,
          email: user.email || '',
          street,
          city,
          state,
          avatarUrl,
        },
        { merge: true }
      );
      setSuccess('Profile updated successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        setError('No user is logged in.');
        return;
      }

      const confirmed = window.confirm('Are you sure you want to delete your account? This will remove your profile and account data.');
      if (!confirmed) return;

      await deleteUser(user);
      await deleteDoc(doc(db, 'users', user.uid));
      navigate('/register');     // Redirect to register page after account deletion
      setSuccess('Account deleted successfully!');

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  return (
    <div style={authStyles.profilePage}>
      <div style={authStyles.profileCard}>
        <aside style={authStyles.profileSidebar}>
          <div style={authStyles.avatarWrap}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile avatar" style={authStyles.avatarImage} />
            ) : (
              <span style={authStyles.avatarPlaceholder}>🧑</span>
            )}
          </div>

          <p style={authStyles.profileSidebarText}>Update your photo and keep your profile looking personal.</p>

          <div style={authStyles.uploadCard}>
            <label htmlFor="avatar-upload" style={authStyles.uploadLabel}>
              Upload image
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={authStyles.uploadInput}
            />
          </div>
        </aside>

        <main style={authStyles.profileMain}>
          <h2 style={authStyles.profileTitle}>My Profile</h2>
          <p style={authStyles.profileSubtitle}>Manage your account details and preferences.</p>

          <form onSubmit={handleUpdateProfile} style={authStyles.profileForm}>
            <div style={authStyles.profileField}>
              <label style={authStyles.profileLabel}>Name</label>
              <input
                style={authStyles.input}
                type="text"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div style={authStyles.profileField}>
              <label style={authStyles.profileLabel}>Email</label>
              <input
                style={authStyles.input}
                type="email"
                placeholder="Email"
                value={user?.email ?? email}
                readOnly               // Email is displayed but not editable since it is used for authentication and should not be changed.
              />
            </div>

             <div style={authStyles.profileField}>
              <label style={authStyles.profileLabel}>Street</label>
              <input
                style={authStyles.input}
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div style={authStyles.profileField}>
              <label style={authStyles.profileLabel}>City</label>
              <input
                style={authStyles.input}
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div style={authStyles.profileField}>
              <label style={authStyles.profileLabel}>State</label>
              <input
                style={authStyles.input}
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <button type="submit" style={authStyles.button}>
              Update Profile
            </button>

            {error && <p style={authStyles.error}>{error}</p>}
            {success && <p style={authStyles.success}>{success}</p>}

            <div style={authStyles.buttonContainer}>
              <button type="button" onClick={handleDeleteAccount} style={authStyles.secondaryButton}>
                Delete Account
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;