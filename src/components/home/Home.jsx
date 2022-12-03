import "./style.scss";
import CountUp from "react-countup";
import Up from "../utils/Up";
import { useEffect, useRef } from "react";
import Incercare from "../utils/Incercare";
import AOS from "aos";
import "aos/dist/aos.css";
import Svg from "../utils/Svg";
import Contact from "../utils/Contact";

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
          <img src={require("../../img/first.svg").default} alt="" />
          <img
            className="cerc"
            src={require("../../img/cerc2.svg").default}
            alt=""
          />
          <img
            className="cerc"
            src={require("../../img/cercD.svg").default}
            alt=""
          />
        </div>
        <Incercare id="tsparticles" />
      </div>

      <div className="cifre">
        {" "}
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
          <img src={require("../../img/icon.svg").default} />
          <h1>work</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            iusto odit.
          </p>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="200">
          <img src={require("../../img/icon.svg").default} />
          <h1>work</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            iusto odit.
          </p>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="400">
          <img src={require("../../img/icon.svg").default} />
          <h1>work</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            iusto odit.
          </p>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="600">
          <img src={require("../../img/icon.svg").default} />
          <h1>work</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            iusto odit.
          </p>
        </div>
      </div>
      <div className="al">
        <Svg />
        <Contact />
      </div>

      <Up />
    </>
  );
}

export default Home;
