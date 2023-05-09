import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Firestore from "../utils/Firestore";
import Text from "../utils/Text";
import Up from "../utils/Up";
import Product from "./components/Product";
import "./shop.scss";
let arr = [];
const firestore = new Firestore();
let filters = [];
let local_filters = [];
let filter_arr = {
  "0-100": [
    ["pret", ">=", 0],
    ["pret", "<=", 100],
  ],
  "100-200": [
    ["pret", ">=", 100],
    ["pret", "<=", 200],
  ],
  "200-300": [
    ["pret", ">=", 200],
    ["pret", "<=", 300],
  ],
  "300-400": [
    ["pret", ">=", 300],
    ["pret", "<=", 400],
  ],
  "400-500": [
    ["pret", ">=", 400],
    ["pret", "<=", 500],
  ],
  "over-500": [["pret", ">=", 500]],
  "is-Discount": [["old_pret", ">", 0]],
  "5-rating": [["rating", "==", 5]],
  "4-rating": [
    ["rating", ">=", 4],
    ["rating", "<", 5],
  ],
  "3-rating": [
    ["rating", ">=", 3],
    ["rating", "<", 4],
  ],
  "2-rating": [
    ["rating", ">=", 2],
    ["rating", "<", 3],
  ],
  "1-rating": [
    ["rating", ">=", 1],
    ["rating", "<", 2],
  ],
  samsung: [["brand", "==", "samsung"]],
  apple: [["brand", "==", "apple"]],
  xiaomi: [["brand", "==", "xiaomi"]],
  motorola: [["brand", "==", "motorola"]],
};

