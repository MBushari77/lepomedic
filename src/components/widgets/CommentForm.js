import React from 'react';

const Comment = () => {
  return (
    <div className="comment_form">
      <div className="comment_title">
        <h2 className="slider_title" >COMMENT</h2>
        <p>Tell us your openion</p>
      </div>
      <div className="new_comment_form_container only_comment_form">
        <div className="row new_comment_form">
          <div className="col-md-6 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <input type="text" placeholder="Full name" />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <input type="text" placeholder="E-mail address" />
            </div>
          </div>

          <div className="col-md-12 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <input type="text" placeholder="Job type" />
            </div>
          </div>

          <div className="col-md-12 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <textarea placeholder="What do you want to say"></textarea>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <button>Send <i className="icon-rocket"></i> </button>
            </div>
          </div>

        </div>


      </div>    
    </div>
  )
}

export default Comment