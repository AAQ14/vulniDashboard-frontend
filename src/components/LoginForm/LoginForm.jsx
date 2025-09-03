import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const baseURL = import.meta.env.VITE_BACKEND_URL

const LoginForm = ({onLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate()

    const handleSubmit = async event =>{
        event.preventDefault()
        try {
            const url = `${baseURL}/auth/login`
            const res = await axios.post(url, {email,password})
            localStorage.setItem('token', res.data.token)
            onLogin(res.data.token)
            // navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed')
        }
    }

  return (
    <>
        <h2>Login form</h2>
        <form onSubmit={handleSubmit}>
            <input placeholder='email' value={email} onChange={event=>setEmail(event.target.value)}/>
            <input placeholder='password' value={password} onChange={event=>setPassword(event.target.value)}/>
            <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default LoginForm