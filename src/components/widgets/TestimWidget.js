import React from 'react'
import Slider from 'react-slick';
import './widgets.css';

import userPic from '../../static/imgs/team/member.png'

const people = [
  {name: "م. ناصر الفاتح بسطاوي", comment: "الموقع مفيد جدا و يساهم في عملية الحصول على الأجهزة لمختلف الأقسام، و أقترح إضافة قسم لمهندسي الصيانة", jobTitle: "مهندس طبي_مستشفى مكة لطب العيون"},
  {name: "د. جلال علي آدم", comment: "فكرة جمع شركات الاجهزة الطبية و تنظيم منتجاتها فكرة مميزة و تسهل عملية الحصول على الأجهزة", jobTitle: "المدير الطبي و مدير المشتريات بالإنابة _ مستشفى الخرطوم التعليمي"}
]


const CoursesWidget = ({title, disc}) => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 2,
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
              slidesToShow: 1
            },
          }
        ]
    }
    return (
        <div className="slider">
          <div className="slider_info">
            <h3 className="slider_title"> { title.toUpperCase() } </h3>
            <p className="slider_disc"> { disc } </p>
          </div>
          <Slider {...settings} className="">
              {
                  people.map((person, i) => (
                      <i key={i} className="inlineblock">
                        <div className="testi_bacground">
                          <div className={"testimonials_element  " }>
                            <div>
                              <h4 className="icon-user-1"> { person.name } </h4>
                            </div>
                            <div>
                              <i className="icon-quote-right"> { person.comment } </i>
                            </div>
                            <div>
                              <p className=" icon-tag">
                                { person.jobTitle }
                              </p>
                            </div>
                          </div>
                        </div>
                      </i>
                  ))
              }
          </Slider>
        </div>
    )
}

export default CoursesWidget;