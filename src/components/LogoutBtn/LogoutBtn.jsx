import React from 'react'
import { useNavigate } from 'react-router'

const LogoutBtn = ({onLogout}) => {
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem('token')
        onLogout()
        navigate('/login')
    }
  return (
    <>
        <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default LogoutBtn