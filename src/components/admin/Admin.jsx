import React from "react";
import nextId from "react-id-generator";
import "../blog/blog.scss";
import "./admin.scss";
import "../apps/apps.scss";
import "../alumni/alumni.scss";
import Compressor from "compressorjs";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Post from "../blog/components/Post";
import App from "../apps/components/App";
import { useEffect } from "react";
import Persoana from "../alumni/components/AlumniPersoana";
import Generatie from "../alumni/components/Generatie";

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Admin() {
  const id = nextId();

  const [user] = useAuthState(auth);
  const signingoagle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const blogRef = firestore.collection("blog");
  const appsRef = firestore.collection("apps");
  const alumniRef = firestore.collection("alumni");
  const aniRef = firestore.collection("ani");
  const memRef = firestore.collection("team_member");
  const sponRef = firestore.collection("sponsors");

  const query = blogRef.orderBy("createAt", "desc");
  const query_app = appsRef.orderBy("createAt", "desc");
  const query_alumni = alumniRef.orderBy("createAt", "desc");
  const query_ani = aniRef.orderBy("createAt", "desc");
  const query_mem = memRef.orderBy("createAt", "desc");
  const query_spon = sponRef.orderBy("createAt", "desc");

  const [blog] = useCollectionData(query, { idField: "id" });
  const [apps] = useCollectionData(query_app, { idField: "id" });
  const [alumni] = useCollectionData(query_alumni, { idField: "id" });
  const [ani] = useCollectionData(query_ani, { idField: "id" });
  const [mem] = useCollectionData(query_mem, { idField: "id" });
  const [spon] = useCollectionData(query_spon, { idField: "id" });

  const [plaintext, setPlainText] = useState();
  const [titlu, setTitlu] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [imgs, setImgs] = useState();
  const [length, setL] = useState();

  const deleteblog = async (e) => {
    await blogRef

      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  const deleteapp = async (e) => {
    await appsRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };
  const delete_alumni = async (e) => {
    await alumniRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  const upload_blog = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      titlu,
      uid: uid,
      fb,
      insta,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let texts = plaintext.split("<next line>");

    for (
      let scapa_copiii_din_pivnita = 0;
      scapa_copiii_din_pivnita < length;
      scapa_copiii_din_pivnita++
    ) {
      try {
        added[`img${scapa_copiii_din_pivnita}`] =
          imgs[`img${scapa_copiii_din_pivnita}`];
      } catch (error) {
        alert(error);
        return;
      }
    }
    // for (
    //   let scapa_copiii_din_pivnita = 0;
    //   scapa_copiii_din_pivnita < texts.length;
    //   scapa_copiii_din_pivnita++
    // ) {
    //   try {
    //     if (texts[scapa_copiii_din_pivnita] != "")
    //       added[`text${scapa_copiii_din_pivnita}`] =
    //         texts[scapa_copiii_din_pivnita];
    //     else {
    //       alert("Nu ai introdus nici un text!");
    //       return;
    //     }
    //   } catch (error) {
    //     alert(error);
    //     return;
    //   }
    // }
    // if (imgs != []) {
    //   added.imgs = imgs;
    // } else {
    //   alert("Nu ai introdus nici un paragraf!");
    //   return;
    // }
    if (texts != []) {
      added.texts = texts;
    } else {
      alert("Nu ai introdus nici un paragraf!");
      return;
    }

    if (titlu == "") {
      alert("Nu ai introdus nici un titlu!");
      return;
    }
    if (fb == "") {
      alert("Nu ai introdus nici un link de facebook!");
      return;
    }
    if (insta == "") {
      alert("Nu ai introdus nici un link de insta!");
      return;
    }

    await blogRef
      .add(added)
      .then((res) => {
        alert("Postare adaugata");
      })
      .catch((err) => alert(err));
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const uploadimg = async (e) => {
    let obj = {};
    setL(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      new Compressor(file, {
        quality: 0.8,
        success: (compressedResult) => {
          getBase64(compressedResult)
            .then((result) => {
              // setImgs({ ...imgs, i: result });
              obj[`img${i}`] = result;
              setImgs(obj);
            })
            .catch((err) => {
              alert(err);
            });
        },
      });
    }
    // if (file.size * e.target.files.length > 1048487 / e.target.files.length) {
    //   alert("total img e prea mare si trb sa o schimbi")
    //   return
    // }
  };

  // -----------------APPS-------------------
  const [descriere, setDescriere] = useState("");
  const [cod_qr, setCodqr] = useState("");
  const [img, setImg] = useState("");
  const [titlu_app, setTitluApp] = useState("");
  const [link, setLink] = useState("");
  const [link_text, setLinkText] = useState("");

  const submit_app = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      titlu: titlu_app,
      uid: uid,
      descriere,
      link,
      link_text,
      cod_qr,
      img,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await appsRef
      .add(added)
      .then((res) => {
        alert("app adaugat");
      })
      .catch((err) => alert(err));
  };

  //----------------ALUMNI------------------
  const [anistate, setAni] = useState("");
  const [nume_alumni, setAlumninume] = useState("");
  const [detalii_alumni, setdetaliialumni] = useState("");
  const [poza_alumni, setPozealumni] = useState("");
  const [text_alumni, setTextalumni] = useState("");

  const upload_alumni = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      nume: nume_alumni,
      uid: uid,
      ani: anistate,
      detalii: detalii_alumni,
      poza: poza_alumni,
      text: text_alumni,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await alumniRef
      .add(added)
      .then((res) => {
        alert("alumni adaugat");
      })
      .catch((err) => alert(err));
  };
  //--------------ANI-------------
  const [ani_efectiv, setAniEfectiv] = useState("");

  const add_ani = async (e) => {
    e.preventDefault();
    let added = {
      ani: ani_efectiv,
      id,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await aniRef
      .add(added)
      .then((res) => {
        alert("ani adaugata");
      })
      .catch((err) => alert(err));
  };

  const delete_year = async (e) => {
    await aniRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  //--------------MEMBERS----------------
  const [ani_mem, setanimem] = useState("");
  const [nume_mem, setnumemem] = useState("");
  const [detalii_mem, setdetaliimem] = useState("");
  const [poza_mem, setpozamem] = useState("");

  const upload_mem = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    let added = {
      id,
      nume: nume_mem,
      uid: uid,
      ani: ani_mem,
      detalii: detalii_mem,
      poza: poza_mem,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await memRef
      .add(added)
      .then((res) => {
        alert("Postare adaugata");
      })
      .catch((err) => alert(err));
  };

  const delete_mem = async (e) => {
    await memRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  //--------------sponsori-------------
  const [logo, setlogo] = useState("");
  const upload_sponsor = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    let added = {
      id,
      uid,
      logo,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await sponRef
      .add(added)
      .then((res) => {
        alert("sponsor adaugat");
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="admin">
        {user && user.uid == "G41BaSVvR2P146qD7C1QJvg1XWR2" ? (
          <>
            <div className="logged">
              <div className="blogs_part">
                <div className="out">
                  <button
                    className="button"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
                <form onSubmit={upload_blog}>
                  <h1>FOR BLOG</h1>
                  <h4 className="info">Poti alege mai multe poze</h4>
                  <input
                    required
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => uploadimg(e)}
                  />
                  <h4 className="info">
                    Pentru a desparti textul in paragrafe adauga intre 2
                    paragrafe &lt;next line&gt; si de preferat sa aiba spatiu
                    intre ce este inainte si dupa{" "}
                  </h4>
                  <textarea
                    required
                    placeholder="paragrafe"
                    type="text"
                    onChange={(e) => {
                      setPlainText(e.target.value);
                    }}
                  />
                  <textarea
                    required
                    placeholder="titlu"
                    onChange={(e) => setTitlu(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de facebook precum:
                    https://m.facebook.com/story.php?story_fbid=888623485487024&id=100030181425201
                  </h4>
                  <input
                    type="url"
                    required
                    placeholder="fb"
                    onChange={(e) => setFb(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de instagram precum:
                    https://www.instagram.com/p/CmHTUnPN8ne/?igshid=YmMyMTA2M2Y=
                  </h4>
                  <input
                    type="url"
                    required
                    placeholder="insta"
                    onChange={(e) => setInsta(e.target.value)}
                  />
                  <button className="button" type="submit">
                    send
                  </button>
                </form>
                <br />
                <hr />
                <br />
                <div className="blog">
                  {blog &&
                    blog.map((bl) => {
                      const i = bl.id;

                      return (
                        <Post
                          deleted={() => deleteblog(bl.id)}
                          dalay={300}
                          data2={"fade-down"}
                          ajutor={true}
                          key={Math.random() * 92342423}
                          data="fade-right"
                          link={`/blog/${bl.id}`}
                          poza={bl.img0}
                          titlu={bl.titlu}
                          text_scurt={
                            bl.texts[0].length > 200
                              ? bl.texts[0].slice(0, 200) + " ..."
                              : bl.texts[0]
                          }
                        />
                      );
                    })}
                </div>
              </div>
              <div className="apps_part">
                <h1>FOR APPS</h1>
                <form onSubmit={submit_app}>
                  <h4 className="info">Set the img.</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setImg(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <h4 className="info">Set the Qr code</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.8,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setCodqr(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <input
                    type="url"
                    placeholder="link"
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="link text"
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                  <textarea
                    placeholder="descriere"
                    onChange={(e) => setDescriere(e.target.value)}
                  />
                  <textarea
                    placeholder="titlu"
                    onChange={(e) => setTitluApp(e.target.value)}
                  />
                  <button type="submit" className="button">
                    Submit
                  </button>
                </form>
                <br />
                <br />

                <div className="apps">
                  {apps &&
                    apps.map((app) => (
                      // <App
                      //   deleteapp={() => deleteapp(app.id)}
                      //   ajutor={true}
                      //   titlu={app.titlu}
                      //   codeQR={app.cod_qr}
                      //   img={app.img}
                      //   link={app.link}
                      //   p={app.descriere}
                      //   txt_link={app.link_text}
                      //   key={app.id}
                      // />
                      <>
                        <div className="app">
                          <div className="top">
                            <div className="img">
                              <img src={app.img} alt="" />
                            </div>
                            <div className="txt">
                              <div className="title">
                                <h1>{app.titlu}</h1>
                                <div className="linie"></div>
                              </div>
                              <div className="text">
                                <div className="linie_vert"></div>
                                <p>{app.descriere}</p>
                              </div>
                              <button
                                className="button"
                                style={{ width: "100%", margin: "30px 0" }}
                                onClick={() => deleteapp(app.id)}
                              >
                                delete app
                              </button>
                            </div>
                          </div>

                          <a href={app.link} target="_blank" className="button">
                            {app.link_text}
                          </a>
                          {app.cod_qr && (
                            <div className="qr_cont">
                              <img src={app.cod_qr} className="qr" alt="" />
                            </div>
                          )}
                          <div className="linie_sep"></div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <div className="ani_part">
                <br />
                <br />
                <br />
                <br />
                <br />
                <form onSubmit={add_ani}>
                  <input
                    type="text"
                    onChange={(e) => setAniEfectiv(e.target.value)}
                  />
                  <button type="submit">submit</button>
                </form>
                <br />
                <br />
                {ani &&
                  ani.map((an) => {
                    return (
                      <>
                        <div>
                          <h1>{an.ani}</h1>
                          <button onClick={() => delete_year(an.id)}>
                            delete year
                          </button>
                        </div>
                      </>
                    );
                  })}
                <br />
                <br />
              </div>
              <div className="alumni_part">
                <form onSubmit={upload_alumni}>
                  <select onChange={(e) => setAni(e.target.value)}>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    placeholder="nume"
                    onChange={(e) => setAlumninume(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="detalii"
                    onChange={(e) => setdetaliialumni(e.target.value)}
                  />
                  <textarea
                    placeholder="text"
                    onChange={(e) => setTextalumni(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setPozealumni(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <button type="submit">add alumni</button>
                </form>
                {ani &&
                  ani.map((ani) => (
                    <Generatie
                      no={true}
                      years={ani.ani}
                      team={false}
                      key={ani.id}
                      persoane={[
                        alumni &&
                          alumni.map((alumni) => {
                            if (alumni.ani == ani.ani)
                              return {
                                key: alumni.id,
                                no: true,
                                id: alumni.id,
                                delete_this: delete_alumni,
                                img: alumni.poza,
                                nume: alumni.nume,
                                faculta: alumni.detalii,
                                text: alumni.text,
                              };
                          }),
                      ]}
                    />
                  ))}
              </div>
              <div className="members_part">
                <h1>MEMBER</h1>
                <form onSubmit={upload_mem}>
                  <select onChange={(e) => setanimem(e.target.value)}>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    placeholder="nume"
                    onChange={(e) => setnumemem(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="detalii"
                    onChange={(e) => setdetaliimem(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setpozamem(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <button type="submit">add member</button>
                </form>
                {ani &&
                  ani.map((ani) => (
                    <Generatie
                      no={true}
                      years={ani.ani}
                      team={true}
                      key={ani.id}
                      persoane={[
                        mem &&
                          mem.map((alumni) => {
                            if (alumni.ani == ani.ani)
                              return {
                                key: alumni.id,
                                no: true,
                                id: alumni.id,
                                delete_this: delete_mem,
                                img: alumni.poza,
                                nume: alumni.nume,
                                faculta: alumni.detalii,
                              };
                          }),
                      ]}
                    />
                  ))}
              </div>
              <div className="sponsor_part">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    new Compressor(file, {
                      quality: 0.5,
                      success: (compressedResult) => {
                        getBase64(compressedResult)
                          .then((result) => {
                            setlogo(result);
                          })
                          .catch((err) => {
                            alert(err);
                            return;
                          });
                      },
                    });
                  }}
                />
                <form onSubmit={upload_sponsor}>
                  <button type="submit">add_sponsor</button>
                </form>
                <div className="sponsors">
                  {spon && spon.map((sp) => <img src={sp.logo} />)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login">
              <div className="title">
                <h1>
                  Pentru a avea acces pe aceasta pagina trebuie sa te loghezi cu
                  contul de google al echipei{" "}
                  <span style={{ color: "#6ef188" }}>Thobor</span>{" "}
                </h1>
                <div className="linie"></div>
              </div>
              {user && user.uid != "G41BaSVvR2P146qD7C1QJvg1XWR2" && (
                <h2 className="error_cont">
                  Contul selectat nu e cel al echipei de robotica Thobor
                </h2>
              )}
              <button className="button" onClick={signingoagle}>
                Sign in with google
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Admin;
