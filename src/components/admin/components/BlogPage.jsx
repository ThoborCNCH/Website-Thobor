import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../../blog/components/Post";
import Firestore from "../../utils/Firestore";

const firestore = new Firestore();

function BlogPage() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [clasa, setClasa] = useState("fas fa-caret-right");
  const [h, setH] = useState("0");
  const [plaintext, setPlainText] = useState();
  const [titlu, setTitlu] = useState("jkadbs");
  const [fb, setFb] = useState("asdasdas");
  const [insta, setInsta] = useState("asdasdasd");
  const [imgs, setImgs] = useState();
  const [length, setL] = useState();
  const [bl_img, setblimg] = useState([]);

  const [blog, setBlog] = useState([]);
  const [blogindex, setBlogIndex] = useState(0);

  function more() {
    if (clasa === "fas fa-caret-up") {
      setClasa("fas fa-caret-right");
      setH("0");
    } else {
      setClasa("fas fa-caret-up");
      setH("auto");
    }
  }
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
    //console.log(images.length);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const storageRef = ref(storage, `blog/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        downloadUrls.push(url);
      } catch (error) {
        //console.error(error);
      }
    }
    let idk = {
      ...added,
      images: downloadUrls,
    };
    // urls && (ad = { ...ad, ...added });
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
        //console.log(er);
      });
  };
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
  const [images, setImages] = useState([]);
  const [loadingg, setloadingg] = useState(false);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };
  return (
    <div className="adminpage">
      <div className="blogs_part">
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
            Pentru a desparti textul in paragrafe adauga intre 2 paragrafe
            &lt;next line&gt; si de preferat sa aiba spatiu intre ce este
            inainte si dupa{" "}
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
              <div className="blog" style={{ width: "100%" }}>
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
    </div>
  );
}

export default BlogPage;
