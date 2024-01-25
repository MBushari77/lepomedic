import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const DashBoard = () => {
    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
  return (
    <div className="header_space dashboard">
        <div className="dashboeard_username">
            <h4 className="icon-cog-alt"> DASHBOARD </h4>
        </div>
        <div className="row db_header_controler">
            <div className="col-md-6 col-sm-12">
                <Link to='/dashboard/allcompanies' className="db_header_links all_comapnies_button icon-cube"> ALL COMPANIES </Link>
            </div>
            <div className="col-md-6 col-sm-12">
                <Link to='/dashboard/allusers' className="db_header_links all_users_button icon-users"> ALL USERS </Link>
            </div>
            <div className="col-md-6 col-sm-12">
                <Link to='/dashboard/allproducts' className="db_header_links all_products_button icon-box-1"> ALL PRODUCTS </Link>
            </div>
            <div className="col-md-6 col-sm-12">
                <Link to='/dashboard/witingcompanies' className="db_header_links waiting_comapnies_button icon-clock"> WAITING COMPANIES </Link>
            </div>
            
            
            
            
        </div>
    </div>
  )
}

export default DashBoard