import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const AddProduct = () => {
  const [wait, setWait] = useState(false);
  const userType = localStorage.getItem('type');
  const page = useHistory()
  if (userType !== 'company') {
    page.push('/browse');
  }
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
  const [productTags, setProductsTags] = useState([]);
  const [tagsUrl, setTagsUrl] = useState('https://api.lepomedic.sd/public/api/tags')
  const [refresh, setRefresh] = useState(true);
  const [uploadToServer, setUploadToServer] = useState(false)

  const token = localStorage.getItem('uat');
  const config = {
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/form-data",
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('uat');
    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
    axios.get(tagsUrl, config)
      .then((res) => {
        setProductsTags(res.data)
      })
  }, [tagsUrl])


  const handleImageChanges = (e) => {
  }

  // const uploadToServer = (e) => {
  useEffect(() => {
    if(uploadToServer){
      const files = document.getElementsByClassName('file')[0].files;
      const formData = new FormData();
      // get all of the tags
      const tagsElem = document.querySelectorAll('#tag');
      const tags = []
      for(let i = 0; i < tagsElem.length; i++){
        if(tagsElem[i].checked){
          tags.push(Number(tagsElem[i].className))
        }
      }
      console.log('tags')
      console.log(tags)
      // appending form data
      formData.append('name', name)
      formData.append('production_date', productionDate)
      formData.append('model', model)
      formData.append('factory_name', factory)
      formData.append('factory_location', country)
      formData.append('description', desc)
      formData.append('price', price)
      formData.append('warranty', Number(warranty))
      formData.append('in_stock', Number(inStock))
      formData.append('tags', tags)
      formData.append('after_sale_services', true)
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i])
      }
      console.log(formData.getAll('file[]'))
      axios.post('https://api.lepomedic.sd/public/api/product', formData, config)
        .then((res) => {
          console.log('res')
          console.log(res)
          page.push('/ourproducts');
        })
        .then(() => {
          setWait(false)
          setUploadToServer(false)
        })
    }
  }, [uploadToServer])

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
        <h2>ADD NEW PRODUCT</h2>
      </div>
      <div>

        {/* <div className="head_line_gold"></div> */}
        <div className="new_comment_form_container login_register_add_form_container">

          <div className="new_comment_form">
            <form className="row" onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data" method="POST">

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
                    value={country}
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
                  <button type="button" onClick={() => setInStock(!inStock)} className={inStock ? "active" : " "}>In stock</button>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="comment_input_container">
                  <label>Product pictures</label>
                  <input
                    accept="image/*"
                    onChange={(e) => handleImageChanges(e)}
                    type="file" className="file" multiple name="file[]" placeholder="Production date" />
                </div>
              </div>
              <div className="col-md-12 col-sm-12 add_product_tags">
                <p>Product tags</p>
                {
                  refresh ?
                    (
                      <div className="product_tags add_product_tags_controler">

                        {
                          productTags.map((tag, i) => (
                            <i key={i}> <input type="checkbox" id="tag" className={tag.id} /> {tag.tag} </i>
                          ))
                        }
                      </div>
                    ) : (
                      <i> Loading products tags... </i>
                    )
                }
              </div>
              {
                  wait?(
                      <div className="col-md-12 col-sm-12">
                        <div className="comment_input_container">
                          <i> <button disabled type="button" className="action_btn_on_wait" > Loading <i className="icon-cw"></i> </button> </i>
                        </div>
                      </div>
                    ):(
                      <div className="col-md-12 col-sm-12">
                        <div className="comment_input_container">
                          <i onClick={ () => setWait(true) } > <button onClick={ () => setUploadToServer(true) } >ADD PRODUCT <i className="icon-login-1"></i> </button> </i>
                        </div>
                      </div>
                  )
              }
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct