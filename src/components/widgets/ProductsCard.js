import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';

const ProductsCard = ({control, pid, name, date, model, factoryid, desc, media, company_id}) => {
    const page = useHistory()
    const token = localStorage.getItem('uat')||'non';
    const config = {
        headers:{
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        }
    
    }
    const url = 'https://api.lepomedic.sd/public/api/product/';

    const deleteProduct = (pid) => {
        axios.delete(url + pid, config)
        .then((res) => {
            window.location.reload()
        })
    }
    const updateProduct = (pid) => {
        page.push('/updateproduct/'+pid)
    }
    
  return (
    <div className="product_card shadow">
        <div className="product_card_img">
            <br />
            <div className="product_card_image_container" style={{backgroundImage: `url(${media[0]})`}}></div>
        </div>
        <div className="product_card_details">
            <div>
                <h6> { name } </h6>
            </div>
            <div className="">
                <i>Model: { model.slice(0, 10) } {model.length > 10? "..." : null} </i>
            </div>
            <div className="">
                <i>Date: { date } </i>
            </div>
            {
                control?(
                    <div className="row product_card_actions_container">
                        <div className="col-6">
                            <i onClick={ () => updateProduct(pid) } className="icon-pencil-2"></i>
                        </div>
                        <div className="col-6">
                            <i onClick={ () => deleteProduct(pid) } className="icon-trash-2"></i>
                        </div>
                    </div>
                ):
                (
                    <></>
                )
            }
            <div>
                {
                   company_id?(
                       <Link to={`/company/${company_id[0].id}`} className="product_card_link product_card_link_primary">Company</Link>
                   ):<></>
                }
            </div>
            <div>
                <Link to={`/product/${pid}`} className="product_card_link product_card_link_secondary">Show</Link>
            </div>
        </div>
    </div>
  )
}

export default ProductsCard