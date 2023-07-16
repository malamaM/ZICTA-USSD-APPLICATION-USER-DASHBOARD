import React, { useEffect } from 'react'
import Logo from './logo.png'
import AuthFormRegister from './AuthFormRegister'
import RegisterPage from './RegisterPage'

export default function SignUp() {
/* useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('https://vulkantechnologylabs.com/token'); // Replace with your Laravel route
        const data = await response.json();
        const csrfToken = data.csrfToken;
        console.log('CSRF Token:', csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF Token:', error);
      }
    };

    fetchCSRFToken();
  }, []); */

	return (
		<>
			<RegisterPage />
		</>
	)
}
