import React from "react";

function Slider() {
  const slider_fct = (e) => {
    const options = document.querySelectorAll(".option");
    options.forEach((o) => {
      o.classList.remove("active");
    });
    options[e].classList.add("active");
  };
  return (
    <div data-aos="fade-down">
      <div className="options" >
        <div
          className="option active"
          onClick={() => slider_fct(0)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-walking"></i>
            </div>
            <div className="info">
              <div className="main">Blonkisoaz</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>
        <div
          className="option"
          onClick={() => slider_fct(1)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-snowflake"></i>
            </div>
            <div className="info">
              <div className="main">Oretemauw</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>
        <div
          className="option"
          onClick={() => slider_fct(2)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tree"></i>
            </div>
            <div className="info">
              <div className="main">Iteresuselle</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>
        <div
          className="option"
          onClick={() => slider_fct(3)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>
        <div
          className="option"
          onClick={() => slider_fct(4)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>

        <div
          className="option"
          onClick={() => slider_fct(5)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>

        <div
          className="option"
          onClick={() => slider_fct(6)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>

        <div
          className="option"
          onClick={() => slider_fct(7)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>

        <div
          className="option"
          onClick={() => slider_fct(8)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>

        <div
          className="option"
          onClick={() => slider_fct(9)}
          style={{
            background:
              "url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="info">
              <div className="main">Idiefe</div>
              <div className="sub">Omuke trughte a otufta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
