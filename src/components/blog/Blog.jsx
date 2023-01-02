import React, { useEffect } from "react";
import "./blog.scss";
import Post from "./components/Post";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "../utils/Contact";
import Up from "../utils/Up";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const firestore = firebase.firestore();

function Blog() {
  useEffect(() => {
    AOS.init();
  }, []);

  const blogRef = firestore.collection("blog");
  const query = blogRef.orderBy("createAt", "desc");

  const [blog] = useCollectionData(query, { idField: "id" });
  console.log(blog);
  return (
    <>
      <img
        className="header"
        src={require("../../img/blog_banner.svg").default}
        alt=""
      />

      <div className="blog">
        {blog &&
          blog.map((bl) => (
            <Post
              dalay={300}
              data2={"fade-down"}
              ajutor={false}
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
          ))}
      </div>
      <Contact />
      <Up />
    </>
  );
}

export default Blog;
