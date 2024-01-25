import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {
  const [wait, setWait] = useState(false);
  const token = localStorage.getItem('uat');
  const page = useHistory()
  if (token){
    page.push('/browse');
  }
  const [showModal, setShowModal] = useState(false);
  const [regType, setType] = useState(true);
  const [regStatus, setRegStatus] = useState('');
  const [errors, setErrors] = useState([])
  const [regMsg, setRegMsg] = useState('');
  // user data
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobile, setUserMobile] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
  // company data
  const [CoName, setCoName] = useState('')
  const [CoManager, setCoManager] = useState('')
  const [CoEmail, setCoEmail] = useState('')
  const [CoPassword, setCoPassword] = useState('')
  const [CoPhone, setCoPhone] = useState('')
  const [CoAddress, setCoAddress] = useState('')
  const [CoWorkNature, setCoWorkNature] = useState('')
  const [CoType, setCoType] = useState('')
  const [CoPasswordConfirm, setCoPasswordConfirm] = useState('')
  const [establishmentDate, setEstablishmentDate] = useState('')

  const sendUserData = () => {
    const data = {
      name: userName,
      email: userEmail,
      mobile_number: userMobile,
      password: userPassword
    }
    axios.post('https://api.lepomedic.sd/public/api/register/user', data)
    .then((res) => {
      setRegMsg(res.data.message);
      setRegStatus(res.data.success)
      // setErrors(res.data.errors);
      setShowModal(true)
      console.log(res.data)
    })
    .then(() => {
      setWait(false)
    })
    setWait(false)
    // console.log(data)
  }

  const sendCoData = () => {
    if(userPassword !== userPasswordConfirm){
      alert('passwords not matching ')
    }
    const data = {
      name: CoName,
      manager: CoManager,
      email: CoEmail,
      password: CoPassword,
      phone_number: CoPhone,
      address: CoAddress,
      work_nature: CoWorkNature,
      type: CoType,
      establishment_date: establishmentDate
    }
    console.log(data)
    axios.post('https://api.lepomedic.sd/public/api/register/company', data)
    .then((res) => {
      console.log(res.data)
      setRegMsg(res.data.message);
      setRegStatus(res.data.success);
      setShowModal(true);
    })
    .then(() => {
      setWait(false)
    })
    setWait(false)
  }






  return (
    <div className="header_space lepo_background">
      {
        showModal?(
          <div>
              <div className="reg_modal_container">
                  <div className="modal_msg_container shadow">
                      <div className="modal_msg_header">
                          <i onClick={ () => setShowModal(false) } className="icon-cancel-circle"></i>
                      </div>
                      <div className="modal_msg_body">
                          <p>{ regMsg }</p>
                      </div>
                      <div>
                        <Link to='/login' className="modal_btn">Login</Link>
                      </div>
                  </div>
              </div>
          </div>
        ):null
      }
      <div className="head_line_gold"></div>
      <div className="comment_title">
        <h2>REGISTER</h2>
      </div>
      <div>

      {/* <div className="head_line_gold"></div> */}
        <div className="new_comment_form_container login_register_add_form_container">
          <div className="reg_type_buttons">
            <button className={regType?"active":null} onClick={ () => setType(true) } >User</button>
            <button className={!regType?"active":null} onClick={ () => setType(false) } >Company</button>
          </div>
          {
            regType?(
              <>
                <h5>User registeration</h5>
                <div className="row new_comment_form ">

                  <div className="col-md-12 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>User name <i className="form_err">{
                        errors.name? errors.name.map(err => err + ' '):""
                      }</i></label>
                      <input
                        value={ userName }
                        onChange={ (e)=> setUserName(e.target.value)}
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>E-Mail <i className="form_err">{
                        errors.email? errors.email.map(err => err + ' '):""
                      }</i></label>
                      <input 
                        value={ userEmail }
                        onChange={ (e)=> setUserEmail(e.target.value)}
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Phone Number<i className="form_err">{
                        errors.mobile_number? errors.mobile_number.map(err => err + ' '):""
                      }</i></label>
                      <input 
                        value={ userMobile }
                        onChange={ (e)=> setUserMobile(e.target.value)}
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Password</label>
                      <input 
                        value={ userPassword }
                        onChange={ (e)=> setUserPassword(e.target.value)}
                      type="password" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Confirm password</label>
                      <input 
                        value={ userPasswordConfirm }
                        onChange={ (e)=> setUserPasswordConfirm(e.target.value)}
                      type="password" placeholder="" />
                    </div>
                  </div>


                  {
                    wait?(
                      <div className="col-md-12 col-sm-12 mobile_input">
                        <br />
                        <div className="comment_input_container">
                          <i><button disabled className="login_btn action_btn_on_wait" > Loading... <i className="icon-cw"></i> </button></i>
                        </div>
                      </div>
                    ):(
                      <div className="col-md-12 col-sm-12 mobile_input">
                        <br />
                        <div className="comment_input_container">
                          <i  onClick={ () => setWait(true) }><button onClick={ () => sendUserData() }>Send <i className="icon-login-1"></i> </button></i>
                        </div>
                      </div>
                    )
                  }

                </div>
              </>
            ):
            (
              <>
                <h5>Company registeration</h5>
                <div className="row new_comment_form">

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Company name</label>
                      <input
                        value={ CoName }
                        onChange={ (e) => setCoName(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>E-Mail</label>
                      <input
                        value={ CoEmail }
                        onChange={ (e) => setCoEmail(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Phone number</label>
                      <input
                        value={ CoPhone }
                        onChange={ (e) => setCoPhone(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Password</label>
                      <input
                        value={ CoPassword }
                        onChange={ (e) => setCoPassword(e.target.value) }
                      type="password" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Confirm password</label>
                      <input
                        value={ CoPasswordConfirm }
                        onChange={ (e) => setCoPasswordConfirm(e.target.value) }
                      type="password" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Address</label>
                      <input
                        value={ CoAddress }
                        onChange={ (e) => setCoAddress(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>


                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Company type</label>
                      <input
                        value={ CoType }
                        onChange={ (e) => setCoType(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Company manager</label>
                      <input
                        value={ CoManager }
                        onChange={ (e) => setCoManager(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>
                  
                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Work nature</label>
                      <input
                        value={ CoWorkNature }
                        onChange={ (e) => setCoWorkNature(e.target.value) }
                      type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 mobile_input">
                    <div className="comment_input_container">
                      <label>Establisment date</label>
                      <input
                        value={ establishmentDate }
                        onChange={ (e) => setEstablishmentDate(e.target.value) }
                      type="date"  placeholder="" />
                    </div>
                  </div>

                  {
                    wait?(
                      <div className="col-md-12 col-sm-12 mobile_input">
                        <br />
                        <div className="comment_input_container">
                          <i><button disabled className="login_btn action_btn_on_wait" > Loading... <i className="icon-cw"></i> </button></i>
                        </div>
                      </div>
                    ):(
                      <div className="col-md-12 col-sm-12 mobile_input">
                        <br />
                        <div className="comment_input_container">
                          <i  onClick={ () => setWait(true) }><button onClick={ () => sendCoData() }>Send <i className="icon-login-1"></i> </button></i>
                        </div>
                      </div>
                    )
                  }


                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Register