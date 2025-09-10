import React from 'react'
import { Link } from 'react-router'
import LogoutBtn from '../LogoutBtn/LogoutBtn'

const NavBar = (props) => {
  return (
    <>  
        <nav>
        <div className='logo'><p>VulniDashboard</p></div>
        <div className='links'><ul>
         <li><Link to="/">HOME</Link></li>
        {props.token ? <>
        <li><Link to="/vulnerabilities">Vulnerabilities</Link></li>
        <li><Link to="/assets">Assets</Link></li>
        <li><Link to="/account">account</Link></li>
        <li><LogoutBtn onLogout={props.handleLogout} /></li>
         </>: <>
        <li><Link to="/login">Login</Link></li>
        </>}
        </ul></div>
        
        </nav>
      
        
      
        
    </>
  )
}

export default NavBar