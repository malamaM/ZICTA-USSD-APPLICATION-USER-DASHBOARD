import React, { useEffect } from 'react';
import Logo from './logo.png';
import AuthForm from './AuthForm';

export default function Login() {
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/token'); // Replace with your Laravel route
        const data = await response.json();
        const csrfToken = data.csrfToken;
        console.log('CSRF Token:', csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF Token:', error);
      }
    };

    fetchCSRFToken();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 24px',
        backgroundColor: '#f7fafc',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: 'md',
          textAlign: 'center',
        }}
      >
        <img
          src={Logo}
          style={{
            height: '100px',
            width: '100px',
            margin: '0 auto',
          }}
          alt="logo"
        />
        <h2
          style={{
            marginTop: '24px',
            fontSize: '2rem',
            fontWeight: 'bold',
            lineHeight: '1.2',
            color: '#1a202c',
          }}
        >
          Sign In to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
