import React from "react";

function Contact() {
  return (
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
        href="mailto: thoborcnch@gmail.com"
        className="button"
        data-aos="zoom-in"
      >
        contact us
      </a>
    </section>
  );
}

export default Contact;
