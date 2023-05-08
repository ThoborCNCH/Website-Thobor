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
import Assembly from "./components/simulator/TeleOP/Assembly";
import NotFound from "./components/notfound/NotFound";
import Incercare from "./components/utils/Incercare";
import { useEffect } from "react";
import Shop from "./components/shop/Shop";
import Firestore from "./components/utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import ProductPage from "./components/shop/ProductPage";
import Cart from "./components/shop/Cart";
import AdminPages from "./components/admin/AdminPages";
import BlogPage from "./components/admin/components/BlogPage";
import ShopPage from "./components/admin/components/ShopPage";
import AppsPage from "./components/admin/components/AppsPage";
import AlumniPage from "./components/admin/components/AlumniPage";
import PremiiPage from "./components/admin/components/PremiiPage";
import SponsorsPage from "./components/admin/components/SponsorsPage";
import Index from "./components/admin/components/Index";
import AniPage from "./components/admin/components/AniPage";

const firestore = new Firestore();

function App() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [cos, setCos] = useState(0);
  const [cos_ev, setCosEv] = useState(0);

  const getCos = async () => {
    setCos(await firestore.getCos(user));
  };

  const [link, setLink] = useState(window.location.pathname);

  useEffect(() => {
    setLink(window.location.pathname);
  }, [window.location.pathname]);
  useEffect(() => {
    getCos();
    console.log(window);
  }, [cos_ev, user]);

  const addit = async (id, cant) => {
    await firestore.addit(id, user, cant);
    await getCos();
    setCosEv((old) => old + cant);
  };

  const delete_prod_app = async (id, cant) => {
    await firestore.deleteDocument("cos", id).then((res) => {
      setCosEv((old) => old - cant);
      alert("Produs scos din cosul tau!");
    });
  };

  const update = async (cant, uid) => {
    await firestore
      .updateDocument("cos", uid, { cantitate: cant })
      .then((res) => {
        setCosEv((old) => old + 32);
        alert("cantitatea s-a updatat!");
      });
  };

  const finish = async () => {
    return await firestore
      .delete_all_from_cart_by_user_id(user.uid)
      .then((res) => {
        setCosEv((old) => old - 13);
        console.log(res);
      });
  };

  const fixCant = async (hidden) => {
    console.log(hidden);
    hidden.forEach(async (element) => {
      await firestore.getProductById(element.id).then(async (res) => {
        console.log(res.id, ": ", res.cantitate - element.cant);
        await firestore
          .updateDocument("products", res.id, {
            cantitate: res.cantitate - element.cant,
          })
          .then((ress) => {
            console.log(ress);
          });
      });
    });

    return true;
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
        <Route path="/team" element={<Alumni />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/simulator" element={<Assembly />} />
        <Route
          path="/shop/:categorie/:sort_param?/:price?"
          element={<Shop cos={cos} addit={addit} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              delete_prod_app={delete_prod_app}
              update={update}
              finish={finish}
              fixCant={fixCant}
            />
          }
        />
        <Route path="/prod/:id" element={<ProductPage addit={addit} />} />

        <Route path="/admin" element={<AdminPages />}>
          <Route path="/admin/" element={<Index />} />
          <Route path="/admin/blog" element={<BlogPage />} />
          <Route path="/admin/shop" element={<ShopPage />} />
          <Route path="/admin/apps" element={<AppsPage />} />
          <Route path="/admin/team" element={<AlumniPage />} />
          <Route path="/admin/premii" element={<PremiiPage />} />
          <Route path="/admin/sponsors" element={<SponsorsPage />} />
          <Route path="/admin/ani" element={<AniPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {link !== "/simulator" && <Footer />}
    </BrowserRouter>
  );
}

export default App;
