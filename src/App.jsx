import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apps from "./components/apps/Apps";
import Despre from "./components/despre/Despre";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";
import Firestore from "./components/utils/Firestore";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar";
import Recrutari from "./components/recturari/Recrutari"

const firestore = new Firestore();

function App() {

  const [spon, setSpon] = useState([]);
  const getSpon = useMemo(() => async () => {
    await firestore.readDocuments("sponsori").then((res) => {
      setSpon(res);
    }).catch(er=>{
      console.log(er);
    });
  });
  const [premii, setPremii] = useState([]);
  const getPremii = useMemo(() => async () => {
    await firestore.sortdata("premii", "an", "asc").then((res) => {
      setPremii(res);
    });
  });

  const [apps, setApps] = useState([]);
  const getApps = useMemo(() => async () => {
    await firestore.readDocuments("aplicatii").then((res) => {
      setApps(res);
    }).catch(er => {
      console.log(er);
    })
  })

  const [isAllowed, setIsAllowed] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    getApps();
    getSpon();
    getPremii();
  }, []);

  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(window.location.pathname);
  }, [window.location]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home premii={premii} spon = {spon}/>} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/apps" element={<Apps apps={apps} />} />
        <Route path="/download" element={<Apps />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
