import React from 'react'
import comp_logo from '../static/imgs/logo_gold.png';

const EditInfo = () => {
  return (
    <div className="header_space lepo_background">
      <div className="comment_title">
        <h2>EDIT INFORMATIOM</h2>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 new_comment_form_container">

          <div className="row new_comment_form">

            <div className="col-md-12 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Full name" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="E-mail address" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Mobile number" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="password" placeholder="Password" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="password" placeholder="Confirm password" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Address" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Company name" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Company type" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Company director" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Work nature" />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="comment_input_container">
                <input type="text" placeholder="Partner" />
              </div>
            </div>


            <div className="col-md-12 col-sm-12">
              <div className="comment_input_container">
                <button>Send <i className="icon-login-1"></i> </button>
              </div>
            </div>

          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="edit_info_comp_icon_section">
            <img src={ comp_logo }  alt="something"/>
            <div className="edit_info_name_container">
              <h4>Company name</h4>
              <p>About the company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditInfo