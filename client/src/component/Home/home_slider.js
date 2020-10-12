import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';

const HomeSlider = (props) => {

    const slides = [
        {
            img: '/image/featured/slide1.jpg',
            lineOne: 'Lemonade',
            lineTwo: 'Beyoncé',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: '/image/featured/slide2.png',
            lineOne: 'My Dark Beautiful',
            lineTwo: 'Kanye West',
            linkTitle: 'View',
            linkTo: '/shop'
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    const generateSlides = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                            height: `${window.innerHeight}px`
                        }}
                    >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div>
                                <MyButton
                                    type="default"
                                    title={item.linkTitle}
                                    linkTo={item.linkTo}
                                    addStyles={{
                                        margin:'10px 0 0 0'
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            ))
         : null
    )


    return (
        <div className="featured_container" style={{overflow: 'hidden'}}>
            <Slider {...settings}>
                {generateSlides()}
            </Slider>
        </div>
    );
};

export default HomeSlider;