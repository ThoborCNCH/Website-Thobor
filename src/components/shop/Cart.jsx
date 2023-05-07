import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Firestore from "../utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Text from "../utils/Text";
import Placeholder from "../utils/Placeholder";
import "./style/cart.scss";
import Up from "../utils/Up";
import Contact from "../utils/Contact";
import Svg from "../utils/Svg";
const firestore = new Firestore();

function Cart({ delete_prod_app, update, finish, fixCant }) {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [products, setP] = useState([]);
  const [total, setTotal] = useState(0);

  const updateObjectInArray = (array, objectToUpdate) => {
    const index = array.findIndex((obj) => obj.uid === objectToUpdate.uid);

    const updatedArray = [
      ...array.slice(0, index),
      objectToUpdate,
      ...array.slice(index + 1),
    ];

    return updatedArray;
  };
  const handleUpdateObject = (id, by) => {
    const objectToUpdate = products.find((obj) => obj.uid === id);

    if (objectToUpdate.cant + by <= 0) return;

    if (objectToUpdate) {
      if (objectToUpdate.cant + by <= objectToUpdate.cantitate) {
        objectToUpdate.cant = objectToUpdate.cant + by;
        setP(updateObjectInArray(products, objectToUpdate));
      } else {
        alert(
          `Numarul maxim de produse disponibile este ${objectToUpdate.cantitate}!`
        );
      }
    }
  };

  useEffect(() => {
    let totall = 0;
    products.map((p) => {
      totall += p.cant * p.pret;
    });
    setTotal(totall);

    if (totall > 1000) setShip(0);
    else setShip(50);
  }, [products]);
  const [hidden, setHidden] = useState([]);

  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };
  const ok = async () => {
    let resp = await firestore.getProductByUser(user);
    setP(resp.cant);
    setHidden([]);
    resp.cant.map((res) => {
      // console.log({ cant: res.cant, pret: res.pret, name: res.nume });
      setHidden((old) => [
        ...old,
        { id: res.id, cant: res.cant, pret: res.pret, name: res.nume },
      ]);
    });
  };
  useEffect(() => {
    ok();
    console.log(user);
  }, [user]);
  const form = useRef();

  const delete_prod = async (id, cant) => {
    delete_prod_app(id, cant);
    ok();
  };
  const navigate = useNavigate();

  const [ship, setShip] = useState(50);
  const sendEmail = async (e) => {
    e.preventDefault();
    let a = `<div>
    <h3>Products: </h3>
    <ul>`;
    hidden.map((h) => {
      a += `<li>  ${JSON.stringify(h.name)}: ${JSON.stringify(h.cant)} x 
       ${JSON.stringify(h.pret)} </li>`;
    });

    const {
      tel, adress, oras, zip
    } = form.current.elements;

    a += `</ul>
          <h2>Pret final: ${(total + ship).toLocaleString("en-US")}</h2>
          <h3>email: <span>${user.email}</span> </h3>
          <h4>nume: <span>${user.displayName}</span> </h4>
          <h4>tel: <span>${tel.value}</span></h4>
          <h4>adress: <span>${adress.value}</span></h4>
          <h4>oras: <span>${oras.value}</span></h4>
          <h4>zip: <span>${zip.value}</span></h4>
          <br/>
    </div>
    `;

    const templateParams = {
      template: a,
      name: user.displayName,
      email: user.email,
    };

    await emailjs
      .send(
        "service_vbtdick",
        "template_72rwiug",
        templateParams,
        "tA4vg3tHAqs4Dw-eP"
      )
      .then(
        async (result) => {
          console.log(result);
          if (result.status == 200) {
            alert("comanda plasata");
            await finish().then(async (res) => {
              await fixCant(hidden).then((res) => {
                navigate("/shop/all");
              });
            });
          } else {
            alert("a intervenit o problema la plasarea comenzii");
          }
        },
        (error) => {
          console.log(error.text);
          alert(error.text);
        }
      );
  };
  return (
    <>
      {" "}
      <div style={{ background: "#2f2f2f" }}>
        <img
          src={require("../../img/cart_banner.svg").default}
          alt=""
          className="header"
        />
      </div>
      <div className="cart">
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="cosul_blana">
            {!user ? (
              <tr>
                <td>
                  <h3>Logheaza te ca sa adaugi in cos produse</h3>
                </td>
              </tr>
            ) : products && products.length !== 0 ? (
              products.map((prod) => {
                let total_map = prod.pret * prod.cant;

                return (
                  <tr>
                    <td key={prod.id}>
                      <img src={Placeholder.makeimg(prod.images[0])} alt="" />
                      <Link to={`/prod/${prod.id}`}>
                        {Text.returnSizedText(prod.nume)}
                      </Link>
                    </td>
                    <td>
                      <span>{Placeholder.makenumber(prod.pret)} RON</span>
                    </td>
                    <td>
                      <div className="buttons">
                        <button
                          className="btn btn-sm btn-primary btn-minus"
                          onClick={() => handleUpdateObject(prod.uid, -1)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input type="number" value={prod.cant} min={1} />
                        <button onClick={() => handleUpdateObject(prod.uid, 1)}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                      <button
                        className="bbb"
                        onClick={() => update(prod.cant, prod.uid)}
                      >
                        <i className="fa fa-shopping-cart mr-1"></i>
                        Update Cart
                      </button>
                    </td>
                    <td>
                      <span>
                        {total_map ? Placeholder.makenumber(total_map) : "..."}{" "}
                        RON
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => delete_prod(prod.uid, prod.cant)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h3>Cosul este gol</h3>
            )}
          </tbody>
        </table>
      </div>
      <form ref={form} className="final" onSubmit={sendEmail}>
        <div className="form">
          <div className="row">
            <div className="input_group">
              <h4>Numar de telefon</h4>
              <input type="tel" name="tel" />
            </div>
            <div className="input_group">
              <h4>Adresa livrarii</h4>
              <input type="text" name="adress"  />
            </div>
          </div>
          <div className="row">
            <div className="input_group">
              <h4>Oraș</h4>
              <input type="text" name="oras" />
            </div>
            <div className="input_group">
              <h4>ZIP Code</h4>
              <input type="text" name="zip" />
            </div>
          </div>
          <small>
            <b> *Plata se face ramburs</b>
          </small>
        </div>
        <div className="rez">
          <div className="sum">
            <h5>Cart Summary </h5>
          </div>
          <div className="subsect">
            <div className="t">
              <h6>Subtotal</h6>
              <h6>{total ? Placeholder.makenumber(total) : "..."} RON</h6>
            </div>
            <div className="t">
              <h6>Shipping</h6>
              <h6>{Placeholder.makenumber(ship)} RON</h6>
            </div>
            <div className="linie"></div>
            <div className="t">
              <h6>Total</h6>
              <h6>
                {total ? Placeholder.makenumber(total + ship) : "..."} RON
              </h6>
            </div>
            {user && total ? (
              <button className="button" type="submit">
                <span>Proceed To Checkout</span>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
      <Svg/>
      <Contact/>
      <Up/>
    </>
  );
}

export default Cart;
