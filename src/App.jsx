import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router'
import { useState } from 'react'

import SignupForm from './components/SignupForm/SignupForm'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Vulnerabilities from './components/Vulnerabilities/Vulnerabilities'
import Applications from './components/Applications/Applications'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  function handleLogin(newToken){
    setToken(newToken)
  }

  function handleLogout(){
    setToken(null)
    localStorage.removeItem('token')
  }

  if(token){
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
  }


  return (
    <>
      
      <BrowserRouter>
      < NavBar/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/vulnerabilities" element={<Vulnerabilities />}/>
            <Route path="/applications" element={<Applications />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App