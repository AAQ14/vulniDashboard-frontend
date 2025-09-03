import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL

const SignupForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate()

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try {
            const url = `${baseURL}/auth/signup`
            await axios.post(url,{username, email,password})
            alert('User registered, please login')
            // navigate('/login')
        } catch (err) {
            alert(err.response?.data?.message || 'Registeration failed')            
        }
    }
  return (
    <>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
            <input placeholder='Username' value={username} onChange={event=>setUsername(event.target.value)}/>
            <input placeholder='email' value={email} onChange={event=> setEmail(event.target.value)}/>
            <input placeholder='password' value={password} onChange={event => setPassword(event.target.value)}/>
            <button type='submit'>Sign up</button>
        </form>
    </>
  )
}

export default SignupForm