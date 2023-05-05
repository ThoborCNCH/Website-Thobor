import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/blog/BlogPost";
import Home from "./components/home/Home";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";
import Despre from "./components/despre/Despre";
import Apps from "./components/apps/Apps";
import Sponsors from "./components/sponsors/Sponsors";
import Alumni from "./components/alumni/Alumni";
import Team from "./components/team/Team";
import Assembly from "./components/simulator/TeleOP/Assembly";
import Admin from "./components/admin/Admin";
import NotFound from "./components/notfound/NotFound";
import Incercare from "./components/utils/Incercare";
import { useEffect } from "react";
import Shop from "./components/shop/Shop";
import Firestore from "./components/utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import AdminPage from "./components/admin/AdminPage";
import ProductPage from "./components/shop/ProductPage";
const firestore = new Firestore();

function App() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [cos, setCos] = useState(0);
  const [cos_ev, setCosEv] = useState(0);

  const getCos = async () => {
    setCos(await firestore.getCos(user));
    // console.log(await firestore.getCos(user));
  };

  useEffect(() => {
    getCos();
    // await setCos(await firestore.getCos());
  }, [cos_ev, user]);

  const addit = async (id, cant) => {
    firestore.addit(id, user, cant);
    setCosEv((old) => old + cant);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Incercare id="tsparticles" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/download" element={<Apps />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/simulator" element={<Assembly />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ce_cauti_ma_aici" element={<Admin />} />
        <Route
          path="/shop/:categorie/:sort_param?/:price?"
          element={<Shop />}
        />
        <Route path="/prod/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
