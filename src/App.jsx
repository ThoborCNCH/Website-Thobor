import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apps from "./components/apps/Apps";
import Despre from "./components/despre/Despre";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";
import Sponsors from "./components/sponsors/Sponsors";
import Firestore from "./components/utils/Firestore";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar";
import Recrutari from "./components/recturari/Recrutari"

const firestore = new Firestore();

function App() {

  const [apps, setApps] = useState([]);
  const getApps = useMemo(() => async () => {
    await firestore.sortdata("apps", "createAt", "desc").then((res) => {
      setApps(res);
    });
  });
  const [ani, setAni] = useState([]);
  const [alumni, setAlumni] = useState([]);

  const getAni = useMemo(() => async () => {
    await firestore.sortdata("ani", "createAt", "desc").then(async (res) => {
      setAni(res);
      await firestore.readDocuments("team_member").then((res) => {
        setAlumni(res);
      });
    });
  });
  const [spon, setSpon] = useState([]);
  const getSpon = useMemo(() => async () => {
    await firestore.readDocuments("sponsors").then((res) => {
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


  const [tasks, setTasks] = useState([]);

  const getTasks = useMemo(() => async () => {
    await firestore.readDocuments("tasks").then((res) => {
      setTasks(res);
    });
  });
  const [isAllowed, setIsAllowed] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    getAni();
    getApps();
    getSpon();
    getPremii();
    getTasks();
  }, []);

  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(window.location.pathname);
  }, [window.location]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home premii={premii} />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/apps" element={<Apps apps={apps} />} />
        <Route path="/download" element={<Apps />} />
        <Route path="/sponsors" element={<Sponsors spon={spon} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
