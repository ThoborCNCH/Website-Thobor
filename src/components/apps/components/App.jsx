import React from "react";

function App({ titlu, p, img, link, codeQR }) {
  return (
    <>
      <div className="app">
        <div className="top">
          <div className="img">
            <div className="before" data-aos="fade-right"></div>
            <img src={img} alt="" data-aos="fade-up" />
            <div className="after" data-aos="fade-left"></div>
          </div>
          <div className="txt">
            <div className="title">
              <h1 data-aos="fade-down">{titlu}</h1>
              <div
                className="linie"
                data-aos="fade-left"
                data-aos-delay="300"
              ></div>
            </div>
            <div className="text">
              <div
                className="linie_vert"
                data-aos="fade-left"
                data-aos-delay="400"
              ></div>
              <p data-aos="fade-left">{p}</p>
            </div>
          </div>
        </div>

        <a href={link} className="button" data-aos="fade-down">
          Download
        </a>
        {codeQR && (
          <img src={codeQR} className="qr" alt="" data-aos="fade-down" />
        )}
      </div>
    </>
  );
}

export default App;
