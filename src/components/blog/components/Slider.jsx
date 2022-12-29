import React from 'react'
import classNames from "classnames";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.imageParts = 4;
    this.changeTo = null;
    this.autoTime = 5000;
    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTo);
  }

  componentDidMount() {
    this.runAutoChange();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutoChange() {
    this.changeTo = setTimeout(() => {
      this.changeSlides(1);
      this.runAutoChange();
    }, this.autoTime);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTo);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames("slider", { "s--ready": sliderReady })}>
        <div className="slider__slides">
          {this.props.slides.map((slide, index) => (
            <div
              className={classNames("slider__slide", {
                "s--active": activeSlide === index,
                "s--prev": prevSlide === index,
              })}
              key={slide}
            >
              <div className="slider__slide-parts">
                {[...Array(this.imageParts).fill()].map((x, i) => (
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
        <div
          className="slider__control"
          onClick={() => this.changeSlides(-1)}
        />
        <div
          className="slider__control slider__control--right"
          onClick={() => this.changeSlides(1)}
        />
      </div>
    );
  }
}
