import React from "react";
import nextId from "react-id-generator";
import "../blog/blog.scss";
import "./admin.scss";
import "../apps/apps.scss";
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
  const query = blogRef.orderBy("createAt", "desc");
  const query_app = appsRef.orderBy("createAt", "desc");

  const [blog] = useCollectionData(query, { idField: "id" });
  const [apps] = useCollectionData(query_app, { idField: "id" });
  const [finalapp, setFinalapp] = useState([]);

  useEffect(() => {
    // apps && apps[0] && setFinalapp(apps[0]);
  }, [apps]);

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

    // bl_q.get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     console.log("si aici");
    //     doc.ref.delete();
    //   });
    // });
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

    // bl_q.get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     console.log("si aici");
    //     doc.ref.delete();
    //   });
    // });
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
    console.log(e.target.files.length);
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
