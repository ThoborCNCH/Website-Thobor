import React from "react";
import "./style/product_page.scss";
import Firestore from "../utils/Firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useEffect } from "react";
import Placeholder from "../utils/Placeholder";
import Text from "../utils/Text";
import { Link } from "react-router-dom";
// import "../blog/blog_post.scss";
import Up from "../utils/Up";
import Slider from "../blog/components/Slider";
import AOS from "aos";
import Contact from "../utils/Contact";
import Svg from "../utils/Svg";

const firestore = new Firestore();

function ProductPage({ addit }) {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [produs, setProdus] = useState();
  const [value, setValue] = useState(0);
  const [din_cos, setDinCos] = useState(0);

  const shareF = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(window.location.href)
    );
  };

  const shareI = () => {
    window.open(
      "https://www.instagram.com/share?url=" +
        encodeURIComponent(window.location.href)
    );
  };

  useEffect(() => {
    firestore.getProductById(id).then(async (res) => {
      setProdus(res);
      getAlso(res.categories);
    });
  }, []);

  const getcos = async () => {
    let prods = await firestore.getProductByUser(user);
    if (prods.length == 0) {
      return;
    } else {
      let okk = prods.cant.filter((prod) => id === prod.id);
      if (okk[0] && okk[0].hasOwnProperty("cant")) {
        setDinCos(okk[0].cant);
      }
    }
  };

  const modi = async (by) => {
    // await getcos();
    if ((value >= 0 && by > 0) || value >= 1)
      if (din_cos != 0) {
        if (produs.cantitate - din_cos - (value + by) >= 0)
          setValue((old) => old + by);
        else
          alert(
            `Numarul maxim de produse disponibile este ${produs.cantitate}!`
          );
      } else {
        if (produs.cantitate - (value + by) >= 0) setValue((old) => old + by);
        else
          alert(
            `Numarul maxim de produse disponibile este ${produs.cantitate}!`
          );
      }
  };
  const addit_prod = async (cant) => {
    if (cant == 0) return;

    if (din_cos == 0) {
      if (cant <= produs.cantitate) {
        addit(id, cant);
      }
    } else if (cant + din_cos <= produs.cantitate) {
      addit(id, cant);
    }

    document.querySelector(".kkkk").value = 0;
    setValue(0);
    await getcos();
  };
  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };

  const [review, setReview] = useState({
    rating: 0,
    review: "",
    user: {
      id: user && user.uid,
      img: user && user.photoURL,
      email: user && user.email,
      nume: user && user.displayName,
    },
    date: Placeholder.getdate(),
  });

  useEffect(() => {
    getcos();
    handlerev("user", {
      id: user && user.uid,
      img: user && user.photoURL,
      email: user && user.email,
      nume: user && user.displayName,
    });
  }, [user]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handlerev = (field, e) => {
    setReview((old) => ({
      ...old,
      [field]: e,
    }));
  };

  const [rated, setRated] = useState(-1);

  const rate = (stars) => {
    handlerev("rating", stars);
    setRated(stars);
    for (let i = 0; i < stars; i++) {
      document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
      document.querySelectorAll(".STEA_REV")[i].classList.remove("far");
      document.querySelectorAll(".STEA_REV")[i].classList.add("fas");
      document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
    }
    for (let i = stars; i < 5; i++) {
      document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
      document.querySelectorAll(".STEA_REV")[i].classList.remove("fas");
      document.querySelectorAll(".STEA_REV")[i].classList.add("far");
      document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
    }
  };

  const ratehover = (k) => {
    for (let i = 0; i < k; i++) {
      document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
      document.querySelectorAll(".STEA_REV")[i].classList.remove("far");
      document.querySelectorAll(".STEA_REV")[i].classList.add("fas");
      document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
    }
  };

  const notratehover = (k) => {
    if (rated == -1)
      for (let i = 0; i < k; i++) {
        document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
        document.querySelectorAll(".STEA_REV")[i].classList.remove("fas");
        document.querySelectorAll(".STEA_REV")[i].classList.add("far");
        document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
      }
    else {
      // console.log("rated: ", rated);
      for (let i = 0; i < rated; i++) {
        document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
        document.querySelectorAll(".STEA_REV")[i].classList.remove("far");
        document.querySelectorAll(".STEA_REV")[i].classList.add("fas");
        document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
      }
      for (let i = rated; i < k; i++) {
        document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
        document.querySelectorAll(".STEA_REV")[i].classList.remove("fas");
        document.querySelectorAll(".STEA_REV")[i].classList.add("far");
        document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
      }
    }
  };
  const leaverev = async () => {
    if (review.review === "" || review.rating === 0) alert("Lasa un review!");
    else
      await firestore.leaveRev(id, review).then((res) => {
        console.log(res);
        document.querySelector(".revinput").value = "";
        setRated(-1);
        for (let i = 0; i < 5; i++) {
          document.querySelectorAll(".STEA_REV")[i].classList.remove("fa-star");
          document.querySelectorAll(".STEA_REV")[i].classList.remove("fas");
          document.querySelectorAll(".STEA_REV")[i].classList.add("far");
          document.querySelectorAll(".STEA_REV")[i].classList.add("fa-star");
        }
        firestore.getProductById(id).then((res) => {
          setProdus(res);
        });
      });
  };

  const delete_rev = async (rev) => {
    // console.log(rev);
    await firestore.deleteRev({ rev, id }).then((res) => {
      firestore.getProductById(id).then((res) => {
        setProdus(res);
      });
    });
  };

  const [also, setAlso] = useState([]);
  const getAlso = async (cat) => {
    setAlso(
      await firestore.readDocuments("products", ["categories", "==", cat])
    );
    // console.log(also);
  };

  const tabs = (index) => {
    document.querySelectorAll(".but").forEach((pag, i) => {
      if (i == index) {
        if (!pag.classList.contains("active")) {
          pag.classList.add("active");
        }
      } else {
        pag.classList.remove("active");
      }
    });

    document.querySelectorAll(".pag").forEach((pag, i) => {
      if (i == index) {
        if (!pag.classList.contains("active")) {
          pag.classList.add("active");
        }
      } else {
        pag.classList.remove("active");
        // pag.classList.value = "pag";
      }
    });
  };
  return (
    <div className="page">
      <div style={{ background: "#2f2f2f" }}>
        <img
          src={require("../../img/shop_banner.svg").default}
          alt=""
          className="header"
        />
      </div>
      {produs && (
        <>
          <div className="top">
            <div className="title" data-aos="fade-left" data-aos-delay={200}>
              <h1 className="nume">{produs.nume}</h1>
              <div
                className="linie"
                data-aos="fade-down"
                data-aos-delay={300}
              ></div>
              <div className="rating">
                <span>
                  {produs &&
                    [...Array(5)].map((e, index) => {
                      const multiply = 200;
                      return (
                        <>
                          {index >= produs.rating ? (
                            //gol
                            <i
                              data-aos="fade-up"
                              className="far fa-star"
                              data-aos-delay={200 + (5 - index) * multiply}
                              style={{ color: "#FFFF00" }}
                              key={index}
                            ></i>
                          ) : index + 1 <= Math.floor(produs.rating) ? (
                            //plin
                            <i
                              data-aos="fade-up"
                              data-aos-delay={200 + (5 - index) * multiply}
                              style={{ color: "#FFFF00" }}
                              className="fas fa-star"
                              key={index}
                            ></i>
                          ) : (
                            //jumate
                            <i
                              data-aos-delay={200 + (5 - index) * multiply}
                              data-aos="fade-up"
                              style={{ color: "#FFFF00" }}
                              className="fas fa-star-half-alt"
                              key={index}
                            ></i>
                          )}
                        </>
                      );
                    })}
                  <small data-aos="fade-down-left" data-aos-delay={400}>
                    ({produs && Placeholder.roundit(produs.rating)})
                  </small>
                </span>
              </div>
            </div>
            <div className="pret" data-aos="zoom-in"data-aos-delay={450} data-aos-duration="2000">
              <h3>{produs && produs.pret} RON </h3>
            </div>
            <div className="scurt" data-aos="fade-right"data-aos-delay={450}>
              <p>{produs && produs.descriere_scurta}</p>
            </div>
            <div className="cant" data-aos="zoom-in-down"data-aos-delay={500}>
              <div className="u">
                <button onClick={() => modi(-1)}>
                  <i className="fa fa-minus"></i>
                </button>
                <input
                  type="number"
                  className="kkkk form-control bg-secondary border-0 text-center"
                  value={value}
                  max={produs && produs.cantitate}
                />
                <button onClick={() => modi(1)}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
              <div className="d">
                {user ? (
                  <button
                    className="button"
                    disabled={
                      produs && (produs.cantitate - din_cos <= 0 ? true : false)
                    }
                    onClick={() => addit_prod(value)}
                  >
                    <i className="fa fa-shopping-cart mr-1"></i>
                    <span>Add To Cart</span>
                  </button>
                ) : (
                  <h4
                    style={{
                      cursor: "pointer",
                      margin: "5px 20px",
                      color: "#FFD333",
                    }}
                    onClick={signInWithGoogle}
                  >
                    Login to add to cart
                  </h4>
                )}
              </div>
            </div>
            <div className="update">
              <p>
                {produs &&
                  (produs.cantitate - din_cos - value <= 0
                    ? "Nu a mai ramas nici un produs"
                    : `${produs.cantitate - din_cos - value} produse ramase`)}
              </p>
            </div>
            <div className="share">
              <strong className="sharetxt">Share on:</strong>
              <i className="fab fa-facebook-f" onClick={shareF}></i>
              <i className="fab fa-instagram" onClick={shareI}></i>
            </div>
            <div className="middle">
              {produs && produs.images && <Slider slides={produs.images} />}
            </div>
            <div className="tabs" id="tabss">
              <div className="buts">
                <div className="but" onClick={() => tabs(0)}>
                  <h3>Descriere</h3>
                </div>
                <div className="but " onClick={() => tabs(1)}>
                  <h3>Informatii</h3>
                </div>
                <div className="but active" onClick={() => tabs(2)}>
                  <h3>
                    Reviews ({produs && produs.reviews && produs.reviews.length}
                    )
                  </h3>
                </div>
              </div>
              <div className="pages">
                <div className="pag ">
                  <h2>
                    Descrierea produsului{" "}
                    <span>
                      <b> {produs.nume} </b>{" "}
                    </span>
                  </h2>
                  <p>{produs.descriere_lunga}</p>
                </div>
                <div className="pag">
                  <h2>
                    Informatiile produsului{" "}
                    <span>
                      <b> {produs.nume} </b>{" "}
                    </span>
                  </h2>
                  <p>{produs.info}</p>
                </div>
                <div className="pag active">
                  <div className="revs">
                    {produs && produs.reviews ? (
                      produs.reviews.map((rev, index) => {
                        return (
                          <>
                            <div className="review" key={index}>
                              <div className="ups">
                                {rev.user.img && (
                                  <img
                                    src={rev.user.img}
                                    alt="Image"
                                    style={{ width: 45, borderRadius: "90%" }}
                                  />
                                )}
                                <div className="body">
                                  <h2>
                                    {rev.user.nume}
                                    <small>
                                      {" "}
                                      - <i>{rev.date}</i>
                                    </small>
                                  </h2>
                                  <div className="stars">
                                    {[...Array(5)].map((e, index) => {
                                      return (
                                        <>
                                          {index >= rev.rating ? (
                                            <i
                                              style={{ color: "#FFFF00" }}
                                              className="far fa-star"
                                              key={index}
                                            ></i>
                                          ) : (
                                            <i
                                              className="fas fa-star"
                                              style={{ color: "#FFFF00" }}
                                              key={index}
                                            ></i>
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <p>{rev.review} </p>
                              {user && rev.user.id == user.uid && (
                                <>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      delete_rev(rev);
                                    }}
                                  >
                                    Delete review
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <h5>Nu sunt reviews pentru acest produs</h5>
                    )}
                  </div>
                  <div className="leave">
                    {user ? (
                      <>
                        <h4 className="mb-4">Leave a review</h4>
                        <p className="small">
                          You are commenting as{" "}
                          <span>
                            {" "}
                            <b> {user.displayName}</b>
                          </span>
                          <br />
                        </p>{" "}
                        <p className="small">Required fields are marked *</p>
                        <div className="leave_rating">
                          <h2 className="your">Your Rating * :</h2>
                          <div className="start">
                            <i
                              style={{ cursor: "pointer", color: "#FFFF00" }}
                              className="far fa-star STEA_REV"
                              onMouseEnter={() => ratehover(1)}
                              onMouseLeave={() => notratehover(1)}
                              onClick={() => rate(1)}
                            ></i>
                            <i
                              style={{ cursor: "pointer", color: "#FFFF00" }}
                              onClick={() => rate(2)}
                              className="far fa-star STEA_REV"
                              onMouseEnter={() => ratehover(2)}
                              onMouseLeave={() => notratehover(2)}
                            ></i>
                            <i
                              style={{ cursor: "pointer", color: "#FFFF00" }}
                              onClick={() => rate(3)}
                              className="far fa-star STEA_REV"
                              onMouseEnter={() => ratehover(3)}
                              onMouseLeave={() => notratehover(3)}
                            ></i>
                            <i
                              className="far fa-star STEA_REV"
                              onClick={() => rate(4)}
                              style={{ cursor: "pointer", color: "#FFFF00" }}
                              onMouseEnter={() => ratehover(4)}
                              onMouseLeave={() => notratehover(4)}
                            ></i>
                            <i
                              className="far fa-star STEA_REV"
                              onClick={() => rate(5)}
                              style={{ cursor: "pointer", color: "#FFFF00" }}
                              onMouseEnter={() => ratehover(5)}
                              onMouseLeave={() => notratehover(5)}
                            ></i>
                          </div>
                        </div>
                        <div className="rev">
                          <div className="revv">
                            <label htmlFor="message">Your Review *</label>
                            <textarea
                              id="message"
                              required
                              placeholder="Scrie un review"
                              className="revinput"
                              onChange={(e) =>
                                handlerev("review", e.target.value)
                              }
                            ></textarea>
                          </div>

                          <button className="button" onClick={leaverev}>
                            Leave Your Review
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>Logheaza te pentru a lasa un review</h4>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Svg />
      <Contact />
      <Up />
    </div>
  );
}

export default ProductPage;
