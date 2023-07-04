import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './logo.png';


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // Make an API call to log out the user
    // Redirect the user to the login page or perform any additional tasks

    // For now, let's simulate a logout by refreshing the page
    window.location.reload();
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/me');
      const userData = response.data;
      console.log('User Data:', userData);
      // Handle the user data as needed
    } catch (error) {
      console.error('User data fetch error:', error);
      // Handle the error
    }
  };

  return (
    <header className="bg-white sticky shadow px-10">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              onClick={handleLogout}
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      {/* Rest of the component code */}
    </header>
  );
}
