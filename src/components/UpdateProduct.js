import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [desc, setDesc] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [factory, setFactory] = useState('');
  const [country, setCountry] = useState('')
  const [price, setPrice] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('')
  const [images, setImages] = useState([]);
  const [productTags, setProductsTags] = useState([]); 
  const [tagsUrl, setTagsUrl] = useState('https://api.lepomedic.sd/public/api/tags')
  const [refresh, setRefresh] = useState(true);
  const [newTag, setNewTag] = useState()
  const [tags, setTags] = useState([]);
  const page = useHistory();

  const token = localStorage.getItem('uat');
  const { id } = useParams()
  const config = {
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  }

    useEffect(() => {
        axios.get('https://api.lepomedic.sd/public/api/product/'+id)
        .then((res) => {
            // console.log(res.data.data)
            setName(res.data.data.name)
            setProductionDate(res.data.data.production_date)
            setModel(res.data.data.model)
            setFactory(res.data.data.factory_name)
            setDesc(res.data.data.description)
            setCountry(res.data.data.factory_location)
            setPrice(res.data.data.price)
            setWarranty(res.data.data.warranty)
            setInStock(res.data.data.in_tock)
      })
    }, [])
    useEffect(() => {
      axios.get(tagsUrl)
      .then((res) => {
        setProductsTags(res.data)
        console.log(tempTags)
      })
    }, [tagsUrl])

  function removeItem(arr, value){
      let index = arr.indexOf(value);
      if (index > -1){
      arr.splice(index, 1);
    }
      return arr;
  }
  

  // set tags to send
  const tempTags =[]
  useEffect(() => {
    setRefresh(false)
      if(tempTags.indexOf(newTag) === -1){
        tempTags.push(newTag);
        console.log(tempTags)
      }
      else{
        removeItem(tempTags, newTag)
        console.log(tempTags)
      }
      setRefresh(true)
  }, [newTag])

  
  const handleImageChanges = (e) => {
  }
  const uploadToServer = () => {
    const data = {
      name: name,
      production_date: productionDate,
      model: model,
      description: desc,
      factory_name: factory,
      factory_location: country,
      price: price,
      warranty: warranty,
      in_stock: inStock 
    }
    console.log(data)


    axios.put('https://api.lepomedic.sd/public/api/product/'+id, data, config)
    .then((res) => {
      console.log('res.data')
      console.log(res.data)
      page.push('/ourproducts');
    })

  }
  return (
    <div className="header_space lepo_background">
      {
        showModal ? (
          <div>
            <div className="reg_modal_container">
              <div className="modal_msg_container shadow">
                <div className="modal_msg_header">
                  <i onClick={() => setShowModal(false)} className="icon-cancel-circle"></i>
                </div>
                <div className="modal_msg_body">
                  <p>{response.message}</p>
                </div>
                <div>
                  <Link className="modal_btn" to='/browse'>OK</Link>
                </div>
              </div>
            </div>
          </div>
        ) :
          null
      }
      <div className="head_line_gold"></div>
      <div className="comment_title">
        <h2>UPDATE PRODUCT</h2>
      </div>
      <div>

        {/* <div className="head_line_gold"></div> */}
        <div className="new_comment_form_container login_register_add_form_container">

          <div className="row new_comment_form">
            {/* <form className="row" onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data" method="POST"> */}

            <div className="col-md-12 col-sm-12">
                <div className="comment_input_container">
                  <label>Product name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Product name" />
                </div>
              </div>

              <div className="col-md-12 col-sm-12">
                <div className="comment_input_container">
                  <label>Description</label>
                  <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="text" placeholder="Description" />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Model</label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text" placeholder="Product model" />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Factory country</label>
                  <input
                    value={ country }
                    onChange={(e) => setCountry(e.target.value)}
                    type="text" placeholder="Country" />
                </div>
              </div>

              
              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Factory name</label>
                  <input
                    value={factory}
                    onChange={(e) => setFactory(e.target.value)}
                    type="text" placeholder="Factory" />
                </div>
              </div>
              
              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Price</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="Number" placeholder="Price" />
                </div>
              </div>


              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Warranty</label>
                  <input
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    type="number" placeholder="Production date" />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Production date</label>
                  <input
                    value={productionDate}
                    onChange={(e) => setProductionDate(e.target.value)}
                    type="date" placeholder="Production date" />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container add_product_button_toggler">
                  <label>Is product in stock?</label>
                  <button type="button" onClick={ () => setInStock(!inStock)} className={inStock?"active":" "}>In stock</button>
                </div>
              </div>



              <div className="col-md-12 col-sm-12">
                <div className="comment_input_container">
                  <button onClick={ () => uploadToServer() } >UPDATE <i className="icon-upload"></i> </button>
                </div>
              </div>
            {/* </form> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct