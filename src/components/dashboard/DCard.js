import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';

const DCard = ({control, pid, name, date, model, factoryid, desc, media}) => {
    const page = useHistory()
    const token = localStorage.getItem('uat');
    const config = {
        headers:{
          "Authorization": "Bearer " + token,
          "Accept": "application/json"
        }
    
    }
    const url = 'https://api.lepomedic.sd/public/api/product/';

    const deleteProduct = (pid) => {
        const token = localStorage.getItem('uat');
        const config = {
            headers:{
              "Authorization": "Bearer " + token,
              "Accept": "application/json"
            }
        }
        const data = {id: pid}
        axios.delete(url + pid, config)
        .then((res) => {
            console.log("asd")
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
                        <div className="col-12">
                            <i onClick={ () => deleteProduct(pid) } className="icon-trash-2"> Delete</i>
                        </div>
                    </div>
                ):
                (
                    <></>
                )
            }
            <div>
                <Link to={`/product/${pid}`} className="product_card_link product_card_link_secondary">Show</Link>
            </div>
        </div>
    </div>
  )
}

export default DCard