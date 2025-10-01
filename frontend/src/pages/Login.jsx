import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
const Login = () => {
  const [LoginInfo,setLoginInfo]=useState({
    email:'',
    password:''
  })

const handleChange=(e)=>{
  const {name,value}=e.target;
  //console.log(name,value);
  const copyLoginInfo={...LoginInfo};
  copyLoginInfo[name]=value;
  setLoginInfo(copyLoginInfo);
}

const navigate=useNavigate();
const handleSubmit= async (e)=>{
  e.preventDefault();
  const {email,password}=LoginInfo;
  if( !email || !password){
    return handleError('All fields are required');
  }

    // Email validation: starts with a letter, and ends with @gmail.com
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return handleError("Email must start with a letter and be a valid '@gmail.com' address.");
    }

  try{
    const url="https://expense-tracker-system-ehgr.onrender.com/auth/login";
    const response = await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(LoginInfo)
    });
    const result=await response.json();
    const {success,message,jwtToken,name,error}=result;
    if(success){
      handleSuccess(message);
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedUser',name);
      setTimeout(()=>{
        navigate('/home')
      }
    ,1000)
  }else if(error){
    const details=error ?.details[0].message;
    handleError(details);
  }else if(!success){
    handleError(message);
  }
  //console.log(result)
}
  catch(err){
    handleError(err)
  }

}
  return (
     <>
  <div className="flex justify-center items-center  min-h-screen
                bg-gradient-to-r from-pink-200 via-pink-200 to-yellow-100
                text-gray-700">
      <div className="bg-white p-10 border-4 border-gray-300 w-full max-w-[400px] shadow-lg rounded-lg">
        <h1 className="mb-5 text-5xl text-fuchsia-500 font-bold text-center ">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xl">Email :</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="block w-full border p-2 mt-1"
              value={LoginInfo.email}
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
              value={LoginInfo.password}
            />
          </div>

          <button className="w-full bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-800">
            Login
          </button>
          <span className='text-xl'>
            Don't have an account ? <Link to='/signup' className='text-fuchsia-600 font-semibold'>Signup</Link>
          </span>
        </form>
        <ToastContainer/>
     </div>
     </div>
     </>
  )
}


export default Login