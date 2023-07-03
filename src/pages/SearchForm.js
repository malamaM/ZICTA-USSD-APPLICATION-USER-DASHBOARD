import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SearchForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post(
        'http://127.0.0.1:8000/search',
        { query: data.search },
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
    <div className="mt-8 sm-mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-5 shadow max-w-2xl mx-auto sm:rounded-lg min-h-[500px] flex flex-col justify-around items-center sm:px-10">
        <h2 className="text-2xl mb-5 font-medium">
          Search for Available USSD Codes!
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-2 relative mx-auto flex w-full text-gray-600">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="simple-search"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 ${
                errors.search ? 'border-red-500' : ''
              }`}
              placeholder="Search"
              required
              {...register('search', {
                required: true,
                pattern: {
                  value: /^[2-8][0-9]{2}$/,
                  message: 'Invalid input',
                },
              })}
            />
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
          {errors.search && (
            <p className="text-red-500 text-sm mb-4">{errors.search.message}</p>
          )}
        </form>
        <div className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isAvailable === true ? (
            <p className="text-green-500">Available</p>
          ) : isAvailable === false ? (
            <p className="text-red-500">Not Available</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
