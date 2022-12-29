import React from "react";
import nextId from "react-id-generator";
import "../blog/blog.scss";
import Compressor from "compressorjs";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Post from "../blog/components/Post";

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
  const query = blogRef.orderBy("createAt");

  const [blog] = useCollectionData(query, { idField: "id" });

  const [plaintext, setPlainText] = useState();
  const [titlu, setTitlu] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [imgs, setImgs] = useState();
  const [length, setL] = useState();

  const upload_blog = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    let added = {
      id,
      titlu,
      photoUrl: photoURL,
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
      added[`img${scapa_copiii_din_pivnita}`] =
        imgs[`img${scapa_copiii_din_pivnita}`];
    }
    for (
      let scapa_copiii_din_pivnita = 0;
      scapa_copiii_din_pivnita < texts.length;
      scapa_copiii_din_pivnita++
    ) {
      added[`text${scapa_copiii_din_pivnita}`] =
        texts[scapa_copiii_din_pivnita];
    }

    await blogRef.add(added).then((res) => {
      console.log("gata", res);
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
              console.log(`img${i}`,result);
              // setImgs({ ...imgs, i: result });
              obj[`img${i}`] = result;
              setImgs(obj);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    }

    // setImgs([...obj]);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={signingoagle}>Sign in with google</button>
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          console.log("Ads");
          auth.signOut();
        }}
      >
        Sign Out
      </button>
      <br />
      <form onSubmit={upload_blog}>
        <input type="file" multiple onChange={(e) => uploadimg(e)} />
        <textarea
          placeholder="paragrafe blog (next line)"
          type="text"
          onChange={(e) => {
            setPlainText(e.target.value);
          }}
        />
        <textarea
          placeholder="titlu"
          onChange={(e) => setTitlu(e.target.value)}
        />
        <input
          type="url"
          placeholder="fb"
          onChange={(e) => setFb(e.target.value)}
        />
        <input
          type="url"
          placeholder="insta"
          onChange={(e) => setInsta(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
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
      <br />
      <br />
      <br />
      <div className="blog">
        {blog &&
          blog.map((bl) => (
            <Post
              dalay={300}
              data2={"fade-down"}
              key={Math.random() * 92342423}
              data="fade-right"
              ajutor={true}
              link={`/blog/${bl.id}`}
              poza={bl.img0}
              titlu={bl.titlu}
              text_scurt={bl.text0.slice(0, 200) + " ..."}
            />
          ))}
      </div>
    </>
  );
}
export default Admin;
