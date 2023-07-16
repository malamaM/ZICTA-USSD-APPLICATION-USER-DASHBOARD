import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from './Input';
import Button from './Button';

const AuthFormRegister = () => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState('REGISTER');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleLoginClick = () => {
    navigate('/login');
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', data);

      if (response.status === 200) {
        const { token } = response.data.authorisation;

        toast.success('Register successful');
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem('token', token);
          navigate('/dashboard');
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
  };

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
    );
  }, []);

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
            <Button disabled={loading} fullWidth type="submit" />
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 animate-spin">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                Loading...
              </div>
            ) : (
              <>
                {variant === 'LOGIN' ? 'Sign In' : 'Register'}
              </>
            )}
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
            onClick={handleLoginClick}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleLoginClick();
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

export default AuthFormRegister;
