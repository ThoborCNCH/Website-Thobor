import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Firestore from "../../utils/Firestore";
import Placeholder from "../../utils/Placeholder";
import { LazyLoadImage } from "react-lazy-load-image-component";

const firestore = new Firestore();

function ShopPage() {
  const [mesajeContact, setMesajeContact] = useState([]);
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [loading_prod, setLoadingPrd] = useState(false);
  const getMesajeContact = async () => {
    firestore.readDocuments("contact").then((res) => {
      setMesajeContact(res);
    });
  };

  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    nume: "",
    descriere_scurta: "",
    descriere_lunga: "",
    info: "",
    date: "",
    old_pret: 0,
    pret: 0,
    rating: 0,
    reviews: [],
    categories: "",
    brand: "",
    cantitate: 0,
    images: [],
  });

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setProducts(await firestore.readDocuments("products"));
  };

  const getCategories = async () => {
    await firestore.readDocuments("categories").then((res) => {
      setCategories(res);
    });
  };

  useEffect(() => {
    getMesajeContact();
    getCategories();
    getProducts();
  }, []);
  const delete_rev = async (rev) => {
    await firestore.deleteRev({ rev, id: rev.id }).then((res) => {
      getProducts();
    });
  };

  const modifield = (field, e) => {
    setNewItem((old) => ({
      ...old,
      [field]: e,
    }));
  };

  const [images, setImages] = useState([]);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async () => {
    if (
      newItem.nume === "" ||
      newItem.cantitate.toString() === "NaN" ||
      newItem.categories === "" ||
      newItem.date === "" ||
      newItem.descriere_lunga === "" ||
      newItem.descriere_scurta === "" ||
      newItem.info === "" ||
      newItem.brand === "" ||
      newItem.pret.toString() === "NaN"
    ) {
      alert("completeaza toate campurile");
      return;
    } else {
      setLoadingPrd(true);
      const storage = getStorage();
      const downloadUrls = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const storageRef = ref(storage, `produse/${image.name}`);
        try {
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          downloadUrls.push(url);
        } catch (error) {
          alert(error)
        }
      }

      let idk = {
        ...newItem,
        images: downloadUrls,
      };

      await firestore
        .addItem("products", idk)
        .then((res) => {
          setLoadingPrd(false);
          getProducts();
          document.querySelectorAll(".addnewitem").forEach((input) => {
            input.value = "";
          });
          alert("Produs adaugat");
        })
        .catch((er) => {
          setLoadingPrd(false);
        });
    }
  };

  const [updateItem, setUpdateItem] = useState({
    nume: "",
    descriere_scurta: "",
    descriere_lunga: "",
    info: "",
    date: "",
    old_pret: 0,
    pret: 0,
    rating: 0,
    reviews: [],
    categories: "",
    cantitate: 0,
    images: [],
  });

  const updateF = (field, e) => {
    setUpdateItem((old) => ({
      ...old,
      [field]: e,
    }));
  };

  const [updateState, setUpdateState] = useState(false);
  const update = async (prod) => {
    setUpdateItem(prod);
    setUpdateState(true);
  };
  const updateFCT = async () => {
    let arr = updateItem.images.filter((ok) => typeof ok !== "string");
    updateItem.images.length -= arr.length;

    const storage = getStorage();
    const downloadUrls = [];

    for (let i = 0; i < arr.length; i++) {
      const image = arr[i];
      const storageRef = ref(storage, `produse/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        downloadUrls.push(url);
      } catch (error) {
        alert(error)
      }
    }
    let idk = {
      ...updateItem,
      images: updateItem.images.concat(downloadUrls),
    };


    await firestore.updateDocument("products", idk.id, idk).then((res) => {
      getProducts();
      alert("produs updatat");
    });
  };

  const deletef = async (id) => {
    await firestore.delete_all_from_cart(id);
    await firestore.deleteDocument("products", id).then((res) => {
      getProducts();
      alert("Produs sters!");
    });
  };

  const handleDelete = (indexToDelete) => {
    const updatedArray = updateItem.images.filter(
      (_, index) => index !== indexToDelete
    );
    setUpdateItem({ ...updateItem, images: updatedArray });
  };
  const handleAdd = (newElement) => {
    const updatedArray = [...updateItem.images, ...newElement];
    setUpdateItem({ ...updateItem, images: updatedArray });
  };

  const addimgs = (e) => {
    const files = Array.from(e.target.files);
    handleAdd(files);
  };

  const [cate, setcate] = useState("");
  const addc = async () => {
    await firestore
      .addItem("categories", {
        categorie: cate,
        date: Placeholder.getdate(),
      })
      .then((res) => {
        getCategories();
        alert("Categorie adaugata");
      });
  };
  const deletecat = async (id) => {
    await firestore.deleteDocument("categories", id).then((res) => {
      getCategories();
      alert("Categorie stearsa");
    });
  };

  const setLasts = async () => {
    await firestore
      .readDocuments("products", ["cantitate", "<=", 40])
      .then((res) => {
        setProducts(res);
      });
  };

  const [clasa, setClasa] = useState("fas fa-caret-right");
  const [h, setH] = useState("0");

  function more() {
    if (clasa === "fas fa-caret-up") {
      setClasa("fas fa-caret-right");
      setH("0");
    } else {
      setClasa("fas fa-caret-up");
      setH("auto");
    }
  }
  return (
    <div className="adminpage">
      <div className="shop_part">
        <div className="form">
          <h1>Shop</h1>
          <h4>Nume produs:</h4>
          <input
            required
            placeholder="Nume Produs"
            onChange={(e) => modifield("nume", e.target.value)}
          />
          <h4>Brand: </h4>
          <select required onChange={(e) => modifield("brand", e.target.value)}>
            <option value="samsung">Bratari de cauciuc</option>
            <option value="apple">Bratari textile</option>
            <option value="motorola">Brelocuri</option>
            <option value="xiaomi">Insigne</option>
          </select>

          <h4>Categorie:</h4>
          <select
            required
            onChange={(e) => modifield("categories", e.target.value)}
          >
            <option>Alege o caterogie</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.categorie} value={cat.categorie}>
                  {cat.categorie}
                </option>
              ))}
          </select>
          <h4>Pret:</h4>
          <input
            required
            type="number"
            onChange={(e) => modifield("pret", parseFloat(e.target.value))}
            placeholder="Pret de vanzare"
          />
          <h4>Pret vechi</h4>
          <input
            type="number"
            onChange={(e) => modifield("old_pret", Number(e.target.value))}
            placeholder="Pret anterior"
          />
          <h4>O descriere scurta a produsului: </h4>

          <textarea
            name=""
            required
            id=""
            onChange={(e) => modifield("descriere_scurta", e.target.value)}
            cols="30"
            rows="10"
            placeholder="Descriere scurta"
          ></textarea>
          <h4>O descriere mai lunga a produsului</h4>
          <textarea
            name=""
            required
            id=""
            onChange={(e) => modifield("descriere_lunga", e.target.value)}
            cols="30"
            rows="10"
            placeholder="Descriere lunga"
          ></textarea>
          <h4>Imagini produs:</h4>
          <h4 className="info">Poti adauga mai multe imagini</h4>
          <input
            type="file"
            required
            multiple
            onChange={handleFileInputChange}
          />
          <h4>Informatii generale despre produs</h4>
          <textarea
            onChange={(e) => modifield("info", e.target.value)}
            name=""
            required
            id=""
            cols="30"
            rows="10"
            placeholder="Informatii produs"
          ></textarea>
          <h4>Cantitate: </h4>
          <input
            type="number"
            required
            onChange={(e) => modifield("cantitate", parseFloat(e.target.value))}
            placeholder="cantitate"
          />
          <h4>Data: </h4>
          <input
            type="date"
            required
            onChange={(e) => modifield("date", e.target.value)}
            placeholder="date"
          />
          <button className="button" onClick={handleSubmit}>
            ADAUGA
          </button>
        </div>
        {updateState && (
          <section id="update" className="form">
            <h1>Update form:</h1>
            <h4>Numele produsului: </h4>
            <textarea
              placeholder="nume"
              onChange={(e) => updateF("nume", e.target.value)}
              cols="30"
              required
              rows="10"
              value={updateItem.nume}
            ></textarea>
            <h4>O descriere scurta</h4>
            <textarea
              required
              name=""
              id=""
              onChange={(e) => updateF("descriere_scurta", e.target.value)}
              cols="30"
              value={updateItem.descriere_scurta}
              rows="10"
              placeholder="descriere_scurta"
            ></textarea>
            <h4>O descriere lunga</h4>
            <textarea
              name=""
              id=""
              onChange={(e) => updateF("descriere_lunga", e.target.value)}
              value={updateItem.descriere_lunga}
              required
              cols="30"
              rows="10"
              placeholder="descriere_lunga"
            ></textarea>
            <h4>Informatii despre produs:</h4>
            <textarea
              onChange={(e) => updateF("info", e.target.value)}
              name=""
              value={updateItem.info}
              id=""
              required
              cols="30"
              rows="10"
              placeholder="info"
            ></textarea>
            <h4>Categorie: </h4>
            <select
              required
              onChange={(e) => updateF("categories", e.target.value)}
            >
              <option value={updateItem.categories}>Alege o caterogie</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat.categorie} value={cat.categorie}>
                    {cat.categorie}
                  </option>
                ))}
            </select>
            <h4>Pret: </h4>
            <input
              value={updateItem.pret}
              required
              type="number"
              onChange={(e) => updateF("pret", parseFloat(e.target.value))}
              placeholder="pret"
            />
            <h4>Pret vechi:</h4>
            <input
              value={updateItem.old_pret}
              type="number"
              onChange={(e) => updateF("old_pret", Number(e.target.value))}
              placeholder="old_pret"
            />
            <h4>Data:</h4>
            <input
              value={updateItem.date}
              required
              type="date"
              onChange={(e) => updateF("date", e.target.value)}
              placeholder="date"
            />
            <h4>Cantitate:</h4>
            <input
              type="number"
              value={updateItem.cantitate}
              required
              onChange={(e) => updateF("cantitate", parseFloat(e.target.value))}
              placeholder="cantitate"
            />
            <h4>Imagini</h4>
            <h4 className="info">Poti adauga sau sterge imagini</h4>
            <div>
              {updateItem.images &&
                updateItem.images.map((img, index) => {
                  const remake = (e) => {
                    return URL.createObjectURL(
                      new Blob([e], { type: "application/zip" })
                    );
                  };

                  if (img.slice(0, 5) === "https")
                    return (
                      <>
                        <div className="imgg">
                          <LazyLoadImage src={img} style={{ width: 100 }} width={100} height={"auto"} />
                          <button
                            className="delete"
                            onClick={() => handleDelete(index)}
                          >
                            delete img
                          </button>
                        </div>
                        <hr />
                      </>
                    );
                  else {
                    return (
                      <>
                        <div className="imgg">
                          <LazyLoadImage src={remake(img)} style={{ width: 100 }} width={100} height={"auto"} />
                          <button
                            className="delete"
                            onClick={() => handleDelete(index)}
                          >
                            delete img
                          </button>
                        </div>
                        <hr />
                      </>
                    );
                  }
                })}
              <h4>Adauga noi poze</h4>
              <input type="file" multiple onChange={addimgs} />
            </div>
            <button className="button" onClick={updateFCT}>
              update
            </button>
            <button
              className="button"
              onClick={() => {
                setUpdateState(false);
              }}
            >
              inchide form
            </button>
          </section>
        )}
        <div className="filters">
          <button onClick={setLasts}>
            Arata produsele cu cantitatea {"<"} 30{" "}
          </button>
          <button onClick={getProducts}>Arata toate produsele</button>
          <button
            onClick={async () => {
              await firestore.readDocuments("products").then((res) => {
                res.sort((a, b) => b.rating - a.rating);
                setProducts(res);
              });
            }}
          >
            Arata cele mai apreciate produse produsele
          </button>
        </div>

        <div className="stemText">
          <div className="more">
            <div className="press" onClick={more}>
              <i className={clasa}></i>
              <span id="STEM">
                Arată toate produsele {"("}
                {products && products.length}
                {")"}
              </span>
            </div>
            <div
              className="hide"
              style={{ height: h, transition: "0.5s ease-in-out" }}
            >
              <section className="prods" style={{ width: "100%" }}>
                <h1>Produse: </h1>
                {products &&
                  products.map((prod) => {
                    return (
                      <React.Fragment key={prod.id}>
                        <div className="prod">
                          <div className="buttons">
                            <a href="#update">
                              <button onClick={() => update(prod)}>
                                update produs
                              </button>
                            </a>
                            <button
                              className="delete"
                              onClick={() => deletef(prod.id)}
                            >
                              delete produs
                            </button>
                          </div>
                          <h2>nume produs: {prod.nume}</h2>
                          <h2>
                            Vezi produs:{" "}
                            <a href={`/prod/${prod.id}`} target="blank">
                              Link catre vizualizare produs
                            </a>
                          </h2>
                          <h2>data: {prod.date}</h2>
                          <h2>categorie: {prod.categories}</h2>
                          <h2>cantitate ramasa: {prod.cantitate}</h2>
                          <h2>pret: {Placeholder.makenumber(prod.pret)}</h2>
                          {prod.old_pret && prod.old_pret !== 0 && (
                            <h2>
                              pret vechi:{" "}
                              {Placeholder.makenumber(prod.old_pret)}
                            </h2>
                          )}
                          <div>
                            {prod.images &&
                              prod.images.map((img) => (
                                <LazyLoadImage
                                  src={img}
                                  key={img}
                                  width={100} height={"auto"} 
                                  style={{ width: 100, margin: 10 }}
                                />
                              ))}
                          </div>
                          <h2>rating: {prod.rating}</h2>
                          <p>Descriere scurta: {prod.descriere_scurta}</p>
                          <p>Descriere lunga: {prod.descriere_lunga}</p>
                          <p>Informatii: {prod.info}</p>
                          <h1>Reviews: </h1>
                          <div>
                            {prod && prod.reviews ? (
                              prod.reviews.map((rev, index) => {
                                return (
                                  <>
                                    <div className="review" key={index}>
                                      <div className="ups">
                                        {rev.user.img && (
                                          <LazyLoadImage
                                            src={rev.user.img}
                                            width={45} height={45} 
                                            alt="Image"
                                            style={{
                                              width: 45,
                                              borderRadius: "90%",
                                            }}
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
                                                      style={{
                                                        color: "#FFFF00",
                                                      }}
                                                      className="far fa-star"
                                                      key={index}
                                                    ></i>
                                                  ) : (
                                                    <i
                                                      className="fas fa-star"
                                                      style={{
                                                        color: "#FFFF00",
                                                      }}
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
                                      <button
                                        className="button"
                                        onClick={() => {
                                          delete_rev(rev);
                                        }}
                                      >
                                        Delete review
                                      </button>
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <h5>Nu sunt reviews pentru acest produs</h5>
                            )}
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
              </section>
            </div>
          </div>
        </div>

        <div className="form">
          <h4>Categorii</h4>
          <input type="text" onChange={(e) => setcate(e.target.value)} />
          <button className="button" onClick={addc}>
            add categorie
          </button>
        </div>
        <div className="cats">
          {categories &&
            categories.map((cat) => (
              <>
                <div key={cat.categorie}>
                  <h2> {cat.categorie}</h2>
                  <button className="delete" onClick={() => deletecat(cat.id)}>
                    delete categorie
                  </button>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