function Shop({ addit, cos }) {
  const { categorie, sort_param } = useParams();
  let [products, setProducts] = useState([]);
  const [filter_map, setf] = useState([]);
  let [catt, setCatt] = useState(["categories", "==", categorie]);
  
  useEffect(() => {
    getCategorii();
    setf(Object.entries(filter_arr));
    if (
      localStorage.getItem("local_filters") &&
      localStorage.getItem("local_filters") !== "[]"
    ) {
      local_filters = JSON.parse(localStorage.getItem("local_filters"));
    }
    if (
      localStorage.getItem("filters") &&
      localStorage.getItem("filters") !== "[]"
    ) {
      filters = JSON.parse(localStorage.getItem("filters"));
    }
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (categorie == "reducere") catt = ["old_pret", ">", 0];
    else catt = ["categories", "==", categorie];
  }, [catt, categorie]);
  
  useEffect(() => {
    if (categorie == "reducere") {
      catt = ["old_pret", ">", 0];
    } else catt = ["categories", "==", categorie];
    if (categorie.includes("search")) {
      firestore
        .readDocuments("products", ["nume", [], categorie])
        .then(async (res) => {
          if (
            localStorage.getItem("filters") &&
            localStorage.getItem("filters") !== "[]"
          ) {
            filters = JSON.parse(localStorage.getItem("filters"));
            res = await updateFilters(res, filters);
          }
          if (sort_param) {
            sort(res, sort_param);
          }
          arr = res;
          setProducts((old) => (old = res));
        });
    } else {
      firestore.readDocuments("products", catt).then(async (res) => {
        if (
          localStorage.getItem("filters") &&
          localStorage.getItem("filters") !== "[]"
        ) {
          filters = JSON.parse(localStorage.getItem("filters"));
          res = await updateFilters(res, filters);
        }
        if (sort_param) {
          sort(res, sort_param);
        }
        arr = res;
        setProducts((old) => (old = res));
      });
    }
  }, [categorie, sort_param]);
 
  const sort = async (arr, cat, nope) => {
    switch (cat) {
      case "pc":
        arr.sort((a, b) => a.pret - b.pret);
        break;
      case "pd":
        arr.sort((a, b) => b.pret - a.pret);
        break;
      case "dd":
        arr.sort(
          (a, b) =>
            calculatedisc(b.old_pret, b.pret) -
            calculatedisc(a.old_pret, a.pret)
        );
        break;
      case "rc":
        arr.sort((a, b) => b.rating - a.rating);
        break;
      case "rd":
        arr.sort((a, b) => b.reviews.length - a.reviews.length);
        break;
      case "mn":
        arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        break;
    }
    if (nope !== "ok") setProducts((old) => [...arr]);
  };

  const updateFilters = async (arr, filters) => {
    await firestore.filter(arr, filters).then((res) => {
      arr = res;
    });
    return arr;
  };

  const addFilter = async (e, id) => {
    const check = e.target.checked;
    if (check) {
      filters = [...filters, { [id]: filter_arr[id] }];
      local_filters = [...local_filters, id];
    } else {
      filters = filters.filter((f) => !compareArrays(f[id], filter_arr[id]));
      local_filters = local_filters.filter((f) => f !== id);
      localStorage.setItem("filters", JSON.stringify(filters));
      if (categorie == "reducere") catt = ["old_pret", ">", 0];
      else catt = ["categories", "==", categorie];
      if (categorie.includes("search")) {
        await firestore
          .readDocuments("products", ["nume", [], categorie])
          .then(async (res) => {
            if (sort_param) {
              sort(res, sort_param);
            }
            res = await updateFilters(res, filters);
            setProducts((old) => (old = res));
          });
      } else
        await firestore.readDocuments("products", catt).then(async (res) => {
          if (sort_param) {
            sort(res, sort_param);
          }
          res = await updateFilters(res, filters);
          setProducts((old) => (old = res));
          products = res;
        });
    }
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("local_filters", JSON.stringify(local_filters));
    const rasp = await updateFilters(products, filters);
    if (rasp !== false) {
      if (sort_param) {
        sort(rasp, sort_param, "ok");
      }
      setProducts((old) => (old = rasp));
    } else {
      if (categorie == "reducere") catt = ["old_pret", ">", 0];
      else catt = ["categories", "==", categorie];
      await firestore.readDocuments("products", catt).then(async (res) => {
        if (sort_param) {
          sort(res, sort_param);
        }
        arr = res;
        setProducts((old) => (old = res));
      });
    }
  };

  const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const reset = async () => {
    document.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.checked = false;
    });
    filters = [];
    local_filters = [];
    if (localStorage.getItem("local_filters")) {
      localStorage.setItem("local_filters", "[]");
    }
    if (localStorage.getItem("filters")) {
      localStorage.setItem("filters", "[]");
    }
    if (categorie == "reducere") catt = ["old_pret", ">", 0];
    else catt = ["categories", "==", categorie];
    await firestore.readDocuments("products", catt).then(async (res) => {
      if (sort_param) {
        sort(res, sort_param);
      }
      arr = res;
      setProducts((old) => (old = res));
    });
  };

  const calculatedisc = (oldPrice, price) => {
    return ((oldPrice - price) / oldPrice) * 100;
  };

  const [categorii, setCategorii] = useState([]);
 
  const getCategorii = async () => {
    await firestore.readDocuments("categories").then((res) => {
      setCategorii(res);
    });
  };

  const show = (id) => {
    const drop = document.querySelector(`#${id} + div`);
    if (drop.classList.contains("show")) {
      drop.classList.remove("show");
    } else {
      drop.classList.add("show");
    }
  };
  
  return (
    <>
      <div style={{ background: "#2f2f2f" }}>
        <img
          src={require("../../img/shop_banner.svg").default}
          alt=""
          className="header"
        />
      </div>
      <div id="tops"></div>
      <div className="shop">
        <div className="top">
          <div className="left">
            <div className="categorii">
              <div className="main" id="cat" onClick={() => show("cat")}>
                <h4>Categorii</h4>
                <i className="fas fa-caret-down"></i>
              </div>
              <div className="drop">
                <HashLink to={`/shop/all/#tops`}>Toate Produsele</HashLink>
                {categorii &&
                  categorii.map((cat) => {
                    return (
                      <HashLink to={`/shop/${cat.categorie}/#tops`}>
                        {cat.categorie}
                      </HashLink>
                    );
                  })}
              </div>
            </div>
            <div className="sort">
              <div className="main" id="sorts" onClick={() => show("sorts")}>
                <h4>Sort</h4>
                <i className="fas fa-caret-down"></i>
              </div>
              <div className="drop">
                <HashLink to={`/shop/${categorie}/#tops`}>
                  Fara sortare
                </HashLink>
                <HashLink to={`/shop/${categorie}/pc/#tops`}>
                  Pret - crescator
                </HashLink>
                <HashLink to={`/shop/${categorie}/pd/#tops`}>
                  Pret - descrescator
                </HashLink>
                <HashLink to={`/shop/${categorie}/rc/#tops`}>
                  Cele mai populare
                </HashLink>
                <HashLink to={`/shop/${categorie}/dd/#tops`}>
                  Discount %
                </HashLink>
                <HashLink to={`/shop/${categorie}/rd/#tops`}>
                  Cele mai multe reviews
                </HashLink>
                <HashLink to={`/shop/${categorie}/mn/#tops`}>
                  Cele mai noi
                </HashLink>
              </div>
            </div>
          </div>
          <div className="right">
            <Link to="/cart">
              <i className="fas fa-shopping-cart text-primary"></i>
              <div className="nr">
                <h6>{cos ? cos : 0}</h6>
              </div>
              <span>Cart </span>
            </Link>
          </div>
        </div>
        <div className="down">
          <div className="left">
            <button className="button" onClick={reset}>
              Reset all filters
            </button>
            <div className="group">
              <h2>Filter by price</h2>
              <div className="filters_group">
                {filter_map.map((filter, index) => {
                  let ar = filter[0].split("-");
                  return (
                    index <= 6 && (
                      <div className="input_group">
                        <input
                          checked={
                            local_filters.find((id) => id == filter[0])
                              ? true
                              : false
                          }
                          type="checkbox"
                          onChange={(e) => addFilter(e, filter[0])}
                          id={`price-${index}`}
                        />
                        <label htmlFor={`price-${index}`}>
                          {index <= 5
                            ? (ar[0] === "over" ? "> " : ar[0] + " - ") +
                              ar[1] +
                              " RON"
                            : index == 6 && <>Discount</>}
                        </label>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            <div className="group">
              <h2>Filter by rating</h2>
              <div className="filters_group">
                {filter_map.map((filter, index) => {
                  let ar = filter[0].split("-");
                  return (
                    index > 6 &&
                    index <= 11 && (
                      <div className="input_group">
                        <input
                          checked={
                            local_filters.find((id) => id == filter[0])
                              ? true
                              : false
                          }
                          type="checkbox"
                          onChange={(e) => addFilter(e, filter[0])}
                          id={`disc-${index}`}
                        />
                        <label htmlFor={`disc-${index}`}>
                          {[...Array(parseInt(ar[0], 10))].map((a, index) => {
                            return (
                              <i
                                className="fas fa-star text-primary mr-1"
                                key={index}
                                style={{ color: "#FFFF00" }}
                              ></i>
                            );
                          })}
                        </label>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            <div className="group">
              <h2>Filter by brand</h2>
              <div className="filters_group">
                {filter_map.map((filter, index) => {
                  let ar = filter[0].split("-");
                  return (
                    index > 11 && (
                      <div className="input_group">
                        <input
                          checked={
                            local_filters.find((id) => id == filter[0])
                              ? true
                              : false
                          }
                          type="checkbox"
                          onChange={(e) => addFilter(e, filter[0])}
                          id={`brand-${index}`}
                        />
                        <label htmlFor={`brand-${index}`}>{ar[0]}</label>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <div className="right">
            {products &&
              products.map((prod) => {
                return (
                  <Product
                    dalay={0}
                    data2={"fade-down"}
                    key={Math.random() * 92342423}
                    data="fade-right"
                    link={`/prod/${prod.id}`}
                    poza={prod.images[0]}
                    titlu={prod.nume}
                    text_scurt={Text.returnSizedText(prod.descriere_scurta)}
                    price={prod.pret}
                    oldPrice={prod.old_pret}
                    rating={prod.rating}
                    addit={addit}
                    cantitate={prod.cantitate}
                    id={prod.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Up />
    </>
  );
}
export default Shop;
