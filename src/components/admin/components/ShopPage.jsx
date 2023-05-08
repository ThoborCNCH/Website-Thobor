import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Placeholder from "../../utils/Placeholder";

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
          console.error(error);
        }
      }

      let idk = {
        ...newItem,
        images: downloadUrls,
      };

      // setNewItem((old) => ({
      // }));

      // console.log(downloadUrls, idk);
      // // console.log(newItem);

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
          console.log(er);
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
    // console.log(arr);
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
        console.error(error);
      }
    }
    // console.log(downloadUrls);
    let idk = {
      ...updateItem,
      images: updateItem.images.concat(downloadUrls),
    };

    // console.log(idk);

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
    // console.log(indexToDelete);
    const updatedArray = updateItem.images.filter(
      (_, index) => index !== indexToDelete
    );
    setUpdateItem({ ...updateItem, images: updatedArray });
  };
  const handleAdd = (newElement) => {
    const updatedArray = [...updateItem.images, ...newElement];
    // const updatedArray = [...updateItem.images, newElement];
    setUpdateItem({ ...updateItem, images: updatedArray });
    // console.log(updateItem.images);
  };

  const [file, setFile] = useState([]);
  function handleChange(e) {
    // console.log(e);
    e.map((file) => {
      setFile((old) => [...old, URL.createObjectURL(file)]);
    });
  }

  const addimgs = (e) => {
    const files = Array.from(e.target.files);
    // getImagesAsStrings(files, (error, imageStrings) => {
    //   handleAdd(imageStrings);
    // });
    // handleChange(files);
    handleAdd(files);
    handleChange(files);
  };
  const delete_mes = async (id) => {
    await firestore.deleteDocument("contact", id).then((res) => {
      getMesajeContact();
      alert("mesaj sters!");
    });
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
        console.log(res);
        setProducts(res);
      });
  };

  const checkAdmin = () => {
    if (user) {
      if (ids.includes(user.uid)) {
      } else {
        alert("Nu ai acces aici");
      }
    } else {
      alert("Logheaza te ca sa ai acces aici");
    }
  };
  const signingoagle = async () => {
    await firestore.signInWithGoogle();
  };

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
            <option value="samsung">samsung</option>
            <option value="apple">apple</option>
            <option value="motorola">motorola</option>
            <option value="xiaomi">xiaomi</option>
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
            onChange={(e) => modifield("old_pret", parseFloat(e.target.value))}
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
              onChange={(e) => updateF("old_pret", parseFloat(e.target.value))}
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
                  // if (typeof img === "string")
                  const remake = (e) => {
                    return URL.createObjectURL(
                      new Blob([e], { type: "application/zip" })
                    );
                  };

                  if (img.slice(0, 5) === "https")
                    return (
                      <>
                        <div className="imgg">
                          <img src={img} style={{ width: 100 }} />
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
                          <img src={remake(img)} style={{ width: 100 }} />
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
        <>
          <div style={{ margin: "0 30px" }}>
            <section className="prods">
              {updateState && (
                <section id="update">
                  <h1>Update form:</h1>
                  <textarea
                    placeholder="nume"
                    onChange={(e) => updateF("nume", e.target.value)}
                    cols="30"
                    required
                    rows="10"
                    value={updateItem.nume}
                  ></textarea>
                  <textarea
                    required
                    name=""
                    id=""
                    onChange={(e) =>
                      updateF("descriere_scurta", e.target.value)
                    }
                    cols="30"
                    value={updateItem.descriere_scurta}
                    rows="10"
                    placeholder="descriere_scurta"
                  ></textarea>
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
                  <select
                    required
                    onChange={(e) => updateF("categories", e.target.value)}
                  >
                    <option value={updateItem.categories}>
                      Alege o caterogie
                    </option>
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat.categorie} value={cat.categorie}>
                          {cat.categorie}
                        </option>
                      ))}
                  </select>
                  <input
                    value={updateItem.pret}
                    required
                    type="number"
                    onChange={(e) =>
                      updateF("pret", parseFloat(e.target.value))
                    }
                    placeholder="pret"
                  />
                  <input
                    value={updateItem.old_pret}
                    type="number"
                    onChange={(e) =>
                      updateF("old_pret", parseFloat(e.target.value))
                    }
                    placeholder="old_pret"
                  />
                  <input
                    value={updateItem.date}
                    required
                    type="date"
                    onChange={(e) => updateF("date", e.target.value)}
                    placeholder="date"
                  />
                  <input
                    type="number"
                    value={updateItem.cantitate}
                    required
                    onChange={(e) =>
                      updateF("cantitate", parseFloat(e.target.value))
                    }
                    placeholder="cantitate"
                  />

                  <div>
                    {updateItem.images &&
                      updateItem.images.map((img, index) => {
                        // if (typeof img === "string")
                        const remake = (e) => {
                          return URL.createObjectURL(
                            new Blob([e], { type: "application/zip" })
                          );
                        };

                        if (img.slice(0, 5) === "https")
                          return (
                            <>
                              <div>
                                <img src={img} style={{ width: 100 }} />
                                <button onClick={() => handleDelete(index)}>
                                  delete img
                                </button>
                              </div>
                              <hr />
                            </>
                          );
                        else {
                          return (
                            <>
                              <div>
                                <img src={remake(img)} style={{ width: 100 }} />
                                <button onClick={() => handleDelete(index)}>
                                  delete img
                                </button>
                              </div>
                              <hr />
                            </>
                          );
                        }
                      })}
                    <input type="file" multiple onChange={addimgs} />
                  </div>
                  <button onClick={updateFCT}>update</button>
                  <button
                    onClick={() => {
                      // // console.log(updateItem);
                      setUpdateState(false);
                    }}
                  >
                    inchide form
                  </button>
                </section>
              )}
              <hr />
              <br />
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
              <br />
              <h1>Produse: </h1>
              {products &&
                products.map((prod) => {
                  return (
                    <React.Fragment key={prod.id}>
                      <br />
                      <div style={{ margin: "0 20px" }}>
                        <div className="buttons">
                          <a href="#update">
                            <button onClick={() => update(prod)}>
                              update produs
                            </button>
                          </a>
                          <button onClick={() => deletef(prod.id)}>
                            delete produs
                          </button>
                        </div>
                        <h3>nume produs: {prod.nume}</h3>
                        <h4>
                          Vezi produs:{" "}
                          <a href={`/prod/${prod.id}`} target="blank">
                            Link catre vizualizare produs
                          </a>
                        </h4>
                        <h5>data: {prod.date}</h5>
                        <h5>categorie: {prod.categories}</h5>
                        <h5>cantitate ramasa: {prod.cantitate}</h5>
                        <h5>pret: {Placeholder.makenumber(prod.pret)}</h5>
                        {prod.old_pret && prod.old_pret !== 0 && (
                          <h5>
                            pret vechi: {Placeholder.makenumber(prod.old_pret)}
                          </h5>
                        )}
                        <div>
                          {prod.images &&
                            prod.images.map((img) => (
                              <img
                                src={img}
                                key={img}
                                style={{ width: 100, margin: 10 }}
                              />
                            ))}
                        </div>
                        <h5>rating: {prod.rating}</h5>
                        <p>Descriere scurta: {prod.descriere_scurta}</p>
                        <p>Descriere lunga: {prod.descriere_lunga}</p>
                        <p>Informatii: {prod.info}</p>
                        <h5>Reviews: </h5>
                        <div>
                          {prod && prod.reviews ? (
                            prod.reviews.map((rev, index) => {
                              return (
                                <>
                                  <div className="media mb-4" key={index}>
                                    {rev.user.img && (
                                      <img
                                        src={rev.user.img}
                                        alt="Image"
                                        className="img-fluid mr-3 mt-1"
                                        style={{
                                          width: 45,
                                          borderRadius: "90%",
                                        }}
                                      />
                                    )}
                                    <div className="media-body">
                                      <h6>
                                        {rev.user.nume}
                                        <small>
                                          {" "}
                                          - <i>{rev.date}</i>
                                        </small>
                                      </h6>
                                      <div className="text-primary mb-2">
                                        {[...Array(5)].map((e, index) => {
                                          return (
                                            <>
                                              {index >= rev.rating ? (
                                                <i
                                                  className="far fa-star"
                                                  key={index}
                                                ></i>
                                              ) : (
                                                <i
                                                  className="fas fa-star"
                                                  key={index}
                                                ></i>
                                              )}
                                            </>
                                          );
                                        })}
                                      </div>
                                      <p>{rev.review} </p>
                                      <>
                                        <button
                                          className="btn btn-primary px-3"
                                          onClick={() => {
                                            delete_rev(rev);
                                          }}
                                        >
                                          Delete review
                                        </button>
                                      </>
                                    </div>
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
          <br />
          <hr />
          <br />
          <div style={{ margin: "0 30px" }}>
            <h1>Mesaje: </h1>
            {mesajeContact &&
              mesajeContact.map((mes) => {
                return (
                  <>
                    <div key={mes.id}>
                      <h4>
                        {" "}
                        <b> {mes.nume}</b> -{" "}
                        <a href={`mailto: ${mes.email}`}>{mes.email}</a>{" "}
                      </h4>
                      <h5>
                        {" "}
                        <b>-</b>
                        {mes.subject} <b>-</b>
                      </h5>
                      <p>{mes.message}</p>
                      <button onClick={() => delete_mes(mes.id)}>
                        Delete mesaj
                      </button>
                    </div>
                    <hr />
                    <br />
                  </>
                );
              })}
          </div>
          <div style={{ margin: "0 30px" }}>
            <h1>Categorii: </h1>
            <input type="text" onChange={(e) => setcate(e.target.value)} />
            <button onClick={addc}>add categorie</button>
            <br />
            {categories &&
              categories.map((cat) => (
                <>
                  <div key={cat.categorie}>
                    <h3> {cat.categorie}</h3>
                    <button onClick={() => deletecat(cat.id)}>
                      delete categorie
                    </button>
                  </div>
                  <hr />
                  <br />
                  <br />
                </>
              ))}
          </div>
        </>
      </div>
    </div>
  );
}

export default ShopPage;
