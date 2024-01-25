import React, { useEffect } from 'react';
import DCard from './DCard';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';


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

const AllProd = () => {
    const userType = localStorage.getItem('type');
    const page = useHistory()
    if (userType !== 'admin'){
      page.push('/browse');
    }
    const [products, setProducts] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const [searchText, setSearschText ] = useState('');
    const [tags, setTags] = useState([]);
    const [searchResponse, setsearchResponse] = useState('');
    const [refTags, setRefTags] = useState(false);
    const [url, setUrl] = useState('https://api.lepomedic.sd/public/api/products') 
    const [tagsUrl, setTagsUrl] = useState('https://api.lepomedic.sd/public/api/tags');   

    useEffect(() => {
        const token = localStorage.getItem('uat');
        const config = {
            headers:{
              "Authorization": "Bearer " + token,
              "Accept": "application/json"
            }
        }
        axios.get(url,config)
        .then((res) =>{
            setProducts(res.data.data);
        })
    }, [url])
    const tagsSearch = (id) => {
        axios.post('https://api.lepomedic.sd/public/api/search/tags', {tags: [id]})
        .then((res) => {
            setIsSearch(true);
            setSearchedData(res.data.data)
        })
    }
    useEffect(() => {
        axios.get(tagsUrl)
        .then((res) => {
            setTags(res.data)
            setRefTags(true)
        })
    }, [tagsUrl])

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
            <div className=" col-md-3 col-sm-12 browse_header shadow">
                <div>
                    <h2>BROWSE</h2>
                </div>
                <div className="row product_search_box shadow">
                    <div className="col-10">
                        <input
                            value={ searchText }
                            onChange={ (e) => setSearschText(e.target.value) }
                        type="text" placeholder="search for a product"  />
                    </div>
                    <div className="col-2">
                        <button onClick={ () => textSearch() } className="icon-search-1"></button>
                    </div>
                </div>
                <div className="browse_tags">
                    {
                        refTags?(
                            <>
                                {
                                    tags.map((tag, i) => (
                                        <i key={ i } onClick={ () => tagsSearch(tag.id) } className="tag"> {tag.tag} </i>
                                    ))
                                }
                            </>
                        ):(
                            <>Loading</>
                        )
                    }
                </div>
            </div>
            <div className="col-md-9 col-sm-6 row browse_cards_container">
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
                                <DCard 
                                    control={ true }
                                    pid={ pro.id }
                                    name={ pro.name }
                                    date={ pro.production_date }
                                    model={ pro.model }
                                    factoryid={ pro.factory_id }
                                    desc={ pro.description }
                                    company_id={ pro.company_id}
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
                                <DCard 
                                    control={ true }
                                    pid={ pro.id }
                                    name={ pro.name }
                                    date={ pro.production_date }
                                    model={ pro.model }
                                    factoryid={ pro.factory_id }
                                    desc={ pro.description }
                                    company_id={ pro.company_id}
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

export default AllProd