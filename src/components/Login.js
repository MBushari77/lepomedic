import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = () => {
  const [wait, setWait] = useState(false);
  const page = useHistory()
  useEffect((page) => {
    const userType = localStorage.getItem('type')||'non';
    if (userType === 'admin'){
      page.push('/dashboard');
    }
    if(userType === 'user'){
      page.push('/browse');
    }
    if(userType === 'company'){
      page.push('/browse');
    }
  })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if(login){
      if(login){
        const data = {
          email: email,
          password: password
        }
        axios.post('https://api.lepomedic.sd/public/api/login', data)
        .then((res) => {
          if(res.data.success){
            localStorage.setItem('uat', res.data.token);
            localStorage.setItem('type', res.data.userType);
            window.location.href = '/browse'
          }
          else{
            setErrMsg(res.data.message)
          }
        })
        .then(() => {
          setWait(false)
        })
        setLogin(false)
      }

    }
  }, [login])
  
  return (
    <div className="header_space lepo_background">
      <div className="head_line_gold"></div>
      <div className="comment_title">
        <h2>LOGIN</h2>
      </div>
      <div>

        <div className="new_comment_form_container login_register_add_form_container">

          <div className="row new_comment_form">

          <div className="col-md-12 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <label>E-Mail</label>
              <input
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              type="text" placeholder="E-mail" />
            </div>
          </div>

          <div className="col-md-12 col-sm-12 mobile_input">
            <div className="comment_input_container">
              <label>Password</label>
              <input
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              type="password" placeholder="Password" />
            </div>
          </div>
          <div className="col-12">
            <i className="login_err_msg">{ errMsg }</i>
          </div>
            {
                wait?(
                  <div className="col-md-12 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <i><button disabled className="login_btn action_btn_on_wait" > Loading... <i className="icon-cw"></i> </button></i>
                    </div>
                  </div>
                ):(                  
                  <div className="col-md-12 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <i onClick={() => setWait(true)}><button className="login_btn" onClick={ () => setLogin(true) } > Login <i className="icon-login-1"></i> </button></i>
                    </div>
                  </div>
                )
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login