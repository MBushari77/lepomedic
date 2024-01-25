import React from 'react';
import { Link } from 'react-router-dom';
import logo_gold from '../static/imgs/logo.png';
import CompWidget from './widgets/CompWidget';
import TestimWidget from './widgets/TestimWidget';
import CommentForm from './widgets/CommentForm';
import { useHistory } from 'react-router';


const Home = () => {
  const userType = localStorage.getItem('type');
  const page = useHistory()
  if (userType === 'admin'){
    page.push('/dashboard');
  }
  if (userType === 'user'){
    page.push('/browse');
  }
  if (userType === 'company'){
    page.push('/browse');
  }
  if(userType == undefined){
    localStorage.removeItem('token');
    localStorage.removeItem('uat');
  }
  return (
    <div className="header_space">
      <div className="home_header">
        <div className="home_header_cover">
          <div className="home_logo">
            <img src={ logo_gold } alt="something" />
          </div>
          <div>
            <h3> <strong>Welcome to LEPO</strong> </h3>
          </div>
          <div className="lepo_header_text">
            <p>
              Lepo is the first website in Sudan brings together key stakeholders to give you opportunity of get know about the medical equipment market in Sudan, keep up with the latest updates and get your device with the click of a button
            </p>
          </div>
          <div className="home_header_buttons">
            <Link to='/register' className="home_register">JOIN US</Link>
          </div>
        </div>
      </div>
      {/* componies section */}
      {/* <div className="header_space"></div> */}
      <div className="head_line_lepo"></div>
      <div className="companies">
        <div className="comp_slider">
          <CompWidget title="Companies" disc=" " />
        </div>
      </div>
      {/* testimonials section */}
      <div className="head_line_gold head_line_dark_gold"></div>
      <div className="testimonials">
        <div className="comp_slider">
          <TestimWidget title="Testimonials" disc=" " />
        </div>
      </div>
      {/* Add comment section */}
      <div className="comment">
        {/* <CommentForm /> */}
      </div>
    </div>
  )
}

export default Home