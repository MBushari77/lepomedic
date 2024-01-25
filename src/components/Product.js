import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ProductsCard from './widgets/ProductsCard';
import { Link } from 'react-router-dom';
import ProductSlider from './widgets/ProductSlider';



const Product = () => {
    const { id } = useParams();
    const token = localStorage.getItem('uat');
    const userType = localStorage.getItem('type') || "non";
    
    const [ptags, setPTags] = useState([]);
    const [url, setTagsUrl] = useState('https://api.lepomedic.sd/public/api/product/'+id);
    const [tagsUrl, setUrl] = useState('https://api.lepomedic.sd/public/api/search/tags');
    const [commentsUrl, setCommentsUrl] = useState('https://api.lepomedic.sd/public/api/product/'+id+'/comments')
    const [userUrl, setUserUel] = useState('https://api.lepomedic.sd/public/api/user')
    const [simliarProducts, setSimilarProducts] = useState([])
    const [product, setProduct] = useState([]);
    const [refreshComments, setRefreshComments] = useState(true);
    const [refreshProduct, setRefreshProduct] = useState(false)
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [logedin, setLogedin] = useState(false)
    const [companyName, setCompanyName] = useState(" ")
    
    const config = {
        headers:{
            "Authorization": "Bearer " + token,
            "Access-Control-Allow-Origin": "*"
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('uat');
        const config = {
            headers:{
                "Authorization": "Bearer " + token
            }
        }
        axios.get(userUrl, config)
        .then((res) => {
            setUserId(res.data.id);
        })
    }, [userUrl])
    useEffect(() => {
        if(token === "non"){
            setLogedin(true)
        }
        axios.get(url)
        .then((res) =>{
            setProduct(res.data.data);
            console.log("Data")
            // console.log(res.data.data.company_id[0].name)
            setPTags(res.data.data.tags);
            setCompanyName(res.data.data.company_id[0].name)
            return res.data.data.tags
        })
        .then((restgs) => {
            const tempTags = [];
            restgs.map((tag, i) => {
                tempTags.push(tag.id);
            })
            return {tags: tempTags};
        })
        .then((tempTags) => {
            axios.post(tagsUrl, tempTags)
            .then((response) => {
                console.log('Similar')
                console.log(response.data)
                // const tempArr = []
                // for(let i = 0; i < response.data.length; i++){
                //     tempArr.push(response.data[i][0])
                // }
                // console.log(tempArr)
                setSimilarProducts(response.data.data)
            })
            setLoading(false)
        })
    }, [url])

    useEffect(() => {
        axios.get(commentsUrl, config)
        .then((res) => {
            console.log(res.data)
            setComments(res.data); 
        })
    }, [commentsUrl, refreshComments])
    const deleteComment = (id) => {
        axios.delete('https://api.lepomedic.sd/public/api/comment/'+id)
        .then((res) => {
            setRefreshComments(!refreshComments)
        })
    }
    const sendComment = () => {
        const data = { comment: comment, user_id: userId, type: userType }
        console.log('data')
        console.log(data)
        axios.post('https://api.lepomedic.sd/public/api/product/' + id + '/comment', data, config)
        .then((res) => {
            console.log(res)
            setComment('')
            setRefreshComments(!refreshComments)
        })
    }
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    }
  return (
    <div className="header_space">
        <div className="product">
            <div className="row current_product">
                <div className="col-md-5 col-sm-12 product_slider">
                    {
                        !loading?(
                            <ProductSlider imgs={ product.media } alt="something" />
                        ):null
                    }
                </div>
                <div className="col-md-5 col-sm-12 current_product_details">
                    <div>
                        <h3>{ product.name }</h3>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td> Production Date </td>
                                    <td> { product.production_date } </td>
                                </tr>
                                <tr>
                                    <td> Model </td>
                                    <td>{ product.model } </td>
                                </tr>
                                <tr>
                                    <td> Company </td>
                                    <td> { companyName } </td>
                                </tr>
                                <tr>
                                    <td> Factory </td>
                                    <td> { product.factory_name } </td>
                                </tr>
                                <tr>
                                    <td> Country </td>
                                    <td> { product.factory_location } </td>
                                </tr>
                                <tr>
                                    <td> Price </td>
                                    <td> { product.price } </td>
                                </tr>
                                <tr>
                                    <td> Warranty </td>
                                    <td> { product.warranty } </td>
                                </tr>
                                <tr>
                                    <td> In-stock </td>
                                    <td> { product.in_stock?"YES":"NO" } </td>
                                </tr>
                                <tr>
                                    <td> Created at </td>
                                    <td> { product.created_at } </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="product_tags">
                            <br />
                            {
                                ptags.length > 0?(
                                    <>{
                                    ptags.map((tag, i) => (
                                        <i key={i}> {tag.tag} </i>
                                    ))}
                                    </>
                                ):null
                            }
                        </div>
                    </div>
                    <div className="product_more_details">
                        <h4>About the product</h4>
                        <p> { product.description } </p>
                    </div>
                    <div className="product_comments_container">
                        {
                            comments.map((comment, i) => (
                                <div className="product_comment" key={ i }>
                                    <div>
                                        <p className="icon-user-1"> { comment.user } { (userId === Number(comment.user_id) && userType === comment.type)?(<i onClick={ () => deleteComment(comment.id) } className="icon-trash-1 delete_post"></i>): null } </p>
                                    </div>
                                    <div>
                                        <i> { comment.comment } </i>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="product_new_comment">
                            {
                                !logedin?(
                                    <>
                                    <div>
                                        <textarea
                                            value={ comment }
                                            onChange={ (e) => setComment(e.target.value) }
                                        placeholder="Write something"></textarea>
                                    </div>
                                    <div>
                                        <button onClick={ () => sendComment() }>SEND</button>
                                    </div>
                                    </>
                                ):
                                (
                                    <>
                                    <h5>Login to drop  comments</h5>
                                        <Link to='/login'>Login</Link>
                                    </>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className="head_line_gold"></div>
            <div className="similar_products">
                {
                    simliarProducts.length?(
                        <div className="similar_header">
                            <h2>SIMILAR PRODUCTS</h2>
                        </div>
                    ):
                    ( <></> )
                }
                <div className="similar_products_cards_container">
                    <div className="row">
                        {
                            simliarProducts.map((product, i) => (
                                <div key={ i } className=" col-6 col-md-3 col-sm-12 product_card_sm_container">
                                    <ProductsCard 
                                        control={ false }
                                        pid={ product.id }
                                        name={ product.name }
                                        date={ product.production_date }
                                        model={ product.model }
                                        factoryid={ product.factory_id }
                                        desc={ product.description }
                                        media={ product.media }/>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product