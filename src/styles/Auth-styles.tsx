import type { CSSProperties } from 'react';

const authStyles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
    padding: '32px 28px',
  },

  profilePage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    background: 'radial-gradient(circle at top, #eef2ff 0%, #f8fafc 35%, #f1f5f9 100%)',
  },

  profileCard: {
    width: '100%',
    maxWidth: '820px',
    background: '#ffffff',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '28px',
    boxShadow: '0 28px 80px rgba(15, 23, 42, 0.12)',
    padding: '28px',
    display: 'flex',
    gap: '28px',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },

  profileSidebar: {
    flex: '1 1 220px',
    minWidth: '220px',
    background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
    borderRadius: '22px',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    gap: '16px',
  },

  avatarWrap: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid rgba(255,255,255,0.2)',
    background: 'linear-gradient(135deg, #c7d2fe 0%, #93c5fd 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 18px 30px rgba(59,130,246,0.25)',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  avatarPlaceholder: {
    fontSize: '3rem',
    opacity: 0.9,
  },

  profileSidebarText: {
    margin: 0,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 1.5,
  },

  profileMain: {
    flex: '1 1 400px',
    minWidth: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '18px',
  },

  profileTitle: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 800,
    color: '#111827',
  },

  profileSubtitle: {
    margin: 0,
    color: '#6b7280',
    fontSize: '0.96rem',
  },

  profileForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  profileField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  profileLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#475569',
  },

  title: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  input: {
    width: '100%',
    border: '1px solid #dfe7f5',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '1rem',
    background: '#f8fafc',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#0f172a',
  },

  uploadCard: {
    border: '1.5px dashed rgba(99, 102, 241, 0.45)',
    background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
    borderRadius: '18px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  uploadLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    border: '1px solid #dfe7f5',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#1f2937',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },

  uploadInput: {
    display: 'none',
  },

  button: {
    width: '100%',
    padding: '14px 16px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 12px 25px rgba(37, 99, 235, 0.22)',
  },

  secondaryButton: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    background: '#fee2e2',
    color: '#991b1b',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },

  error: {
    margin: 0,
    color: '#dc2626',
    fontSize: '0.9rem',
    textAlign: 'center',
  },

  success: {
    margin: 0,
    color: '#15803d',
    fontSize: '0.9rem',
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.95rem',
    marginTop: '12px',
  },

  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px',
  },
};

export default authStyles;
