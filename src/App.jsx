import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router'
import { useState } from 'react'

import SignupForm from './components/SignupForm/SignupForm'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Vulnerabilities from './components/Vulnerabilities/Vulnerabilities'
import Assets from './components/Assets/Assets'
import NavBar from './components/NavBar/NavBar'
import LogoutBtn from './components/LogoutBtn/LogoutBtn'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(null)

  function handleLogin(newToken){
    setToken(newToken)
  }

  function handleLogout(){
    setToken(null)
    localStorage.removeItem('token')
  }

  useEffect(()=>{    
    if(token){
    const decodedToken = jwtDecode(token)
    setUserId(decodedToken.id)
    }
},[token])

  return (
    <>
      
      <BrowserRouter>
      < NavBar token={token}/> 
      {token ? <LogoutBtn onLogout={handleLogout} /> : null}
        <Routes>
            <Route path="/" element={<Home userId={userId} />}/>
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>}/>
            <Route path="/signup" element={<SignupForm onLogin={handleLogin} />}/>
            <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>}/>
            <Route path="/vulnerabilities" element={<ProtectedRoute> <Vulnerabilities /> </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App