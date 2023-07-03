import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from './Input';
import Button from './Button';






const AuthForm = () => {

  const Navigate = useNavigate();

  const [variant, setVariant] = useState('LOGIN');
  const [loading, setLoading] = useState(false);
  // const [csrfToken, setCsrfToken] = useState('');

  /* useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/token');
        const data = await response.json();
        const csrfToken = data.csrfToken;
        setCsrfToken(csrfToken);
        console.log('CSRF Token:', csrfToken);

        if (!localStorage.getItem('uploadedCSRFToken')) {
          localStorage.setItem('uploadedCSRFToken', csrfToken);
          uploadCSRFToken(csrfToken);
        }
      } catch (error) {
        console.error('Failed to fetch CSRF Token:', error);
      }
    };

    const uploadCSRFToken = async (token) => {
      try {
        await axios.post('http://127.0.0.1:8000/upload-csrf-token', { token });
        console.log('CSRF Token uploaded successfully');
      } catch (error) {
        console.error('Failed to upload CSRF Token:', error);
      }
    };

    fetchCSRFToken();
  }, []); */
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', data);

      if (response.status === 200) {
        // Authentication successful
        const { token } = response.data.authorisation; // Extract the JWT token from the response

        toast.success('Login successful');
        setTimeout(() => {
          setLoading(false);

          // Save the JWT token to local storage
          localStorage.setItem('token', token);

          // Redirect or perform any necessary actions
        
            Navigate('/dashboard'); // Replace '/dashboard' with the appropriate route for your dashboard page
          
        }, 3000);
      } else {
        // Authentication failed
        toast.error('Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      // Error occurred during login
      console.error('Login error:', error);
      toast.error('An error occurred');
      setLoading(false);
    }
  };


  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  /* const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/rlogin',
        data,
        {
          headers: {
            'CSRF-TOKEN': csrfToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Login successful');
        setTimeout(() => {
          setLoading(false);
          window.location.href = 'http://localhost:5174/';
        }, 3000);
      } else {
        toast.error('Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred');
      setLoading(false);
    }
  }; */

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-3xl md:text-4xl mb-1 md:mb-5 font-medium">
          {variant === 'LOGIN' ? 'Welcome Back' : 'Register your account'}
        </h2>
        <p className="text-gray-400 text-sm mb-5 md:mb-10">
          {variant === 'LOGIN'
            ? 'Welcome back! Please enter your details to continue.'
            : 'Register your account to get started.'}
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              errors={errors}
              id="name"
              label="Name"
              register={register}
              disabled={loading}
            />
          )}
          <Input
            errors={errors}
            id="email"
            label="Email"
            type="email"
            register={register}
            disabled={loading}
          />
          <Input
            errors={errors}
            id="password"
            label="Password"
            register={register}
            type="password"
            disabled={loading}
          />
          {variant === 'REGISTER' && (
            <Input
              errors={errors}
              id="confirm_password"
              label="Confirm Password"
              register={register}
              type="password"
              disabled={loading}
            />
          )}
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'New to ZICTA USSD Hub?'
              : 'Already have an account?'}
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={toggleVariant}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                toggleVariant();
              }
            }}
            className="underlin cursor-pointer text-sky-500 hover:text-sky-600"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
