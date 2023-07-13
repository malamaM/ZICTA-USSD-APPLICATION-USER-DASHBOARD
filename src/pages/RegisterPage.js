import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBg from './login-bg.png';
import Hero from './hero.png';
import AuthFormRegister from './AuthFormRegister';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex w-full items-center justify-center bg-hero-pattern-blue md:bg-hero-pattern bg-no-repeat bg-cover">
      <div className="md:basis-1/2 h-full relative flex items-center flex-col justify-center">
        <div
          role="button" // Add role attribute to indicate it is a button-like element
          tabIndex={0} // Add tabIndex to make it focusable for keyboard interaction
          onClick={() => navigate('/')}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              navigate('/');
            }
          }}
          className="md:content-logo content-hero md:h-[100px] md:w-[100px] h-[150px] w-[150px] md:absolute md:top-10 md:left-20 cursor-pointer"
        />
        <AuthFormRegister />
      </div>
      <div className="md:basis-1/2 h-full hidden bg-primary-500 relative md:flex items-center justify-center">
        <img src={LoginBg} alt="" className="h-full w-full absolute top-0 left-0 right-0 bottom-0" />
        <img src={Hero} alt="" className="z-10" />
      </div>
    </section>
  );
};

export default RegisterPage;
