import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react";
import "../alumni/alumni.scss";
import "../apps/apps.scss";
import "../blog/blog.scss";
import "../sponsors/sponsors.scss";
import "./admin.scss";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../blog/components/Post";

import { useEffect } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import Card from "../home/components/Card";
import Firestore from "../utils/Firestore";
import Placeholder from "../utils/Placeholder";

const firestore = new Firestore();
var ad = {};

function Admin() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [blogindex, setBlogIndex] = useState(0);

  const signingoagle = async () => {
    await firestore.signInWithGoogle();
  };
  const logout = async () => {
    await firestore.logout();
  };

  const [plaintext, setPlainText] = useState();
  const [titlu, setTitlu] = useState("jkadbs");
  const [fb, setFb] = useState("asdasdas");
  const [insta, setInsta] = useState("asdasdasd");
  const [imgs, setImgs] = useState();
  const [length, setL] = useState();
  const [bl_img, setblimg] = useState([]);

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    getAlumni();
    getApps();
    getAni();
    getMemebers();
    getPremii();
    getSponsori();
  }, []);

  useEffect(() => {
    getBlog();
  }, [blogindex]);

  const getBlog = async () => {
    await firestore.readDocuments("blog").then((res) => {
      setBlog((old) => (old = res));
    });
  };

  const deleteblog = async (e) => {
    await firestore.deleteDocument("blog", e).then(async (res) => {
      alert("sters cu succes");
      setBlogIndex((old) => old + 1);
      await getBlog();
    });
  };

  const [urls, setUrls] = useState([]);

  const [images, setImages] = useState([]);

  const [loadingg, setloadingg] = useState(false);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const upload_blog = async () => {
    const uid = user.uid;
    let added = {
      titlu,
      uid: uid,
      fb,
      insta,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let texts = plaintext.split("<next line>");
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

    const storage = getStorage();
    let downloadUrls = [];
    console.log(images.length);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const storageRef = ref(storage, `blog/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        downloadUrls.push(url);
        console.log(downloadUrls, url);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(downloadUrls);
    let idk = {
      ...added,
      images: downloadUrls,
    };
    // urls && (ad = { ...ad, ...added });
    console.log(idk);
    await firestore
      .addItem("blog", idk)
      .then((res) => {
        alert("Postare adaugata");
        setBlogIndex((old) => old + 1);
        setPlainText("");
        setTitlu("");
        setFb("");
        setInsta("");
        setImgs();
        setL();
      })
      .catch((er) => {
        console.log(er);
      });
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

  // -----------------APPS--asa face si ficatul-----------------
  const [descriere, setDescriere] = useState("");
  const [cod_qr, setCodqr] = useState();
  const [cod_qr_links, setCodqrlinks] = useState("");
  const [img, setImg] = useState();
  const [imglinks, setImgLinks] = useState("");
  const [titlu_app, setTitluApp] = useState("");
  const [link, setLink] = useState("");
  const [link_text, setLinkText] = useState("");
  const [loadingg_apps, setloadinggApps] = useState(false);

  const [apps, setApps] = useState([]);

  const getApps = async () => {
    firestore.readDocuments("apps").then((res) => {
      setApps((old) => (old = res));
    });
  };

  const submit_app = async () => {
    const { uid } = user;

    let ar = [cod_qr, img];

    let object = {
      titlu: titlu_app,
      uid: uid,
      descriere,
      link,
      link_text,
      cod_qr: cod_qr_links,
      img: imglinks,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const storage = getStorage();
    setloadinggApps(true);
    for (let i = 0; i < ar.length; i++) {
      const image = ar[i];
      const storageRef = ref(storage, `apps/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        if (i == 0) {
          object.img = url;
        } else {
          object.cod_qr = url;
        }
      } catch (error) {
        console.error(error);
      }
    }

    await firestore.addItem("apps", object).then(async (res) => {
      alert("app adaugat");
      getApps();
      setloadinggApps(false);
    });
  };

  const deleteapp = async (e) => {
    await firestore.deleteDocument("apps", e).then(async (res) => {
      alert("sters cu succes");
      await getApps();
    });
  };

  // cumpar opel

  //----------------ALUMNI------------------
  const [anistate, setAni] = useState("");
  const [nume_alumni, setAlumninume] = useState("");
  const [detalii_alumni, setdetaliialumni] = useState("");
  const [poza_alumni, setPozealumni] = useState();
  const [text_alumni, setTextalumni] = useState("");
  const [loadingg_alumni, SetloadinggAlumni] = useState(false);
  const [al_img_link, setTpLINK] = useState("");
  const promises_al = [];

  const [alumni, setAlumni] = useState([]);
  const getAlumni = async () => {
    await firestore.readDocuments("alumni").then((res) => {
      setAlumni(res);
    });
  };

  const upload_alumni = async () => {
    const { uid } = user;
    let added = {
      nume: nume_alumni,
      uid: uid,
      ani: anistate,
      detalii: detalii_alumni,
      text: text_alumni,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    SetloadinggAlumni(true);
    const storage = getStorage();

    const storageRef = ref(storage, `alumni/${poza_alumni.name}`);
    try {
      await uploadBytes(storageRef, poza_alumni);
      const url = await getDownloadURL(storageRef);
      added.poza = url;
    } catch (error) {
      console.error(error);
    }

    await firestore
      .addItem("alumni", added)
      .then(async (res) => {
        alert("alumni adaugat");
        SetloadinggAlumni(false);
        setAni("Alege un an");
        await getAlumni();
      })
      .catch((err) => alert(err));
  };

  //--------------ANI-------------
  const [ani_efectiv, setAniEfectiv] = useState("");
  const [dd, setdd] = useState("");

  const [ani, setAnis] = useState([]);
  
  const getAni = async () => {
    await firestore.sortdata("ani", "createAt", "desc").then((res) => {
      setAnis(res);
    });
  };
  //2020-2021
  const add_ani = async () => {
    let added = {
      ani: ani_efectiv,
      createAt: dd === "" ? Placeholder.getdateadmin() :dd,
    };
    await firestore
      .addItem("ani", added)
      .then(async (res) => {
        alert("ani adaugata");
        setdd("");
        await getAni();
      })
      .catch((err) => alert(err));
  };

  const delete_year = async (e) => {
    await firestore.deleteDocument("ani", e).then((res) => {
      alert("sters cu succes");
      getAni();
    });
  };

  //--------------MEMBERS----------------
  const [ani_mem, setanimem] = useState("");
  const [nume_mem, setnumemem] = useState("");
  const [detalii_mem, setdetaliimem] = useState("");
  const [poza_mem, setpozamem] = useState();
  const [p_m_link, setPML] = useState("");
  const pr_mm = [];
  const [load_mm, setloadinggMM] = useState(false);

  const [mem, setMembers] = useState([]);
  const getMemebers = async () => {
    await firestore.readDocuments("team_members").then((res) => {
      setMembers(res);
    });
  };

  const upload_mem = async () => {
    const { uid } = user;

    let added = {
      nume: nume_mem,
      uid: uid,
      ani: ani_mem,
      detalii: detalii_mem,
      // poza: poza_mem,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setloadinggMM(true);

    const storage = getStorage();

    const storageRef = ref(storage, `members/${poza_mem.name}`);
    try {
      await uploadBytes(storageRef, poza_mem);
      const url = await getDownloadURL(storageRef);
      added.poza = url;
    } catch (error) {
      console.error(error);
    }

    await firestore
      .addItem("team_member", added)
      .then(async (res) => {
        alert("Postare adaugata");
        setnumemem("");
        SetloadinggAlumni(false);
        setAni("Alege un an");
        setdetaliimem("");
        await getMemebers();
      })
      .catch((err) => alert(err));
  };

  const delete_mem = async (e) => {
    await firestore.deleteDocument("team_members", e).then((res) => {
      alert("sters cu succes");
    });
  };
  //-------------premii---------------
  const [img_premii, setImgPremii] = useState();
  const [text_premii, setTextPremii] = useState("");
  const [an_premii, setPremiian] = useState("");
  const [premii, setPremii] = useState([]);
  const [loadingpremii, setloadingpremii] = useState(false);

  const getPremii = async () => {
    await firestore.sortdata("premii", "an", "asc").then((res) => {
      setPremii(res);
    });
  };

  const upload_premii = async (e) => {
    e.preventDefault();
    const { uid } = user;
    setloadingpremii(true);
    let added = {
      uid,
      an: Number(an_premii),
      text: text_premii,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const storage = getStorage();

    const storageRef = ref(storage, `premii/${img_premii.name}`);
    try {
      await uploadBytes(storageRef, img_premii);
      const url = await getDownloadURL(storageRef);
      added.img = url;
    } catch (error) {
      console.error(error);
    }

    await firestore
      .addItem("premii", added)
      .then(async (res) => {
        alert("premiu adaugat");
        await getPremii();
      })
      .catch((err) => alert(err));
    setloadingpremii(false);
  };

  const delete_premiu = async (e) => {
    await firestore.deleteDocument("premii", e).then(async (res) => {
      alert("sters cu succes");
      await getPremii();
    });
  };

  //--------------sponsori-------------
  const [logo, setlogo] = useState();
  const [loadingglogo, setloadingglogo] = useState(false);
  const [spon_img, setspon_img] = useState("");
  const [spon, setSponsori] = useState([]);

  const getSponsori = async () => {
    await firestore.readDocuments("sponsors").then((res) => {
      setSponsori(res);
    });
  };

  const upload_sponsor = async () => {
    const { uid } = user;

    let added = {
      uid,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    setloadingglogo(true);
    const storage = getStorage();

    const storageRef = ref(storage, `sponsors/${logo.name}`);
    try {
      await uploadBytes(storageRef, logo);
      const url = await getDownloadURL(storageRef);
      added.logo = url;
    } catch (error) {
      console.error(error);
    }

    console.log(added);
    await firestore
      .addItem("sponsors", added)
      .then(async (res) => {
        alert("sponsor adaugat");
        setloadingglogo(false);
        await getSponsori();
      })

      .catch((err) => alert(err));
  };

  const delete_sponsor = async (e) => {
    await firestore
      .deleteDocument("sponsors", e)
      .then(async (res) => {
        alert("sters cu succes");
        await getSponsori();
      })
      .catch(function (error) {
        alert(error);
        return;
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

  const [clasa2, setClasa2] = useState("fas fa-caret-right");
  const [h2, setH2] = useState("0");

  function more2() {
    if (clasa2 === "fas fa-caret-up") {
      setClasa2("fas fa-caret-right");
      setH2("0");
    } else {
      setClasa2("fas fa-caret-up");
      setH2("auto");
    }
  }
  const [clasa3, setClasa3] = useState("fas fa-caret-right");
  const [h3, setH3] = useState("0");

  function more3() {
    if (clasa3 === "fas fa-caret-up") {
      setClasa3("fas fa-caret-right");
      setH3("0");
    } else {
      setClasa3("fas fa-caret-up");
      setH3("auto");
    }
  }

  const [clasa4, setClasa4] = useState("fas fa-caret-right");
  const [h4, setH4] = useState("0");

  function more4() {
    if (clasa4 === "fas fa-caret-up") {
      setClasa4("fas fa-caret-right");
      setH4("0");
    } else {
      setClasa4("fas fa-caret-up");
      setH4("auto");
    }
  }

  const [clasa5, setClasa5] = useState("fas fa-caret-right");
  const [h5, setH5] = useState("0");

  function more5() {
    if (clasa5 === "fas fa-caret-up") {
      setClasa5("fas fa-caret-right");
      setH5("0");
    } else {
      setClasa5("fas fa-caret-up");
      setH5("auto");
    }
  }
  const [clasa6, setClasa6] = useState("fas fa-caret-right");
  const [h6, setH6] = useState("0");

  function more6() {
    if (clasa6 === "fas fa-caret-up") {
      setClasa6("fas fa-caret-right");
      setH6("0");
    } else {
      setClasa6("fas fa-caret-up");
      setH6("auto");
    }
  }
  const [clasa7, setClasa7] = useState("fas fa-caret-right");
  const [h7, setH7] = useState("0");

  function more7() {
    if (clasa7 === "fas fa-caret-up") {
      setClasa7("fas fa-caret-right");
      setH7("0");
    } else {
      setClasa7("fas fa-caret-up");
      setH7("auto");
    }
  }

  return (
    <>
      <div className="admin">
        {user && user.uid == "G41BaSVvR2P146qD7C1QJvg1XWR2" ? (
          <>
            <div className="logged">
              <div className="blogs_part">
                <div className="out">
                  <button className="button" onClick={logout}>
                    Sign Out
                  </button>
                </div>
                <div className="form">
                  <h1>FOR BLOG</h1>
                  <h4 className="info">Poti alege mai multe poze</h4>
                  <input
                    //required
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />
                  <h4 className="info">
                    Pentru a desparti textul in paragrafe adauga intre 2
                    paragrafe &lt;next line&gt; si de preferat sa aiba spatiu
                    intre ce este inainte si dupa{" "}
                  </h4>
                  <textarea
                    //required
                    placeholder="paragrafe"
                    type="text"
                    onChange={(e) => {
                      setPlainText(e.target.value);
                    }}
                  />
                  <textarea
                    //required
                    placeholder="titlu"
                    onChange={(e) => setTitlu(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de facebook precum:
                    https://m.facebook.com/story.php?story_fbid=888623485487024&id=100030181425201
                  </h4>
                  <input
                    type="url"
                    //required
                    placeholder="fb"
                    onChange={(e) => setFb(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de instagram precum:
                    https://www.instagram.com/p/CmHTUnPN8ne/?igshid=YmMyMTA2M2Y=
                  </h4>
                  <input
                    type="url"
                    //required
                    placeholder="insta"
                    onChange={(e) => setInsta(e.target.value)}
                  />
                  <button
                    className="button"
                    disabled={loadingg ? true : false}
                    type="submit"
                    onClick={upload_blog}
                  >
                    {loadingg ? "loadingg" : "send"}
                  </button>
                </div>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more}>
                      <i className={clasa}></i>
                      <span id="STEM">
                        Arată toate postarile {"("}
                        {blog && blog.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h, transition: "0.5s ease-in-out" }}
                    >
                      <div className="blog">
                        {blog &&
                          blog.map((bl) => {
                            return (
                              <Post
                                deleted={() => deleteblog(bl.id)}
                                dalay={300}
                                data2={"fade-down"}
                                ajutor={true}
                                key={Math.random() * 92342423}
                                data="fade-right"
                                link={`/blog/${bl.id}`}
                                poza={bl.images[0]}
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
                  </div>
                </div>
              </div>
              <hr />
              <div className="apps_part">
                <h1>FOR APPS</h1>
                <div className="form">
                  <h4 className="info">Set the img.</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                  <h4 className="info">Set the Qr code</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setCodqr(e.target.files[0]);
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
                  <button
                    type="submit"
                    disabled={loadingg_apps ? true : false}
                    className="button"
                    onClick={submit_app}
                  >
                    {loadingg_apps ? "loadingg" : "submit"}
                  </button>
                </div>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more2}>
                      <i className={clasa2}></i>
                      <span id="STEM">
                        Arată apps {"("}
                        {apps && apps.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h2, transition: "0.5s ease-in-out" }}
                    >
                      <div className="apps">
                        {apps &&
                          apps.map((app) => (
                            <>
                              <div className="app">
                                <div className="top">
                                  <div className="img">
                                    <img src={app.cod_qr} alt="" />
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
                                      style={{
                                        width: "100%",
                                        margin: "30px 0",
                                      }}
                                      onClick={() => deleteapp(app.id)}
                                    >
                                      delete app
                                    </button>
                                  </div>
                                </div>

                                <a
                                  href={app.link}
                                  target="_blank"
                                  className="button"
                                >
                                  {app.link_text}
                                </a>
                                {app.img && (
                                  <div className="qr_cont">
                                    <img src={app.img} className="qr" alt="" />
                                  </div>
                                )}
                                <div className="linie_sep"></div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="ani_part">
                <div className="form">
                <h1>FOR ANI</h1>
                  <h4 className="info">
                    Anul se va scrie in formatul an-an, ex: 2021-2022
                  </h4>{" "}
                  <input
                    placeholder="adauga anul curent"
                    type="text"
                    onChange={(e) => setAniEfectiv(e.target.value)}
                  />
                  <input type="date" defaultValue={dd} onChange={(e) => setdd(e.target.value)} />
                  <button className="button" type="submit" onClick={add_ani}>
                    submit
                  </button>
                </div>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more3}>
                      <i className={clasa3}></i>
                      <span id="STEM">
                        Arată toti anii {"("}
                        {ani && ani.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h3, transition: "0.5s ease-in-out" }}
                    >
                      <div
                        style={{
                          width: "100vw",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        {ani &&
                          ani.map((an) => {
                            return (
                              <>
                                <div
                                  style={{
                                    width: "max-content",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "20px 30px",
                                  }}
                                >
                                  <h1 style={{ color: "white" }}>{an.ani}</h1>
                                  <button
                                    className="button"
                                    onClick={() => delete_year(an.id)}
                                  >
                                    delete year
                                  </button>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="alumni_part">
                <div className="form">
                <h1>FOR ALUMNI</h1>
                  <select
                    value={anistate}
                    onChange={(e) => setAni(e.target.value)}
                  >
                    <option value="null">Alege un an</option>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    placeholder="nume"
                    value={nume_alumni}
                    onChange={(e) => setAlumninume(e.target.value)}
                  />
                  <h4 className="info">
                    Sa se scrie facultatea terminata/actuala
                  </h4>
                  <input
                    type="text"
                    value={detalii_alumni}
                    placeholder="detalii"
                    onChange={(e) => setdetaliialumni(e.target.value)}
                  />
                  <textarea
                    placeholder="text"
                    value={text_alumni}
                    onChange={(e) => setTextalumni(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setPozealumni(e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loadingg_alumni ? true : false}
                    className="button"
                    onClick={upload_alumni}
                  >
                    {loadingg_alumni ? "loadingg" : "submit"}
                  </button>
                </div>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more4}>
                      <i className={clasa4}></i>
                      <span id="STEM">
                        Arată toti alumnii {"("}
                        {alumni && alumni.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h4, transition: "0.5s ease-in-out" }}
                    >
                      {/* {ani &&
                        ani.map((ani) => (
                          <Generatie
                            no={true}
                            years={ani.ani}
                            team={false}
                            key={ani.id}
                            persoane={[
                              alumni &&
                              alumni.filter((alumni) => {
                                if (alumni.ani == ani.ani)
                                  console.log("asd", delete_alumni(3))
                                    return {
                                      key: alumni.id,
                                      no: true,
                                      id: alumni.id,
                                      delete_this_mama: delete_alumni,
                                      img: alumni.poza,
                                      nume: alumni.nume,
                                      faculta: alumni.detalii,
                                      text: alumni.text,
                                    };
                                }),
                            ]}
                          />
                        ))} */}
                      {ani &&
                        ani.map((ani) => {
                          alumni &&
                            alumni.map((alumni) => {
                              if (alumni.ani == ani.ani) {
                                return <h1>asdkjbasdk</h1>;
                              }
                              // {
                              // key: alumni.id,
                              // no: true,
                              // id: alumni.id,
                              // delete_this_mama: delete_alumni,
                              // img: alumni.poza,
                              // nume: alumni.nume,
                              // faculta: alumni.detalii,
                              // text: alumni.text,
                              // };
                            });
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="members_part">
                <h1>FOR MEMBERS</h1>
                <div className="form">
                  <select
                    value={ani_mem}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setanimem(e.target.value);
                    }}
                  >
                    <option value={"null"}>Alege un an</option>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    value={nume_mem}
                    placeholder="nume"
                    onChange={(e) => setnumemem(e.target.value)}
                  />
                  <h4 className="info">
                    Sa se scrie departamentul main din care face parte
                    <br />
                    Daca vreti sa puneti ceva de la capatul randului adaugati{" "}
                    {" <br/>"}
                  </h4>
                  <input
                    type="text"
                    value={detalii_mem}
                    placeholder="detalii"
                    onChange={(e) => setdetaliimem(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setpozamem(e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    disabled={load_mm ? true : false}
                    className="button"
                    onClick={upload_mem}
                  >
                    {load_mm ? "loadingg" : "submit"}
                  </button>
                </div>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more5}>
                      <i className={clasa5}></i>
                      <span id="STEM">
                        Arată toti membrii{"("}
                        {mem && mem.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h5, transition: "0.5s ease-in-out" }}
                    >
                      {/* {ani &&
                        ani.map((ani) => (
                          <Generatie
                            no={true}
                            years={ani.ani}
                            team={true}
                            key={ani.id}
                            persoane={[
                              mem &&
                                mem.filter((alumni) => {
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
                        ))} */}
                      {ani &&
                        ani.map((ani) => {
                          mem &&
                            mem.map((alumni) => {
                              if (alumni.ani == ani.ani) {
                                return (
                                  <div>
                                    <h2>{alumni.nume}</h2>
                                    <img src={alumni.poza} width="300" alt="" />
                                    <h3>{alumni.detalii}</h3>
                                    <p>{alumni.text}</p>
                                    <button
                                      onClick={() => {
                                        delete_mem(alumni.id);
                                      }}
                                    >
                                      delete
                                    </button>
                                  </div>
                                );
                              }
                              // {
                              // key: alumni.id,
                              // no: true,
                              // id: alumni.id,
                              // delete_this_mama: delete_alumni,
                              // img: alumni.poza,
                              // nume: alumni.nume,
                              // faculta: alumni.detalii,
                              // text: alumni.text,
                              // };
                            });
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="sponsor_part">
                <div className="form">
                <h1>FOR SPONSORS</h1>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setlogo(e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    onClick={upload_sponsor}
                    className="button"
                    disabled={loadingglogo ? true : false}
                  >
                    {loadingglogo ? "loadingg" : "add sponsor"}
                  </button>
                </div>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more6}>
                      <i className={clasa6}></i>
                      <span id="STEM">
                        Arată toti sponsorii{"("}
                        {spon && spon.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h6, transition: "0.5s ease-in-out" }}
                    >
                      <div className="sponsors">
                        {spon &&
                          spon.map((sp) => (
                            <div>
                              <img src={sp.logo} />
                              <button
                                className="button"
                                onClick={() => delete_sponsor(sp.id)}
                              >
                                delete this sponsor
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="premii_part">
                <div className="form">
                <h1>FOR PREMII</h1>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImgPremii(e.target.files[0]);
                    }}
                  />

                  <input
                    type="number"
                    placeholder="an"
                    onChange={(e) => setPremiian(e.target.value)}
                  />
                  <textarea
                    placeholder="text"
                    onChange={(e) => setTextPremii(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="button"
                    onClick={upload_premii}
                  >
                    submit
                  </button>
                </div>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more7}>
                      <i className={clasa7}></i>
                      <span id="STEM">
                        Arată toate premiile {"("}
                        {premii && premii.length}
                        {")"}
                      </span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h7, transition: "0.5s ease-in-out" }}
                    >
                      <div className="scrollcnt">
                        <div className="loc_de_premii">
                          <h1>Premii</h1>
                          <div className="coca"></div>
                          <h2>Since 2017</h2>
                        </div>
                        <ScrollContainer className="scc">
                          <div className="poate">
                            <div className="space"></div>
                            {premii &&
                              premii.map((premiu) => (
                                <Card
                                  delete_premiu={() => delete_premiu(premiu.id)}
                                  bafta={true}
                                  key={premiu.id}
                                  an={premiu.an}
                                  text={premiu.text}
                                  image={premiu.img}
                                />
                              ))}
                          </div>
                        </ScrollContainer>
                      </div>
                    </div>
                  </div>
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
