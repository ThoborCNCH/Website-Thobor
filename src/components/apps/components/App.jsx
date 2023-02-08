import React from "react";

function App({ titlu, p, img, link, codeQR, txt_link }) {
  return (
    <>
      {" "}
      <div className="app">
        <div className="top">
          <div className="img">
            <img src={codeQR} alt="" data-aos="fade-up" />
          </div>
          <div className="txt">
            <div className="title">
              <h1 data-aos="fade-down">{titlu}</h1>
              <div
                className="linie"
                data-aos="fade-left"
                data-aos-delay="200"
              ></div>
            </div>
            <div className="text">
              <div
                className="linie_vert"
                data-aos="fade-left"
                data-aos-delay="250"
              ></div>
              <p data-aos="fade-left">{p}</p>
            </div>
          </div>
        </div>

        <a href={link} target="_blank" className="button" data-aos="fade-down">
          {txt_link}
        </a>
        {img && (
          <div className="qr_cont">
            <img src={img} className="qr" alt="" data-aos="fade-down" />
          </div>
        )}
        <div className="linie_sep"></div>
      </div>
    </>
  );
}

export default App;
