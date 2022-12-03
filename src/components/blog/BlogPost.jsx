import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./blog_post.scss";
import Slider from "./components/Slider";
import Svg from "../utils/Svg";
import Contact from "../utils/Contact";
import Up from "../utils/Up";

const slides = [
  {
    city: "Tokyo",
    country: "Japan",
    img: "https://docs.google.com/uc?export=download&id=15FqcVuQibdrxcbseeT1voLeCNOqxg5TW",
  },
  {
    city: "Seoul",
    country: "South Korea",
    img: "https://docs.google.com/uc?export=download&id=1K6kZuWK1Zr6CQpBvSlvuZ6hziHH__49G",
  },
  {
    city: "London",
    country: "Great Britain",
    img: "https://docs.google.com/uc?export=download&id=1lijCcfAeihE90f7vcPgT7Hl8G1aocUOC",
  },
  {
    city: "Vienna",
    country: "Austria",
    img: "https://docs.google.com/uc?export=download&id=17y6_tx4GFspBgQ3-OEcUWK2-FJwOiOab",
  },
];

function BlogPost({ id }) {
  useEffect(() => {
    console.log(id);
    AOS.init();
  }, []);

  return (
    <>
      <img
        className="header"
        src={require("../../img/blog_banner.svg").default}
        alt=""
      />
      <div className="blog_post">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. Illo eius iure quidem?
          Dicta, perspiciatis.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. Illo eius iure quidem?
          Dicta, perspiciatis. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Eius accusantium, necessitatibus soluta quidem omnis
          nam molestias eaque vitae at magnam itaque sapiente fugiat
          exercitationem sint, adipisci dolore in, saepe voluptates. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eligendi commodi dolorum
          sint excepturi error maiores rem labore autem! Architecto, nam.
          Delectus at libero nemo cupiditate eius ea quibusdam neque molestias!
          lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
          ab aliquam minima iusto autem debitis consectetur dignissimos
          reiciendis vitae alias harum eos, molestias mollitia recusandae sed
          illum quidem necessitatibus quas? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsam officia iste magnam quisquam.
          Assumenda esse quis cumque soluta voluptatem aperiam ullam, eveniet
          nam nulla repellat laborum necessitatibus iste amet illum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. reiciendis vitae alias
          harum eos, molestias mollitia recusandae sed illum quidem
          necessitatibus quas? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam officia iste magnam quisquam. Assumenda esse
          quis cumque soluta voluptatem aperiam ullam, eveniet nam nulla
          repellat laborum necessitatibus iste amet illum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. reiciendis vitae alias
          harum eos, molestias mollitia recusandae sed illum quidem
          necessitatibus quas? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam officia iste magnam quisquam. Assumenda esse
          quis cumque soluta voluptatem aperiam ullam, eveniet nam nulla
          repellat laborum necessitatibus iste amet illum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. reiciendis vitae alias
          harum eos, molestias mollitia recusandae sed illum quidem
          necessitatibus quas? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam officia iste magnam quisquam. Assumenda esse
          quis cumque soluta voluptatem aperiam ullam, eveniet nam nulla
          repellat laborum necessitatibus iste amet illum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          perferendis alias quisquam vitae voluptatem minima voluptatum, rem ad
          quas delectus sequi beatae aperiam accusamus. reiciendis vitae alias
          harum eos, molestias mollitia recusandae sed illum quidem
          necessitatibus quas? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam officia iste magnam quisquam. Assumenda esse
          quis cumque soluta voluptatem aperiam ullam, eveniet nam nulla
          repellat laborum necessitatibus iste amet illum?
        </p>
      </div>
      <Svg />
          <Slider slides={slides} />
          <Contact />
          <Up/>
    </>
  );
}

export default BlogPost;
