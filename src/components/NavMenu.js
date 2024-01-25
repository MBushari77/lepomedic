import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <>
        <div className="nav_menu_background">
            <div className="nav_menu">
                <Link className="nav_menu_option"> HOME </Link>
                <Link className="nav_menu_option"> ABOUT US </Link>
                <Link className="nav_menu_option"> CONTACT US </Link>
                <Link className="nav_menu_option"> LOGIN </Link>
                <Link className="nav_menu_option"> REGISTER </Link>
            </div>
        </div>
    </>
  )
}

export default NavMenu