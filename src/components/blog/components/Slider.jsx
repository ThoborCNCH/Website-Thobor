import classNames from "classnames";
import React, { useEffect, useState } from "react";

const Slider = (props) => {
  const [activeSlide, setActiveSlide] = useState(-1);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [sliderReady, setSliderReady] = useState(false);

  const imageParts = 4;
  let changeTo = null;
  const autoTime = 5000;

  const runAutoChange = () => {
    changeTo = setTimeout(() => {
      changeSlides(1);
      runAutoChange();
    }, autoTime);
  };

  const changeSlides = (change) => {
    window.clearTimeout(changeTo);
    const { length } = props.slides;
    let newPrevSlide = activeSlide;
    let newActiveSlide = newPrevSlide + change;
    if (newActiveSlide < 0) newActiveSlide = length - 1;
    if (newActiveSlide >= length) newActiveSlide = 0;
    setActiveSlide(newActiveSlide);
    setPrevSlide(newPrevSlide);
  };

  useEffect(() => {
    runAutoChange();
    setTimeout(() => {
      setActiveSlide(0);
      setSliderReady(true);
    }, 0);

    return () => window.clearTimeout(changeTo);
  }, []);

  return (
    <div
      className={classNames("slider", { "s--ready": sliderReady })}
    >
      <div className="slider__slides">
        {props.slides.map((slide, index) => (
          <div
            className={classNames("slider__slide", {
              "s--active": activeSlide === index,
              "s--prev": prevSlide === index,
            })}
            key={slide}
          >
            <div className="slider__slide-parts">
              {[...Array(imageParts).fill()].map((x, i) => (
                <div className="slider__slide-part" key={i}>
                  <div
                    className="slider__slide-part-inner"
                    style={{ backgroundImage: `url(${slide})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="slider__control" onClick={() => changeSlides(-1)} />
      <div
        className="slider__control slider__control--right"
        onClick={() => changeSlides(1)}
      />
    </div>
  );
};

export default Slider;
