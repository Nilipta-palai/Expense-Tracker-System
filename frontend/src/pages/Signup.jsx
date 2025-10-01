import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
  const [signupInfo, setSignInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...signupInfo };
    copyLoginInfo[name] = value;
    setSignInfo(copyLoginInfo);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('All fields are required');
    }

    // Name validation: starts with a letter only and contains letters/spaces only
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
    if (!nameRegex.test(name)) {
      return handleError('Name must start with a letter and contain only letters and spaces.');
    }

    // Email validation: starts with a letter, and ends with @gmail.com
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return handleError("Email must start with a letter and be a valid '@gmail.com' address.");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen
                      bg-gradient-to-r from-pink-200 via-pink-200 to-yellow-100
                      text-gray-700">
        <div className="bg-white p-10 border-4 border-gray-300 w-full max-w-[400px] shadow-lg rounded-lg">
          <h1 className="mb-5 text-5xl text-fuchsia-500 font-bold text-center ">Signup</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-xl">Name :</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="block w-full border p-2 mt-1"
                value={signupInfo.name}
              />
            </div>

            <div className="mb-4">
              <label className="text-xl">Email :</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="block w-full border p-2 mt-1"
                value={signupInfo.email}
              />
            </div>

            <div className="mb-4">
              <label className="text-xl">Password :</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter Password"
                className="block w-full border p-2 mt-1"
                value={signupInfo.password}
              />
            </div>

            <button className="w-full bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-800">
              Signup
            </button>
            <span className='text-xl'>
              Already have an account ? <Link to='/login' className='text-fuchsia-600 font-semibold'>Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Signup;
