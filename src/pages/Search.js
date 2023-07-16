import React, { useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import Navbar from './Navbar';
import LogoMain from './zicta_logo.png';

const Home = () => {
  useEffect(() => {
    /* const fetchCSRFToken = async () => {
      try {
        const response = await fetch('https://vulkantechnologylabs.com/token'); // Replace with your Laravel route
        const data = await response.json();
        const csrfToken = data.csrfToken;
        console.log('CSRF Token:', csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF Token:', error);
      }
    }; */

    // fetchCSRFToken();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 py-10 md:h-[90vh]">
        <div className="md:mx-auto md:w-5/6 md:h-full px-10 md:px-0 flex gap-5 justify-center">
          <div className="lg:basis-2/5 flex-col flex justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-left text-4xl font-medium tracking-tight text-gray-900">
                Welcome To ZICTA USSD PORTAL
              </h2>
            </div>
            <SearchForm />
          </div>
          <div className="lg:flex hidden justify-center items-center h-full lg:basis-3/5">
            <img className="h-full w-full object-cover" src={LogoMain} alt="zicta logo" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
