import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import Persoana from "./AlumniPersoana";

function Generatie({ years, team }) {
  return (
    <>
      <div className="title_gen">
        <div className="linie" data-aos="fade-right"></div>
        <h1 className="year" data-aos="fade-up">
         {team ? "generația": "Echipa din anii"}: {years}
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
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Generatie;
