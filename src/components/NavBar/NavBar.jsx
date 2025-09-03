import React from 'react'
import { Link } from 'react-router'

const NavBar = (props) => {
  return (
    <>
        <Link to="/">HOME</Link>
        {props.token ? <>
        <Link to="/vulnerabilities">Vulnerabilities</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/profile">profile</Link> </>: <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>}
        
        
        
    </>
  )
}

export default NavBar