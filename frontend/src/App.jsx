import React, { useState } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Signup from './pages/Signup';
import Login from "./pages/Login";
import RefreshHandler from './RefreshHandler';
const App = () => {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element: <Navigate to='/login'/>
  }

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Navigate to="/signup"></Navigate>}></Route>
      <Route path='/home' element={ <PrivateRoute element={<Home/>}/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App