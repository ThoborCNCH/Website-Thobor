import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import Persoana from "./AlumniPersoana";
import { useState } from "react";
import { useEffect } from "react";
// const a = ;

function Generatie({ years, team, persoane, no }) {
  useEffect(() => {
    // console.log(persoane);
  }, [persoane]);
  return no ? (
    <>
      <div className="title_gen">
        <div className="linie"></div>
        <h1 className="year">
          {team ? "Echipa din anii" : "Generația"}: {years}
        </h1>
      </div>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        grabCursor={true}
        autoHeight={true}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {persoane &&
          persoane.map(
            (pers) =>
              pers &&
              pers.map((p) => {
                console.log("dele:", p.img);
                return (
                  <SwiperSlide>
                    {p && (
                      <Persoana
                        no={true}
                        img={p.img}
                        id={p.id}
                        delete_this={p.delete_this_mama}
                        nume={p.nume}
                        faculta={p.faculta}
                        text={p.text}
                      />
                    )}
                  </SwiperSlide>
                );
              })
          )}
      </Swiper>
    </>
  ) : (
    <>
      <div className="title_gen">
        <div className="linie" data-aos="fade-right"></div>
        <h1 className="year" data-aos="fade-up">
          {team ? "Echipa din anii" : "Generația"}: {years}
        </h1>
      </div>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        grabCursor={true}
        // autoHeight={true}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        centerInsufficientSlides={true}
        autoplay={true}
        navigation={true}
        // contentEditable={true}
        centeredSlides={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {persoane &&
          persoane.map(
            (pers) =>
              pers &&
              pers.map((p) => {
                console.
                log("aodas", p.detalii)
                return (
                  <SwiperSlide>
                    {p && (
                      <Persoana
                        no={false}
                        img={p.poza}
                        nume={p.nume}
                        faculta={p.faculta}
                        text={p.detalii}
                      />
                    )}
                  </SwiperSlide>
                );
              })
          )}
      </Swiper>
    </>
  );
}

export default Generatie;
