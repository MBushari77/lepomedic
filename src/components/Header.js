import React, { useEffect, useState } from 'react';
import logo from '../static/imgs/logo.png';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from 'axios';

const modal = {
  hidden: {
      y:'-100vh'
  },
  visible: {
      y: 0,
      transition: {
          duration: 0.09,
          type: 'spring',
          damping: 25,
          stiffness: 300
      }
  }
}

const Header = () => {
  const [showUserData, setShowUserData] = useState(false)
  const [userName, setUserName] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [logout, setLogout] = useState(false);
  const userType = localStorage.getItem('type')|| 'non';

  const url = 'https://api.lepomedic.sd/public/api/user';

  useEffect(() => {
    if(logout){
      localStorage.removeItem('uat');
      localStorage.removeItem('type');
      window.location.href = '/'
      setLogout(false);
    }else{
      console.log(" ")
    }
  }, [logout])

  useEffect(() => {
    const token = localStorage.getItem('uat') || 'non';
    const config2 = {
      headers:{
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
      }
    }
    try {      
      axios.get(url, config2)
      .then((res) => {
        if(res.data){
          setUserName(res.data.name);
          setShowUserData(true)
        }
      })
    } catch (error) {
      console.log('sorry')
    }
  }, [])

  return (
    <div className="row header shadow">
        <div className="col-3 header_logo_side">
            <Link to="/"> <img src={ logo } alt="something" /> </Link>
        </div>
        <div className="col-9 burger_button_side header_user_data">
          {
            showUserData?(
              <>
                <i className="header_username">{ userName }</i>
              </>
            ):
            null
          }
          <button className="burger_button" onClick={ ()=> setShowNav(!showNav) }> <i className="icon-menu-1"></i> </button>
        </div>
       {showNav?(
          <div className="nav_menu_background" onClick={() => setShowNav(!setShowNav)}>
            <motion.div 
              variants={modal}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className="nav_menu">
              <div className="nav_menu_esc">
                <i className="icon-cancel-circle"></i>
              </div>
              {
                !showUserData? (
                  <>
                    <Link to="/" className="nav_menu_option"> HOME </Link>
                    <Link to="about" className="nav_menu_option"> ABOUT US </Link>
                    <Link to="/browse" className="nav_menu_option">BROWSE</Link>
                    <Link to="/login" className="nav_menu_option nav_login"> LOGIN </Link>
                    <Link to="/register" className="nav_menu_option nav_login"> REGISTER </Link>
                  </>
                ):
                (
                  <>
                    <Link to="/profile" className="nav_menu_option">PROFILE</Link>
                    {
                      userType === 'company'?(
                        <>
                          <Link to="/addproduct" className="nav_menu_option">ADD NEW PRODUCT</Link>
                          <Link to="/ourproducts" className="nav_menu_option">OUR PRODUCTS</Link>
                        </>
                      ): (<></>)
                    }
                    {
                      userType === 'admin'?(
                        <>
                        <Link to="/dashboard/allusers" className="nav_menu_option">ALL USERS</Link>
                          <Link to="/dashboard/allcompanies" className="nav_menu_option">ALL COMPANIES</Link>
                          <Link to="/dashboard/witingcompanies" className="nav_menu_option">WAITING COMPANIES</Link>
                          <Link to="/dashboard/allproducts" className="nav_menu_option">ALL PRODUCTS</Link>
                        </>
                      ): (<></>)
                    }
                    <Link to="/browse" className="nav_menu_option">BROWSE</Link>
                    <Link onClick={ () => setLogout(true) } className="nav_menu_option nav_logout"> LOGOUT </Link>
                  </>
                )
              }
            </motion.div>
        </div>): null}
    </div>
  )
}

export default Header