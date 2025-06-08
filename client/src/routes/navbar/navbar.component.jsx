import { Fragment } from 'react';
import { Outlet, Link } from 'react-router'
import './navbar.styles.scss'
import CrownLogo from '../../assets/crown.svg?react'

const NavBar = () => {
  return(
    <>
        <div className='navbar'>
          <Link className='logo-container' to='/'>
            <CrownLogo className='logo'/>
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>Shop</Link>
            <Link className='nav-link' to='/'>Contact</Link>
            <Link className='nav-link' to='/'>About</Link>
          </div>
        </div>
        <Outlet />
    </>
  )
}

export default NavBar;