import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const WaitingComp = () => {
    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
  const [companies, setCompanies] = useState([])
  const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/admin/company')
  const [loading, setLoading] = useState(true)
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
          setCompanies(res.data.data.nonVerfied)
          setLoading(false)
      })
  }, [url])
  return (
    <div className="header_space">
        <div className="all_companies_header">
            <h3>COMPANIES ON WAITING</h3>
        </div>
        <div className="row all_companies_card_container">
            {
                !loading || companies.length === 0?(
                    <>
                    {
                        companies.map((company, i) => (
                            <div key={ i } className="col-6 col-md-3 col-sm-6 one_company_card_container">
                                <div className="company_card shadow">
                                    <div className="company_card_header">
                                        <img src={ company.logo_path } alt="something" />
                                    </div>
                                    <div className="company_card_details">
                                        <div>
                                            <p> <strong>  { company.name } </strong> </p>
                                        </div>
                                        <div>
                                            <i> { company.type } </i>
                                        </div>
                                        <div>
                                            <Link to={'/dashboard/company/' + company.id} className="product_card_link product_card_link_primary icon-forward-1">SHOW</Link>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))
                    }
                    </>
                ):(
                    <>
                        <h1>NO COMPANIES</h1>
                    </>
                )
            }

        </div>
    </div>
  )
}

export default WaitingComp