import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

const AllUsers = () => {
  const userType = localStorage.getItem('type');
  const page = useHistory()
  if (userType !== 'admin') {
    page.push('/browse');
  }
  const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(url, )
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
      })
  }, [url])
  return (
    <div className="header_space">
      <div className="all_companies_header">
        <h3>ALL USERS</h3>
      </div>
      <div className="row all_companies_card_container">
        {
          users.map((user, i) => (
            <div key={i} className="col-6 col-md-3 col-sm-6 one_company_card_container">
              <div className="company_card shadow">
                <div className="company_card_details">
                  <br />
                  <div>
                    <h5 className="icon-user-1"> <strong>  {user.name} </strong> </h5>
                  </div>
                  <div>
                    <i className="icon-email-alt"> {user.email} </i>
                  </div>
                  <div>
                    <Link to={'/dashboard/user/' + user.id} className="product_card_link product_card_link_primary icon-forward-1">SHOW</Link>
                  </div>
                  {/* <div>
                          <button className="product_card_link product_card_link_danger icon-block">DELETE</button>
                      </div> */}
                </div>
              </div>
              <br />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AllUsers