import React, { useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';
import './widgets.css';
import comp_logo from '../../static/imgs/logo.png'

import c6 from '../../static/imgs/c6.png';


const CoursesWidget = ({title, disc}) => {
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true)
  const icons = [[c6, 'LEPO Gold'], [comp_logo, 'LEPO Blue'], [c6, 'LEPO Gold'], [comp_logo, 'LEPO Blue'], [c6, 'LEPO Gold'], [comp_logo, 'LEPO Blue']];
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive:[
          {
            breakpoint: 768,
            settings:{
              arrows: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings:{
              arrows: false,
              slidesToShow: 2
            },
          }
        ]
    }
    axios.get('https://api.lepomedic.sd/public/api/companies')
    .then((res) => {
      setComps(res.data.data);
      setLoading(false);
    })
    return (
        <div className="slider">
          <div className="slider_info comp_section">
            <h3 className="slider_title"> { title.toUpperCase() } </h3>
            <p className="slider_disc"> { disc } </p>
          </div>
          {
            !loading?(  
              <>
              <Slider {...settings} className="">
                  {
                      comps.map((icon, i) => (
                          <i key={i} className="comp_logo_slider_element">

                            <div className="slider_element slider_element_logo shadow">
                              <div className="logo_slider_img_bg" style={{ backgroundImage: `url("https://lepomedic.sd/static/media/c6.e014b2f195c1595ba34b.png")` }}>

                              </div>
                              <div className='logo_p_container'>
                                <p>{ icon.name }</p>
                              </div>
                            </div>
                          </i>
                      ))
                  }
              </Slider>
              </>
            ):(
              <>Loading...</>
            )

          }
        </div>
    )
}

export default CoursesWidget;