import React, { useState } from "react";

import "./Carousel.css";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

export const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="carousel">
            <ArrowLeftCircleIcon onClick={prevSlide} className="arrow arrow-left" />
            
            {data.map((item, idx) => {
                return <img src={item.src} alt={item.alt} key={idx} className={slide === idx ? "slide" : "slide slide-hidden"} />;
            })}

            <ArrowRightCircleIcon onClick={nextSlide} className="arrow arrow-right" />

            <span className="indicators">
                {data.map((_, idx) => {
                    return <button key={idx} className={slide === idx ? "indicator" : "indicator indicator-inactive"} onClick={() => setSlide(idx)}></button>;
                })}
            </span>
        </div>
    );
};
