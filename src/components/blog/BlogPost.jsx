import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./blog_post.scss";
import Slider from "./components/Slider";
import Svg from "../utils/Svg";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import { useParams } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const firestore = firebase.firestore();
function BlogPost() {
  const [postare, setPosare] = useState({});
  const [img, setImg] = useState([]);
  const { id } = useParams();
  console.log(id);

  const blogRef = firestore.collection("blog").where("id", "==", id);
  const ceva = useCollectionData(blogRef, { idField: "id" });

  // useEffect(() => {
   
  // }, []);

  useEffect(() => {
    AOS.init();
    document.querySelectorAll(".blog_post p ").forEach((p, index) => {
    if (index % 2 == 0) {
      p.setAttribute("data-aos", "fade-right");
    } else {
      p.setAttribute("data-aos", "fade-left");
    }
  });
    ceva && ceva[0] && console.log(ceva[0][0]);
    ceva && ceva[0] && setPosare(ceva[0][0]);
    ceva && ceva[0] && console.log(postare);
    ceva &&
      ceva[0] &&
      postare &&
      Object.entries(postare).map(([key, value]) => {
        if (key.includes("img")) {
          if(!img.includes(value))
          setImg((old) => [...old, value]);
        }
      });
  }, [ceva]);

  return (
    <>
      <img
        className="header"
        src={require("../../img/blog_banner.svg").default}
        alt=""
      />
      <div className="blog_post">
        <div className="title">
          <div className="title2">
            <h1>{postare && postare.titlu} </h1>
            <div className="linie"></div>
          </div>
          <h3>
            See post on social media:{" "}
            <a href={postare && postare.fb} target="_blank">
              <svg
                xmlnsXlink="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#1672E6"
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
                />
              </svg>
            </a>
            <a href={postare && postare.insta} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#E1306C"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
          </h3>
        </div>
        {postare && postare.texts && postare.texts.map((p) => <p>{p}</p>)}
      </div>
      <Svg />
      {postare && img && <Slider slides={img} />}
      <Contact />
      <Up />
    </>
  );
}

export default BlogPost;
