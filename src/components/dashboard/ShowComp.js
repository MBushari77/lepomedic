import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DCard from './DCard'


const ShowComp = () => {
    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
    const { id } = useParams()
    const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/company/'+id);
    const [prodUrl, setProdUrl] = useState('https://api.lepomedic.sd/public/api/search/company');
    const [comp, setComp] = useState([])
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [response, setResponse] = useState('')
    const token = localStorage.getItem('uat');
    const config = {
        headers:{
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        }
    }


    useEffect((id) => {
        const token = localStorage.getItem('uat');
        const config = {
            headers:{
              "Authorization": "Bearer " + token,
              "Accept": "application/json"
            }
        }
        const data = {company_id: id}
        axios.post(prodUrl, data, config)
        .then((res) => {
            console.log(res.data.data)
            setProducts(res.data.data)
        })
    }, [prodUrl])

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
            setComp(res.data)
            setLoading(false)
        })
    }, [url])

    // Delete company
    const deleteComp = (id) => {
        axios.delete('https://api.lepomedic.sd/public/api/company/'+id, config)
        .then((res) => {
            console.log(res.data)
            setResponse(res.data)
            setShowModal(true)
        })
    }
    const verifyComp = (id) => {
        const data = {
            company_id: id
        }
        axios.post('https://api.lepomedic.sd/public/api/admin/company/verify', data, config)
        .then((res) => {
            console.log(res.data)
            setResponse(res.data)
            setShowModal(true)
        })
    }
  return (
    <div className="row header_space">
        {
            showModal?(
                <div>
                    <div className="reg_modal_container">
                        <div className="modal_msg_container shadow">
                            <div className="modal_msg_header">
                                <i onClick={ () => setShowModal(false) } className="icon-cancel-circle"></i>
                            </div>
                            <div className="modal_msg_body">
                                <p>{ response.message }</p>
                            </div>
                            <div>
                                <Link to='/dashboard/allcompanies' className="modal_btn icon-check">OK</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ):null
        }
            <div className="row  col-md-12 col-sm-6 dashboard_show_user">
                <div className="col-6 col-md-6 col-sm-12">
                    <div>
                        <h2> DETAILS OF THE COMPANY</h2>
                    </div>
                    <div className>
                        <div className="show_company_logo">
                            <img src={ comp.logo_path } alt="something" />
                        </div>
                        <table>
                            <tbody>
                                {
                                    loading?(<></>):(
                                        <>
                                            <tr>
                                                <td className="icon-quote-right"> User Name</td>
                                                <td> { comp.name }</td>
                                            </tr>

                                            <tr>
                                                <td className="icon-calendar"> Join date</td>
                                                <td> { comp.created_at.slice(0, 10) } </td>
                                            </tr>
                                            
                                            <tr>
                                                <td className="icon-phone"> Mobile </td>
                                                <td> { comp.phone_number } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-mail-alt"> E-Mail</td>
                                                <td> { comp.email } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-pin"> Address</td>
                                                <td> { comp.address || "Undefined" } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-calendar"> Establishment date date</td>
                                                <td> { comp.establishment_date.slice(0, 10) } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-calendar"> Manager </td>
                                                <td> { comp.manager } </td>
                                            </tr>
                                            
                                            <tr>
                                                <td className="icon-calendar"> Verified at </td>
                                                <td> { String(comp.verified_at) } </td>
                                            </tr>

                                            <tr>
                                                <td className="icon-calendar"> Work nature </td>
                                                <td> { comp.work_nature } </td>
                                            </tr>

                                            
                                        </>
                                    )
                                }
                            </tbody>
                            
                        </table>
                        {
                            comp.verified_at?(
                                <div className="row dashboard_user_control">
                                    <div className="col-12">
                                        <button onClick={ () => deleteComp(comp.id) } className="icon-trash-2 "> DELETE COMPANY </button>
                                    </div>
                                </div>
                            ):
                            (
                                <div className="row dashboard_user_control">
                                    <div className="col-md-6 col-sm-12">
                                        <button onClick={ () => verifyComp(comp.id) } className="icon-check-1 verify_company"> VERIFY COMPANY </button>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <button onClick={ () => deleteComp(comp.id) } className="icon-trash-2 "> DELETE COMPANY </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col-6 col-md-6 col-sm-12">
                    <h2>COMPANY PRODUCTS</h2>
                    <div className="row">
                        {
                            !loading?(
                                <>
                                    {
                                        products.map((pro, i) => (
                                            <div key={ i } className="col-6 col-md-4 col-sm-12 product_card_sm_container">
                                                <DCard 
                                                    control={ true }
                                                    pid={ pro.id }
                                                    name={ pro.name }
                                                    date={ pro.production_date }
                                                    model={ pro.model }
                                                    factoryid={ pro.factory_id }
                                                    desc={ pro.description }
                                                    media={ pro.media }/>
                                            </div>
                                        ))
                                    }
                                </>
                            ):(
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ShowComp