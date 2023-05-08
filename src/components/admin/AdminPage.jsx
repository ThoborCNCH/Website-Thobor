import { getAuth } from "@firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Firestore from "../utils/Firestore";
import Placeholder from "../utils/Placeholder";
import "./admin.scss";

const firestore = new Firestore();
const auth = getAuth();

const ids = ["G41BaSVvR2P146qD7C1QJvg1XWR2", "16FCY5StAZUzmLfSZqWniuGs7lo1"];

function AdminPage() {
  const [mesajeContact, setMesajeContact] = useState([]);
  const [user, loading, error] = useAuthState(auth);
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
    <div className="admin">
      {loading ? (
        <h1>Se incarca</h1>
      ) : user ? (
        ids.includes(user.uid) ? (
          <>
            <div style={{ margin: "0 30px" }}>
              <section className="addSection">
                <div className="left">
                  <div className="numeProdus">
                    <div className="addTitle">Nume Produs</div>
                    <input
                      required
                      className="addnewitem"
                      placeholder="Nume Produs"
                      onChange={(e) => modifield("nume", e.target.value)}
                      // cols="30"
                      // rows="10"
                    ></input>
                    </div>
                    <div className="brandProdus">
                      <div>
                        <div>Brand</div>
                        <select
                        required
                        className="addnewitem"
                        onChange={(e) =>
                          modifield("brand", e.target.value)
                        }
                        >
                          <option value="samsung">samsung</option>
                          <option value="apple">apple</option>
                          <option value="motorola">motorola</option>
                          <option value="xiaomi">xiaomi</option>
                      </select>
                      </div>
                    </div>
                  <div className="categorieProdus">
                    <div>
                      <div className="addCategorie">Categorie</div>
                      <select
                        required
                        className="addnewitem"
                        onChange={(e) =>
                          modifield("categories", e.target.value)
                        }
                      >
                        <option>Alege o caterogie</option>
                        {categories &&
                          categories.map((cat) => (
                            <option key={cat.categorie} value={cat.categorie}>
                              {cat.categorie}
                            </option>
                          ))}
                      </select>
                    </div>
                    {/* <div className="categorii">
            {
              categories && categories.map((cat)=>{
                return (<div className="categ" { ...newItem[categories] === cat.categorie ? 'id="cetegSelected' : null} key={Math.random()} onClick={(e)=>{modifield("categories", e.target.value)}}>{cat.categorie}</div>)
              })
            }
          </div> */}
                    <div className="addPret">
                      <div>
                        <div>Pret</div>
                        <input
                          required
                          className="addnewitem"
                          type="number"
                          onChange={(e) =>
                            modifield("pret", parseFloat(e.target.value))
                          }
                          placeholder="Pret de vanzare"
                        />
                      </div>
                      <div>
                        <div>Pret anterior</div>
                        <input
                          type="number"
                          onChange={(e) =>
                            modifield("old_pret", parseFloat(e.target.value))
                          }
                          placeholder="Pret anterior"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="descriereProdus">
                    {/* <ReactQuill
            // value={content}
            onChange={(e) => modifield("descriere_scurta", e)}
            modules={modules}
            formats={formats}
          /> */}
                    <textarea
                      name=""
                      required
                      className="addnewitem"
                      id=""
                      onChange={(e) =>
                        modifield("descriere_scurta", e.target.value)
                      }
                      cols="30"
                      rows="10"
                      placeholder="Descriere scurta"
                    ></textarea>
                    <textarea
                      name=""
                      required
                      className="addnewitem"
                      id=""
                      onChange={(e) =>
                        modifield("descriere_lunga", e.target.value)
                      }
                      cols="30"
                      rows="10"
                      placeholder="Descriere lunga"
                    ></textarea>
                  </div>
                </div>
                <div className="right">
                  <div className="imagineProdus">
                    <div className="imagineTitle">Imagini Produs</div>
                    <input
                      type="file"
                      required
                      className="addnewitem"
                      multiple
                      onChange={handleFileInputChange}
                    />
                  </div>
                  <div className="informatieProdus">
                    <div className="informatieTitle">Informatii Produs</div>
                    <textarea
                      onChange={(e) => modifield("info", e.target.value)}
                      name=""
                      required
                      className="addnewitem"
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Informatii produs"
                    ></textarea>
                  </div>
                  <div className="cantitateProdus">
                    <div>
                      <div>Data Primire</div>
                      <input
                        type="date"
                        required
                        className="addnewitem"
                        onChange={(e) => modifield("date", e.target.value)}
                        placeholder="date"
                      />
                    </div>
                    <div>
                      <div>Cantitate Produs</div>
                      <input
                        type="number"
                        required
                        className="addnewitem"
                        onChange={(e) =>
                          modifield("cantitate", parseFloat(e.target.value))
                        }
                        placeholder="cantitate"
                      />
                    </div>
                  </div>
                  <div className="actiuniProdus">
                    {loading_prod ? (
                      <>
                        <span className="loader"></span>
                      </>
                    ) : (
                      <>
                        <button className="button-6" onClick={handleSubmit}>
                          ADAUGA
                        </button>
                        <button
                          className="button-6"
                          onClick={() => {
                            console.log(newItem);
                            console.log(newItem.cantitate.toString() === "NaN");
                            if (
                              newItem.nume === "" ||
                              newItem.cantitate.toString() === "NaN" ||
                              newItem.categories === "" ||
                              newItem.date === "" ||
                              newItem.descriere_lunga === "" ||
                              newItem.descriere_scurta === "" ||
                              newItem.info === "" ||
                              newItem.pret.toString() === "NaN"
                            ) {
                              alert("completeaza toate campurile");
                              return;
                            } else {
                              alert("ok");
                            }
                          }}
                        >
                          See
                        </button>
                      </>
                    )}{" "}
                  </div>
                </div>
              </section>
              <br />
              <br />
              <hr />
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
                      onChange={(e) =>
                        updateF("descriere_lunga", e.target.value)
                      }
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
                                  <img
                                    src={remake(img)}
                                    style={{ width: 100 }}
                                  />
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
                              pret vechi:{" "}
                              {Placeholder.makenumber(prod.old_pret)}
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
        ) : (
          <>
            <div className="login">
              <div className="title">
                <h1>Nu ai acces aici</h1>
                <div className="linie"></div>
              </div>
              <button className="button" onClick={signingoagle}>
                Sign in with google
              </button>
            </div>
          </>
        )
      ) : (
        <div className="login">
          <div className="title">
            <h1>Logheaza te ca sa ai acces aici</h1>
            <div className="linie"></div>
          </div>
          <button className="button" onClick={signingoagle}>
            Sign in with google
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
/*
 nume: '',
    descriere_scurta: '',
    descriere_lunga: '',
    info: '',
    date: firebase.database.ServerValue.TIMESTAMP,
    old_pret: 0,
    pret: 0,
    rating: 0,
    reviews: 0,
    categories: '',
    cantitate: 0


































                     /´¯¯/)
                   ,/¯   /
                   /    /
               /´¯/'  '/´¯¯`·¸
           /'/   /    /      /¨¯\
          ('(    ´   ´    ¯~/'  ')
           \              '     /
            \    \          _ ·´
             \              (
              \             \

















              

    */
