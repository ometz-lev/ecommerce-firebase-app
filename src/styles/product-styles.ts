// This file contains the styles for the products page. It is imported in the ProductsPage component and applied to the main element.

import type { CSSProperties } from 'react';

export const productStyles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '24px 16px 40px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
    color: '#1f2937',
    fontFamily: 'Arial, sans-serif',
  },

  heading: {
    margin: '0 auto',
    fontSize: '2rem',
    color: '#111827',
  },

  form: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    background: '#ffffff',
    padding: '24px',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
    boxSizing: 'border-box',
  },

  formTitle: {
    margin: '0 0 8px',
    fontSize: '1.5rem',
    color: '#111827',
  },

  label: {
    fontWeight: 600,
    color: '#374151',
  },

  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },

  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'vertical',
    boxSizing: 'border-box',
  },

  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '8px',
  },

  button: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontWeight: 600,
    cursor: 'pointer',
  },

  secondaryButton: {
    background: '#e5e7eb',
    color: '#111827',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontWeight: 600,
    cursor: 'pointer',
  },

  error: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    padding: '12px 16px',
    background: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },

  sectionHeader: {
    margin: '0',
    color: '#111827',
    textAlign: 'center',
  },

  productsGrid: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },

  productCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
  },

  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    background: '#f3f4f6',
  },

  productTitle: {
    margin: '0',
    fontSize: '1.2rem',
    color: '#111827',
  },

  productPrice: {
    margin: '0',
    fontWeight: 700,
    color: '#2563eb',
  },

  productMeta: {
    margin: '0',
    color: '#4b5563',
    fontSize: '0.95rem',
  },

  productDescription: {
    margin: '0',
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },

  actions: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },

  smallButton: {
    background: '#f3f4f6',
    color: '#111827',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '8px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  },

  dangerButton: {
    background: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  },

  cartPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
    padding: '36px 20px 48px',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
  },

  cartHeading: {
    margin: '0 0 24px',
    textAlign: 'center',
    fontSize: '2rem',
    color: '#111827',
  },

  emptyCart: {
    maxWidth: '700px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '14px',
    padding: '48px 24px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
    color: '#6b7280',
    fontSize: '1.1rem',
  },

  cartContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },

  cartList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  cartCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    background: '#ffffff',
    borderRadius: '14px',
    padding: '18px',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
  },

  cartImage: {
    width: '90px',
    height: '90px',
    objectFit: 'contain',
    borderRadius: '10px',
    background: '#f3f4f6',
    padding: '8px',
  },

  cartBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
  },

  cartTitle: {
    margin: '0 0 4px',
    fontSize: '1.1rem',
    color: '#111827',
  },

  cartPrice: {
    margin: '0',
    color: '#16a34a',
    fontWeight: 700,
  },

  cartSubtotal: {
    fontSize: '1rem',
    color: '#111827',
  },

  cartControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },

  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d1d5db',
    borderRadius: '999px',
    overflow: 'hidden',
    background: '#f9fafb',
  },

  qtyButton: {
    minWidth: '36px',
    height: '36px',
    border: 'none',
    background: '#e5e7eb',
    color: '#111827',
    fontWeight: 700,
    cursor: 'pointer',
  },

  qtyInput: {
    width: '52px',
    height: '36px',
    border: 'none',
    background: 'transparent',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#111827',
    outline: 'none',
  },

  removeButton: {
    background: '#fff',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '8px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  },

  summaryCard: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
  },

  summaryTitle: {
    margin: '0 0 16px',
    fontSize: '1.5rem',
    color: '#111827',
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: '#4b5563',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '18px 0',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#111827',
  },

  summaryTotal: {
    color: '#15803d',
  },

  summaryActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  checkoutButton: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 16px',
    fontWeight: 700,
    cursor: 'pointer',
  },

  clearButton: {
    background: '#ffffff',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    padding: '12px 16px',
    fontWeight: 700,
    cursor: 'pointer',
  },

  filterStyle: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto'
 },
   dashboardLoading: {
    textAlign: 'center',
    padding: '24px'
 },

   noFilterProducts: {
     textAlign: 'center',
    color: '#6b7280'
 },

};