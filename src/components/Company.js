import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductsCard from './widgets/ProductsCard'


const Company = () => {
    const { id } = useParams()
    const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/company/'+id);
    const [prodUrl, setProdUrl] = useState('https://api.lepomedic.sd/public/api/search/company');
    const [comp, setComp] = useState([])
    const token = localStorage.getItem('uat');
    const userType = localStorage.getItem('type');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [response, setResponse] = useState('')

    const page = useHistory()

    const config = {
        headers:{
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        }
    }
    useEffect(() => {
        const data = {company_id: id}
        axios.post(prodUrl, data)
        .then((res) => {
            console.log(res.data.data)
            setProducts(res.data.data)
        })
    }, [prodUrl])

    useEffect(() => {
        axios.get(url)
        .then((res) => {
            setComp(res.data)
            setLoading(false)
        })
    }, [url])


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
                    </div>
                </div>
            </div>
            <div>
                <div className="col-md-6 col-sm-12">
                    <h2>COMPANY PRODUCTS</h2>
                    <div className="row">
                        {
                            !loading?(
                                <>
                                    {
                                        products.map((pro, i) => (
                                            <div key={ i } className="col-6 col-md-4 col-sm-12 product_card_sm_container">
                                                <ProductsCard
                                                    control={ false }
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

export default Company