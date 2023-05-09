import AOS from "aos";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Firestore from "../../utils/Firestore";
import Placeholder from "../../utils/Placeholder";
import "../style/product.scss";
import post_card_img from "../../../img/post_card_img.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const firestore = new Firestore();

function Product({
  poza,
  titlu,
  link,
  data,
  data2,
  dalay,
  id,
  text_scurt,
  price,
  oldPrice,
  rating,
}) {
  useEffect(() => {
    AOS.init();
  }, []);

  const [user, loading, error] = useAuthState(firestore.getuser());
  const [din_cos, setDinCos] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getcos();
  }, [count, user]);

  const getcos = async () => {
    let prods = await firestore.getProductByUser(user);
    if (prods.cant) {
      prods.cant = prods.cant.filter((prod) => id === prod.id);
      if (prods.cant[0] !== undefined) {
        setDinCos(prods.cant[0].cant);
      } else return;
    }
  };

  return (
    <>
      <div className="post" data-aos={data}>
        {oldPrice > 0 && (
          <div className="offer">
            <span>
              -
              {Placeholder.makenumber(
                Placeholder.roundit(((oldPrice - price) / oldPrice) * 100, 1)
              )}
            </span>
          </div>
        )}
        <div className="img">
          <LazyLoadImage src={poza} className="poza_main" />
          <LazyLoadImage src={post_card_img} className="svg" />
        </div>
        <div className="text">
          <div className="title">
            <h2 data-aos={data2}>{titlu}</h2>
            <div data-aos={data} className="linie"></div>
          </div>
          <div className="para" data-aos={data2}>
            <div className="linie_vert" data-aos={data2}></div>
            <p data-aos={data}>{text_scurt}</p>
          </div>
          <div className="price">
            <h5 data-aos={data2}>{Placeholder.makenumber(price)} RON</h5>
            {oldPrice > 0 && (
              <h6 data-aos={data}>
                <del>{Placeholder.makenumber(oldPrice)} RON</del>
              </h6>
            )}
          </div>
          <div className="rating">
            {[...Array(5)].map((e, index) => {
              const multiply = 200;
              return (
                <>
                  {index >= rating ? (
                    //gol
                    <i
                      data-aos={data2}
                      data-aos-offset={"-20"}
                      data-aos-delay={dalay + (5 - index) * multiply}
                      style={{ color: "#FFFF00" }}
                      className="far fa-star text-primary mr-1"
                      key={index}
                    ></i>
                  ) : index + 1 <= Math.floor(rating) ? (
                    //plin
                    <i
                      style={{ color: "#FFFF00" }}
                      data-aos={data2}
                      data-aos-offset={"-20"}
                      data-aos-delay={dalay + (5 - index) * multiply}
                      className="fas fa-star text-primary mr-1"
                      key={index}
                    ></i>
                  ) : (
                    //jumate
                    <i
                      style={{ color: "#FFFF00" }}
                      data-aos={data2}
                      data-aos-offset={"-20"}
                      data-aos-delay={dalay + (5 - index) * multiply}
                      className="fas fa-star-half-alt text-primary mr-1"
                      key={index}
                    ></i>
                  )}
                </>
              );
            })}
          </div>
          <a href={link} className="link">
            <div className="coca"></div>
            <span>
              Citeste mai multe <i className="fas fa-caret-right"></i>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Product;
