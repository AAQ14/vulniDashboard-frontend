import React from 'react'
import { Link } from 'react-router'

const NavBar = (props) => {
  return (
    <>
        <Link to="/">HOME</Link>
        {props.token ? <>
        <Link to="/vulnerabilities">Vulnerabilities</Link>
        <Link to="/assets">Assets</Link>
        <Link to="/profile">profile</Link> </>: <>
        <Link to="/login">Login</Link>
        </>}
        
        
        
    </>
  )
}

export default NavBar