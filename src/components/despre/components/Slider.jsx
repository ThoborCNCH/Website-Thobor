// bad animation handling. timing is 2x too long
import React, { useEffect } from "react";

class Slider extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      animating: false,
      animationDirection: "",
      animationDuration: 300,
      currentSlide: 0,
      slides: [
        {
          title: "Raika",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant1.png",
          description: "An incredible plant to beautify your living room.",
          details: {
            temperature: "70 degrees F day 65 degrees F night",
            water: "Summer: 2 litres Winter: 1 litre",
            nutrition: "Garden loam, perlite, peat moss",
          },
        },
        {
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },{
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },{
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },{
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },{
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },{
          title: "Another Plant",
          imageUrl:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
          description: "This is another nice plant.",
          details: {
            temperature: "75 degrees F day 62 degrees F night",
            water: "Summer: 3 litres Winter: 1.5 litre",
            nutrition: "A thing, something, other thing",
          },
        },
      ],
    };

    this.changeSlide = this.changeSlide.bind(this);
  }

  fireAnims(duration) {
    this.setState({
      animating: true,
      animationDirection: "out",
    });
    // halfway
    setTimeout(() => {
      this.setState({
        animating: true,
        animationDirection: "in",
      });
    }, duration / 2);
    // done
    setTimeout(() => {
      this.setState({
        animating: false,
        animationDirection: "",
      });
    }, duration);
  }

  changeSlide(dir) {
    const currentSlide = this.state.currentSlide;
    const slides = this.state.slides;

    if (dir === "right") {
      if (currentSlide < slides.length - 1) {
        this.fireAnims(this.state.animationDuration * 2);
        window.setTimeout(() => {
          this.setState({
            currentSlide: currentSlide + 1,
          });
        }, this.state.animationDuration);
      }
    } else {
      if (currentSlide > 0) {
        this.fireAnims(this.state.animationDuration * 2);
        window.setTimeout(() => {
          this.setState({
            currentSlide: currentSlide - 1,
          });
        }, this.state.animationDuration);
      }
    }
  }

  determineDir(delta) {
    if (delta > 0) {
      return "right";
    } else {
      return "left";
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true,
    });
  }
  render() {
    let classes = ["slideshow"];
    if (this.state.animating) {
      classes.push(
        "slideshow--animated slideshow--" + this.state.animationDirection
      );
    } else {
      classes = ["slideshow"];
    }
    return (
      <div className={classes.join(" ")}>
        <Slide
          title={this.state.slides[this.state.currentSlide].title}
          image={this.state.slides[this.state.currentSlide].imageUrl}
          description={this.state.slides[this.state.currentSlide].description}
          details={this.state.slides[this.state.currentSlide].details}
          count={this.state.currentSlide + 1}
          changeSlide={this.changeSlide}
          slideLength={this.state.slides.length}
        />
      </div>
    );
  }
}

class Slide extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <div className="slide">
        <div className="slide__decorative-sidebar">
          <img   src={this.props.image} />
        </div>

        <div className="slide__info">
          <div className="slide__info__text">
            <h1 className="slide__info__title">{this.props.title}</h1>
            <p className="slide__info__description">{this.props.description}</p>
          </div>
          <img
             
            src={this.props.image}
            alt={this.props.title}
            className="slide__info__image"
          />
          <div className="slide__arrows">
            <a
              className={
                this.props.count > 1
                  ? `slide__arrows__arrow`
                  : `slide__arrows__arrow slide__arrows__arrow--disabled`
              }
              onClick={(e) => this.props.changeSlide("left")}
            >
              {`<`}
              {/* shrug */}
            </a>
            <a
              className={
                this.props.count < this.props.slideLength
                  ? `slide__arrows__arrow`
                  : `slide__arrows__arrow slide__arrows__arrow--disabled`
              }
              onClick={(e) => this.props.changeSlide("right")}
            >
              {`>`}
            </a>
          </div>
        </div>

        <div className="slide__next">
          <span >Next: Factors</span>
        </div>

        <div className="slide__details">
          <div className="slide__details__title" >Discover the details</div>

          <div className="slide__details__block slide__details__block--temp">
            <h3 className="slide__details__subtitle">Temperature</h3>
            <p className="slide__details__block__description">
              {this.props.details.temperature}
            </p>
          </div>

          <div className="slide__details__block slide__details__block--water"  >
            <h3 className="slide__details__subtitle"  >Water</h3>
            <p className="slide__details__block__description"  >
              {this.props.details.water}
            </p>
          </div>

          <div className="slide__details__block slide__details__block--nutrition"  >
            <h3 className="slide__details__subtitle" >Nutrition</h3>
            <p className="slide__details__block__description" >
              {this.props.details.nutrition}
            </p>
          </div>
        </div>

        <div className="slide__count">
          <p className="slide__count__title"  >Explore</p>
          <span className="slide__count__count"  >
            0<span>{this.props.count}</span>
          </span>
        </div>
      </div>
    );
  }
}
export default Slider;