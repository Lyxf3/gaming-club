import React from "react";
import Slider from "react-slick";

import './slider.css'

export const AboutPageSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
    }
    return (
        <>
            <Slider {...settings} className="slider">
                <div className="item1">
                </div>
                <div className="item2">
                </div>
                <div className="item3">
                </div>
            </Slider>
        </>
    )
}