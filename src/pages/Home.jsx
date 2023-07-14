import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/me');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('User not authenticated:', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard/app');
    } else {
      navigate('/login');
    }
  };

  const handleLoginClick2 = () => {
    navigate('/signup');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');

    // Validate the search input
    const isValid = /^[2-8]\d{2,3}$/.test(search);

    if (isValid) {
      setIsLoading(true);
      axios
        .post(
          'http://127.0.0.1:8000/search',
          { query: search },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          const isAvailable = response.data.available;
          setIsLoading(false);
          setIsAvailable(isAvailable);
          setErrorMessage(null);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setErrorMessage('Invalid input.');
    }
  };

  return (
    <main className="h-screen w-full bg-hero-pattern-blue bg-cover flex justify-center items-center relative">
      <div className="content-hero h-[100px] w-[100px] absolute top-5 left-20">
        <img src={logo} alt="Logo" />
      </div>
      <div className="absolute top-10 right-20">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <span className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none">
              Dashboard {'->'}
            </span>
          </Link>
        ) : (
          <>
            <span
              onClick={handleLoginClick}
              className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none"
            >
              Log in {'->'}
            </span>
            <span
              onClick={handleLoginClick2}
              className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none"
            >
              Register {'->'}
            </span>
          </>
        )}
      </div>
      <div className="w-5/6 flex-col flex items-center justify-center">
        <div className="flex flex-col items-center justify-around">
          <h1 className="text-center text-2xl font-medium md:text-7xl sm:text-4xl text-white mb-5">
            USSD Code Application Platform
          </h1>
          <p className="text-center text-sm sm:text-xl md:text-2xl max-w-4xl text-white mb-5">
            Unlock the Power of USSD with Personalized Codes Apply, Activate, and Connect with Ease!
          </p>
          <p style={{color:'white', marginTop:'10px'}}>
          The Short Code must be between 3 and 4 digits long and must not start with 0,1 or 9.
          </p>
        </div>
        <div className="pt-2 relative mx-auto w-full max-w-2xl text-gray-600">
          <form onSubmit={onSubmit}>
            <input
              className="border-2 border-gray-300 bg-white w-full h-14 px-5 pr-16 rounded text-lg focus:outline-none"
              type="search"
              name="search"
              placeholder="Search For USSD Code"
            />
            <button type="submit" className="absolute right-0 inset-y-0 mt-2 mr-5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
      <div className="mt-6 rounded-full bg-white p-4" style={{ marginTop: '400px', position: 'absolute' }}>
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-500 animate-spin" />
          </div>
        )}
        {isAvailable === true && (
          <button className="text-green-500" onClick={() => navigate('/apply2')}>
            Available Apply Now
          </button>
        )}
        {isAvailable === false && <p className="text-red-500">Not Available</p>}
      </div>
    </main>
  );
};

export default Home;
