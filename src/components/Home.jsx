import "../style/style.scss";
import CountUp from "react-countup";
import $ from "jquery";
import { useEffect, useRef } from "react";
import Incercare from "./Incercare";
import AOS from "aos";
import "aos/dist/aos.css";

$("nav ul li > a:not(:only-child)").on("click", function (e) {
  $(this).siblings(".nav-dropdown").slideToggle();
  $(".nav-dropdown").not($(this).siblings()).hide();
  e.stopPropagation();
});
$("html").on("click", function () {
  $(".nav-dropdown").hide();
});
// Toggle open and close nav styles on click
$("#nav-toggle").on("click", function () {
  $("nav ul").slideToggle();
});
$("#nav-toggle").on("click", function () {
  this.classList.toggle("active");
});

function Home() {
    const h1 = useRef(null);

    useEffect(() => {
      AOS.init();
    }, []);
  
    window.addEventListener("scroll", () => {
      document.querySelector(".despre h1").style.transform = `translateX(${
        window.innerWidth > 700 ? window.scrollY / 1.6 : window.scrollY / 4.5
      }px)`;
    });
  return (
    <>
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <a href="#!"> THOBOR </a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <a href="#!">Home</a>
            </li>
            <li>
              <a href="#!">Shop</a>
            </li>
            <li>
              <a href="#!">Services</a>
              <ul className="nav-dropdown">
                <li>
                  <a href="#!">Web Design</a>
                </li>
                <li>
                  <a href="#!">Web Development</a>
                </li>
                <li>
                  <a href="#!">Graphic Design</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!">About Us</a>
            </li>
            <li>
              <a href="#!">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <div className="home">
      <div className="text">
        <h2 data-aos="fade-right" data-aos-delay="300">
          we are the
        </h2>
        <h1 data-aos="fade-right">thobor</h1>
        <h2 data-aos="fade-right" data-aos-delay="300">
          team
        </h2>
      </div>
      <div className="img" data-aos="fade-left">
        <img src={require("../img/first.svg").default} alt="" />
        <img
          className="cerc"
          src={require("../img/cerc2.svg").default}
          alt=""
        />
        <img
          className="cerc"
          src={require("../img/cercD.svg").default}
          alt=""
        />
      </div>
      <Incercare id="tsparticles" />

      <div className="custom-shape-divider-bottom-1669758197">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>

    <div className="cifre">
      <h3 data-aos="fade-down">thobor in cifre:</h3>
      <div className="tab" data-aos="fade-down">
        <div className="linie">
          <div className="cifra">
            <h1>
              <span> + </span>
              <span id="cifra_ani">
                {" "}
                <CountUp
                  end={100}
                  enableScrollSpy
                  scrollSpyDelay={600}
                />{" "}
              </span>
            </h1>
            <h2>Ani de experienta</h2>
          </div>

          <div className="cifra">
            <h1>
              <span> + </span>
              <span id="cifra_nat">
                <CountUp end={100} enableScrollSpy scrollSpyDelay={600} />
              </span>
            </h1>
            <h2>Participari la nationala</h2>
          </div>
        </div>

        <div className="linie">
          <div className="cifra">
            <h1>
              <span> + </span>
              <span id="cifra_mem">
                <CountUp end={100} enableScrollSpy scrollSpyDelay={600} />
              </span>
            </h1>
            <h2>Membrii</h2>
          </div>

          <div className="cifra">
            <h1>
              <span> + </span>
              <span id="cifra_al">
                <CountUp end={100} enableScrollSpy scrollSpyDelay={600} />
              </span>
            </h1>
            <h2>Alumni</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="despre">
      <div className="custom-shape-divider-bottom-plm">
        <svg
          className="sucit"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h1 ref={h1}>Despre</h1>
      <h2 data-aos="zoom-in-up">Despre</h2>
      <p data-aos="zoom-in-up">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, iusto
        odit. Culpa, nulla doloribus blanditiis sunt voluptatem, quisquam
        ipsam voluptates fugit beatae neque similique laborum adipisci porro
        vel eaque rem ad consequuntur id deserunt! Voluptates magnam vitae
        incidunt. Repellendus eaqu Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Animi, iusto odit. Culpa, nulla doloribus blanditiis
        sunt voluptatem, quisquam ipsam voluptates fugit beatae neque
        similique laborum adipisci porro vel eaque rem ad consequuntur id
        deserunt! Voluptates magnam vitae incidunt. Repellendus eaqu
      </p>
      <a href="#" className="button" data-aos="zoom-in-up">
        afla mai multe
      </a>
    </div>
    <div className="cards">
      <div className="card" data-aos="fade-right">
        <img src={require("../img/icon.svg").default} />
        <h1>work</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
          iusto odit.
        </p>
      </div>
      <div className="card" data-aos="fade-right" data-aos-delay="200">
        <img src={require("../img/icon.svg").default} />
        <h1>work</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
          iusto odit.
        </p>
      </div>
      <div className="card" data-aos="fade-right" data-aos-delay="400">
        <img src={require("../img/icon.svg").default} />
        <h1>work</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
          iusto odit.
        </p>
      </div>
      <div className="card" data-aos="fade-right" data-aos-delay="600">
        <img src={require("../img/icon.svg").default} />
        <h1>work</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
          iusto odit.
        </p>
      </div>
    </div>
    <div className="al">

    <img src={require("../img/robots.png")} alt="" />
    <section className="contact">
      <div className="text">
        <h1 className="op" data-aos="fade-down" data-aos-delay="300">
          Do you HAVE
        </h1>
        <h1 className="ful" data-aos="fade-down">
          A MESSAGE
        </h1>
        <h1 className="op d" data-aos="fade-down" data-aos-delay="500">
          for us?
        </h1>
      </div>
      <a
        href="mailto: contacto@institutohispanorumano.org"
        className="button"
        data-aos="zoom-in"
      >
        contact us
      </a>
    </section>
    </div>

    {/* <div className="membrii">
      <ul className="team">
        <li className="member co-funder">
          <div className="thumb">
            <img src="https://assets.codepen.io/3/internal/avatars/users/default.png?fit=crop&format=auto&height=120&width=120" />
          </div>
          <div className="description">
            <h3>Chris Coyier</h3>
            <p>
              Chris is a front-end developer and designer. He writes a bunch
              of HTML, CSS, and JavaScript and shakes the pom-poms for
              CodePen.
              <br />
              <a href="https://codepen.io/chriscoyier/">@chriscoyier</a>
            </p>
          </div>
        </li>
        <li className="member co-funder">
          <div className="thumb">
            <img src="https://assets.codepen.io/2/internal/avatars/users/default.png?height=120&width=120" />
          </div>
          <div className="description">
            <h3>Alex Vazquez</h3>
            <p>
              Alex is a full stack developer. Alex does JavaScript development
              for CodePen, both front end and back, and just about everything
              else.
              <br />
              <a href="https://codepen.io/quezo/">@quezo</a>
            </p>
          </div>
        </li>
        <li className="member">
          <div className="thumb">
            <img src="https://assets.codepen.io/652/internal/avatars/users/default.png?height=120&width=120" />
          </div>
          <div className="description">
            <h3>Marie Mosley</h3>
            <p>
              Marie wears a lot of hats. She is our documentation lead,
              customer support maestra, editor, and community manager.
              <br />
              <a href="https://codepen.io/mariemosley/">@mariemosley</a>
            </p>
          </div>
        </li>
        <li className="member">
          <div className="thumb">
            <img src="https://assets.codepen.io/39255/internal/avatars/users/default.png?height=120&width=120" />
          </div>
          <div className="description">
            <h3>Stephen Shaw</h3>
            <p>
              Stephen is a designer/developer residing in Houston. He likes to
              build animations with CSS & JavaScript.
              <br />
              <a href="https://codepen.io/shshaw/">@shshaw</a>
            </p>
          </div>
        </li>
        <li className="member">
          <div className="thumb">
            <img src="https://cpwebassets.codepen.io/assets/packs/about-rachelsmith-6878ca76a1d9200e6c296e810050b8cb.jpg?height=120&width=120" />
          </div>
          <div className="description">
            <h3>Rachel Smith</h3>
            <p>
              Rachel is a full stack'er in Australia. Not only a creative and
              talented designer and developer, but a great technical writer.
              <br />
              <a href="https://codepen.io/rachsmith/">@rachsmith</a>
            </p>
          </div>
        </li>
        <li className="member">
          <div className="thumb">
            <img src="https://cpwebassets.codepen.io/assets/packs/about-robertkieffer-77c28f3a6efe082fd1903affae540b8a.jpg?height=120" />
          </div>
          <div className="description">
            <h3>Robert Kieffer</h3>
            <p>
              Robert is a full-stack dev with a penchant for open-source work.
              He dwells in the murky depthsmurky depths of JS.
              <br />
              <a href="https://codepen.io/broofa/">@broofa</a>
            </p>
          </div>
        </li>
        <li className="member">
          <div className="thumb">
            <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          </div>
          <div className="description">
            <h3>Dee Vazquez</h3>
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
              <br />
              <a href="https://codepen.io/deequez/">@deequez</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
     <div className="premii">
      <div className="left">
        <h1>Premii castigate</h1>
        <div className="linie" />
        <h2>din 2018</h2>
      </div>
      <div className="right">
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
        <div className="an">
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
        </div>
        <div className="an">
          <div className="text">
            <p>
              Dee is a full stack developer who started her career in finance.
              She can jump from Rails to React to Go, and also manage our
              finances.
            </p>
          </div>
          <div className="linie_an">
            <h3>2016</h3>
          </div>
          <img src="https://res.cloudinary.com/thobor/image/upload/v1612031000/premii/doi.png.png" />
        </div>
      </div>
    </div> */}

    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">Genii ale Culturii Românești</h1>

        <h2>Contact</h2>

        <address>
          contacto@institutohispanorumano.org
          <br />
          <a
            className="footer__btn"
            href="mailto:contacto@institutohispanorumano.org"
          >
            Email Us
          </a>
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Our channels</h2>

          <ul className="nav__ul">
            <li>
              <a href="https://institutohispanorumano.org/">
                Institutul Hispano-Român
              </a>
            </li>

            <li>
              <a href="https://scoala.institutohispanorumano.org/">
                Scoala Nicolae Iorga
              </a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms of Use</a>
            </li>

            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="legal">
        <p>&copy; 2022 Instituto Hispano-Rumano All rights reserved.</p>

        <div className="legal__links">
          <span>
            Editors Matei <span className="heart">&</span> Mihail
          </span>
        </div>
      </div>
    </footer>

    <a href="#" className="up" data-aos="fade-up">
        <img src={ require("../img/up.svg").default} alt="" />
    </a>
  </>
  )
}

export default Home