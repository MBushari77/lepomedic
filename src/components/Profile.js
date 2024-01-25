import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [wait, setWait] = useState(false);
    const [userData, setUserData] = useState([])
    const [showUserData, setShowUserData] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [upload, setUpload] = useState(false)
    const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/user')
    const userType = localStorage.getItem('type');
    
  useEffect(() => {
    const token = localStorage.getItem('uat');
    const config = {
        headers:{
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
        }
    }
      axios.get(url, config)
      .then((res) => {
        if(res.data){
            console.log(res.data)
          setUserData(res.data)
          setShowUserData(true)
        }
      })
  }, [url])
  useEffect(() => {
    const token = localStorage.getItem('uat');
    const config = {
        headers:{
        "Authorization": "Bearer " + token,
        "Accept": "application/json"
        }
    }
      try {          
          const file = document.getElementsByClassName("file")[0].files;
          const formData = new FormData();
          formData.append('logo', file[0])
          console.log(formData.get('logo'))
          axios.post('https://api.lepomedic.sd/public/api/company/logo', formData, config)
          .then((res) => {
              window.location.reload()
          })
          .then(() => {
            setWait(false)
          })
          .catch((error) => {
              setWait(false)
          })
      } catch (error) {
          console.log(" ")
      }
  }, [upload])

  return (
    <div className="header_space">
        {
        showModal ? (
            <div>
                <div className="reg_modal_container">
                        <div className="modal_msg_container shadow">
                            <div className="modal_msg_header">
                                <i onClick={() => setShowModal(false)} className="icon-cancel-circle"></i>
                            </div>
                            <div>
                                <h4>Upload profile picture</h4>
                            </div>
                            {/* <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data" method="POST"> */}
                                <div className="modal_input">
                                    <input
                                        type="file"
                                        className="file"
                                        accept="image/*"
                                        name="file"
                                    />
                                </div>
                                <div>
                                    {
                                        wait?(
                                            <i> <button disabled className="modal_btn action_btn_on_wait" >Loading...</button> </i>
                                        ):(
                                            <i onClick={ () => setWait(true) } > <button onClick={ () => setUpload(!upload) } className="modal_btn" >Send</button> </i>
                                        )
                                    }
                                </div>
                            {/* </form> */}
                        </div>
                </div>
            </div>
        ) :
            null
        }
        <div className="row profile_container header_space">
            {
                showUserData?(
                    <>
                    {
                        userData.establishment_date?(
                            <>
                                <div className="col-md-4 col-sm-12 profile_mobile">
                                    <div className="company_logo_container">
                                        <div className="profile_picture_container" style={{ backgroundImage: `url(${userData.logo_path})` }}></div>
                                        <div className="upload_new_profile_picture_button">
                                            <button onClick={()=> setShowModal(true)} className="icon-upload-1"></button>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <Link to='/editinfo' className="profile_actions_button">Edit <i className="icon-pencil-2"></i></Link> */}
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    <div className="company_profile_details">
                                        <div>
                                            <h2> DETAILS OF THE COMPANY</h2>
                                        </div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <td className="icon-quote-right"> Company name</td>
                                                    <td> { userData.name }</td>
                                                </tr>

                                                <tr>
                                                    <td className="icon-quote-right"> Manager</td>
                                                    <td> { userData.manager }</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="icon-mail-alt"> E-Mail</td>
                                                    <td> { userData.email }</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="icon-suitcase"> Work nature</td>
                                                    <td> { userData.work_nature }</td>
                                                </tr>

                                                <tr>
                                                    <td className="icon-calendar"> Join date</td>
                                                    <td> { userData.updated_at.slice(0, 10) }</td>
                                                </tr>

                                                <tr>
                                                    <td className="icon-calendar"> Establishment</td>
                                                    <td> { userData.establishment_date.slice(0, 10) }</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="icon-phone"> Phone </td>
                                                    <td> { userData.phone_number }</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="icon-phone"> Type </td>
                                                    <td> { userData.type }</td>
                                                </tr>

                                                <tr>
                                                    <td className="icon-pin"> Company Address</td>
                                                    <td> { userData.address }</td>
                                                </tr>
                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="">
                                    <div className="company_profile_details">
                                        <div>
                                            <h2>PROFILE</h2>
                                        </div>
                                        <div>
                                            <table>
                                                <tr>
                                                    <td className="icon-quote-right"> Name</td>
                                                    <td> { userData.name }</td>
                                                </tr>

                                                


                                                <tr>
                                                    <td className="icon-calendar"> Join date</td>
                                                    <td> { userData.updated_at.slice(0, 10) }</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className="icon-phone"> Mobile </td>
                                                    <td> { userData.mobile_number }</td>
                                                </tr>
                                                <tr>
                                                    <td className="icon-mail-alt"> E-Mail</td>
                                                    <td> { userData.email }</td>
                                                </tr>
                                                <tr>
                                                    <td className="icon-pin"> Address</td>
                                                    <td> { userData.address || "Undefined" }</td>
                                                </tr>
                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 profile_mobile">
                                    <div>
                                        {/* <Link to='/editinfo' className="profile_actions_button">Edit <i className="icon-pencil-2"></i></Link> */}
                                    </div>
                                </div>
                            </>
                        )
                    }          
                    </>
                ):
                (
                    <></>
                )
            }
        </div>
    </div>
  )
}

export default Profile