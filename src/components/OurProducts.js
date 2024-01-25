import React, { useEffect } from 'react';
import ProductsCard from './widgets/ProductsCard';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState } from 'react';


const card_modal = {
    hidden: {
        scale: 0.9
    },
    visible: {
        scale: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 15,
            stiffness: 300
        }
    }
  }

const OurProducts = () => {
    const [products, setProducts] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const [searchText, setSearschText ] = useState('');
    const [searchResponse, setsearchResponse] = useState('');
    

    useEffect(() => {
        const token = localStorage.getItem('uat');
        const config = {
            headers:{
              "Authorization": "Bearer " + token,
              "Accept": "application/json"
            }
        }
        axios.get('https://api.lepomedic.sd/public/api/company/products', config)
        .then((res) =>{
            console.log(res.data.data)
            setProducts(res.data.data);
        })
    }, [])

    const textSearch = () => {
        const data = { name: searchText }
        axios.post('https://api.lepomedic.sd/public/api/search/name', data)
        .then((res) => {
            setIsSearch(true);
            console.log(">>>")
            console.log(res.data.data)
            setSearchedData(res.data.data)
        })
    }
    // useEffect(() => {
    // }, [isSearch])

  return (
    <div className="header_space">
        <div className="row browse">
            <div className="col-sm-12 browse_header our_products_header shadow">
                <div>
                    <h2>OUR PRODUCTS</h2>
                </div>
                {/* <div className="row product_search_box shadow">
                    <div className="col-10">
                        <input
                            value={ searchText }
                            onChange={ (e) => setSearschText(e.target.value) }
                        type="text" placeholder="search for a product"  />
                    </div>
                    <div className="col-2">
                        <button onClick={ () => textSearch() } className="icon-search-1"></button>
                    </div>
                </div> */}
            </div>
            <div className="row browse_cards_container">
                {
                    isSearch?(
                        searchedData.map((pro, i) => (
                            <motion.div
                                key={ i }
                                variants={card_modal}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                className="col-6 col-md-3 col-sm-12 product_card_sm_container">
                                <ProductsCard 
                                    control={ false }
                                    pid={ pro.id }
                                    name={ pro.name }
                                    date={ pro.production_date }
                                    model={ pro.model }
                                    factoryid={ pro.factory_id }
                                    desc={ pro.description }
                                    media={ pro.media }/>
                            </motion.div>
                        ))
                    ):
                    (
                        products.map((pro, i) => (
                            <motion.div
                                key={ i }
                                variants={card_modal}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                className="col-6 col-md-3 col-sm-12 product_card_sm_container">
                                <ProductsCard 
                                    control={ true }
                                    pid={ pro.id }
                                    name={ pro.name }
                                    date={ pro.production_date }
                                    model={ pro.model }
                                    factoryid={ pro.factory_id }
                                    desc={ pro.description }
                                    media={ pro.media }/>
                            </motion.div>
                        ))
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default OurProducts