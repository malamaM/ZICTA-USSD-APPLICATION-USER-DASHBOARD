import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../sections/auth/login';

const Apply = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');

    setIsLoading(true);
    console.log(search);
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
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <main className="h-screen w-full bg-hero-pattern-blue bg-cover flex justify-center items-center relative">
      <div className="content-hero h-[100px] w-[100px] absolute top-5 left-20" />
      <div className="absolute top-10 right-20">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <span className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none">
              Back to Dashboard {'->'}
            </span>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <span className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none">
                Log in {'->'}
              </span>
            </Link>
            <Link to="/signup">
              <span className="text-sm font-semibold leading-6 text-white cursor-pointer focus:outline-none">
                Register {'->'}
              </span>
            </Link>
          </>
        )}
      </div>
      <div className="w-5/6 flex-col flex items-center justify-center">
        <div className="flex flex-col items-center justify-around">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: {
                opacity: 0,
                x: -50,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            className="flex flex-col items-center justify-start"
            style={{ marginTop: '4px', position: 'absolute' }}
          >
            <h1 className="text-2xl font-medium md:text-7xl sm:text-4xl text-white mb-5">
              USSD Code Application Form
            </h1>
            <p className="text-center text-sm sm:text-xl md:text-2xl max-w-4xl text-white mb-5">
              Unlock the Power of USSD with Personalized Codes Apply, Activate, and Connect with Ease!
            </p>
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Apply;
