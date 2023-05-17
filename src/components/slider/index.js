import React, { useEffect, useState } from "react";
import { sliderData } from "./slider-data";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTruckMonster,
} from "react-icons/fa";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounseOn, setIsMouseOn] = useState(false);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let interTime = 2000;

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide, isMounseOn]);

  function auto() {
    slideInterval = setInterval(nextSlide, interTime);
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide == sliderLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide == 0 ? sliderLength - 1 : currentSlide - 1);
  };

  return (
    <div
      onMouseLeave={() => {
        slideInterval = setInterval(nextSlide, interTime);
      }}
      onMouseEnter={() => clearInterval(slideInterval)}
      className="slider"
    >
      <FaArrowCircleLeft onClick={prevSlide} className="arrow prev" />
      <FaArrowCircleRight onClick={nextSlide} className="arrow next" />

      {sliderData.map((slide, index) => {
        const { desc, image, heading } = slide;
        return (
          <div
            key={slide.heading}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
