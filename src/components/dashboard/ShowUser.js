import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react'

const ShowUser = () => {

    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
    const { id } = useParams()
    const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/user/'+id);
    const [user, setUser] = useState([])
    const token = localStorage.getItem('uat');
    const [loading, setLoading] = useState(true); 

    const config = {
        headers:{
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        }
      }
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
            setUser(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }, [url])

    // Delete user 
    const deleteUser = (id) => {
        axios.delete('https://api.lepomedic.sd/public/api/admin/user/'+id, config)
        .then((res) => {
            page.push('/dashboard/allusers')
        })
    }
  return (
    <div className="row header_space">     
            <div className="col-md-12 col-sm-6 dashboard_show_user">
                <div className="">
                    <div>
                        <h2> DETAILS OF THE USER</h2>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                {
                                    loading?(<></>):(
                                        <>
                                            <tr>
                                                <td className="icon-quote-right"> User Name</td>
                                                <td> { user.name }</td>
                                            </tr>

                                            <tr>
                                                <td className="icon-calendar"> Join date</td>
                                                <td> { user.created_at.slice(0, 10) } </td>
                                            </tr>
                                            
                                            <tr>
                                                <td className="icon-phone"> Mobile </td>
                                                <td> { user.mobile_number } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-mail-alt"> E-Mail</td>
                                                <td> { user.email } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-pin"> Address</td>
                                                <td> { user.address || "Undefined" } </td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                            
                        </table>
                        <div className="dashboard_user_control">
                            <div>
                                <button onClick={ () => deleteUser(user.id) } className="icon-trash-2 "> DELETE USER </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ShowUser