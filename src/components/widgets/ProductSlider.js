import React from 'react'
import Slider from 'react-slick';
import './widgets.css';

const ProductSlider = ({imgs}) => {
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive:[
        {
          breakpoint: 768,
          settings:{
            arrows: false,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings:{
            arrows: false,
            slidesToShow: 1
          },
        }
      ]
  }
    return (
        <div className="slider">
          <div className="slider_info comp_section">
          </div>
          <Slider {...settings} className="">
              {
                  imgs.map((icon, i) => (
                      <i key={i} className="">

                        <div className="shadow image_slider_frame" style={{ backgroundImage: `url(${icon})` }}>
                        </div>
                      </i>
                  ))
              }
          </Slider>
        </div>
    )
}

export default ProductSlider;