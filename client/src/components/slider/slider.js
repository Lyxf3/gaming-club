import React from "react";
import Slider from "react-slick";
import computer from "../../details/images/slider/computer-1.jpg";
import laptop from "../../details/images/slider/laptop-1.jpg";
import zone from "../../details/images/slider/vip-zone-pcs.png";
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
                <div>

                </div>
                <div>
                    {/*<img src={laptop} alt="laptop"/>*/}
                </div>
                <div>
                    {/*<img src={zone} alt="zone"/>*/}
                </div>
                <div>
                    {/*<img src={laptop} alt="laptop"/>*/}
                </div>
                <div>
                    {/*<img src={computer} alt="computer"/>*/}
                </div>
                <div>
                    {/*<img src={zone} alt="zone"/>*/}
                </div>
            </Slider>
        </>
    )
}