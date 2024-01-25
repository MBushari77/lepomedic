import React from 'react';
import { Link } from 'react-router-dom';
import about_img from '../static/imgs/logo.png';
import maab_mohammed from '../static/imgs/team/maabMoh.jpeg';
import maab_musa from '../static/imgs/team/maabMusa.jpeg';
import marie_atif from '../static/imgs/team/marie.jpeg';

import CommentForm from './widgets/CommentForm';

const About = () => {
  return (
    <div className="header_space">
      <br/>
      <div className="about_us_header">
        <h1><strong> ABOUT US </strong></h1>
      </div>
      <div className="head_line_lepo"></div>
      <div className="about_details">
        <div className="row">
          <div className="col-md-6 col-sm-12 left_bar">
            <div>
              <h2>WHO WE ARE</h2>
            </div>
            <p>
              Lepo is the first website in Sudan brings together key stakeholders to give you opportunity of get know about the medical equipment market in Sudan, keep up with the latest updates and get your device with the click of a button 
            </p>
            <div>
              <Link className="about_join_us" to='/register'>JOIN US</Link>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 about_img_section">
            <img src={ about_img } alt="something" />
          </div>
          <div className="about_more_details_text">
            <br />
            <h3>Are you looking for a medical device or a specific medical device company?</h3>
            <p>
            We at lepo provide you with everything you need in one place
            You can now get to know the Sudanese medical device companies, their locations and the devices they provide 
            We are working hard to make it easier for you to get your medical device without making an effort just at the push of a button
            Lepo
            </p>
            <h3>Would like to join us?</h3>
            <p>
            If you are one of the medical devices companies or providers of services related to the field of medical devices in Sudan, we hope that you will join us. 
            and together we will begin our first steps towards expansion, spreading and creating an associated community that brings together both service providers and beneficiaries.
            Log in now and create your new interface to the world
            <div>
              <br />
              <h4><strong>"Lepo Your Next Big Deal"</strong></h4>
            </div>
            </p>
          </div>
        </div>
      </div>
      {/* Team section */}
      <div className="head_line_gold"></div>
      <div className="team_section shadow">
        <div className="team_title">
          <h2>LEPO TEAM</h2>
          <p>Our hard working team</p>
        </div>
        <div className="row team_members">


        <div className="col-md-4 col-sm-12 testi_card">
            <div className="testi_bacground team_background maab_mohammed_bg">
              <div className="testimonials_element" >
                <img className="slider_image" src={ maab_mohammed } alt="something" />
                <div>
                  <i className="member_name">Maab Mohammed Ibrahim</i>
                </div>
                <div>
                  {/* <i className="job_title">Job title</i> */}
                </div>
                <div>
                  {/* <i>About the team member</i> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 testi_card">
            <div className="testi_bacground team_background marie_atif_bg">
              <div className="testimonials_element" >
                <img className="slider_image" src={ marie_atif } alt ="something"/>
                <div>
                  <i className="member_name">Marie atif</i>
                </div>
                <div>
                  {/* <i className="job_title">Job title</i> */}
                </div>
                <div>
                  {/* <i>About the team member</i> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 testi_card">
            <div className="testi_bacground team_background maab_musa_bg">
              <div className="testimonials_element" >
                <img className="slider_image" src={ maab_musa } alt="something" />
                <div>
                  <i className="member_name">Maab musa</i>
                </div>
                <div>
                  {/* <i className="job_title">Job title</i> */}
                </div>
                <div>
                  {/* <i>About the team member</i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add comment section */}
      <div className="comment">
        {/* <CommentForm /> */}
      </div>
    </div>
  )
}

export default About