import React from 'react'
import { useHistory } from 'react-router'

const ShowWaiting = () => {
    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
  return (
    <div className="row header_space">     
            <div className="col-md-12 col-sm-6 dashboard_show_user">
                <div className="">
                    <div>
                        <h2> DETAILS OF COMPANY</h2>
                    </div>
                    <div>
                        <table>

                            <tr>
                                <td className="icon-quote-right"> User Name</td>
                                <td> Bushari</td>
                            </tr>

                            <tr>
                                <td className="icon-calendar"> Join date</td>
                                <td> asdasdasdasd </td>
                            </tr>
                            
                            <tr>
                                <td className="icon-phone"> Mobile </td>
                                <td> asdasdasd </td>
                            </tr>

                            <tr>
                                <td className="icon-mail-alt"> E-Mail</td>
                                <td> asdasdasd </td>
                            </tr>

                            <tr>
                                <td className="icon-pin"> Address</td>
                                <td> werwerwer </td>
                            </tr>
                            
                        </table>
                        <div className="dashboard_user_control">
                            <div>
                                <button className="icon-check-1 confirm_order"> CONFIRM ORDER </button>
                            </div>
                            <div>
                                <button className="icon-trash-2"> DELETE COMPANY </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ShowWaiting