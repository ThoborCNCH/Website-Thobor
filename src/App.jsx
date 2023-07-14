import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPages from "./components/admin/AdminPages";
import AlumniPage from "./components/admin/components/AlumniPage";
import AniPage from "./components/admin/components/AniPage";
import AppsPage from "./components/admin/components/AppsPage";
import BlogPage from "./components/admin/components/BlogPage";
import Index from "./components/admin/components/Index";
import PremiiPage from "./components/admin/components/PremiiPage";
import ShopPage from "./components/admin/components/ShopPage";
import SponsorsPage from "./components/admin/components/SponsorsPage";
import Alumni from "./components/alumni/Alumni";
import Apps from "./components/apps/Apps";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/blog/BlogPost";
import Despre from "./components/despre/Despre";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";
import Cart from "./components/shop/Cart";
import ProductPage from "./components/shop/ProductPage";
import Shop from "./components/shop/Shop";
import Sponsors from "./components/sponsors/Sponsors";
import Firestore from "./components/utils/Firestore";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar";
import Users from "./components/admin/components/Users";
import BlogPagePost from "./components/admin/components/BlogPagePost";
import Crm from "./components/admin/components/Crm";

const firestore = new Firestore();

function App() {
  const [user, loading, error] = useAuthState(firestore.getuser());

  const [blog, setBlog] = useState([]);
  const getBlog = useMemo(() => async () => {
    await firestore.sortdata("blog", "createAt", "desc").then((res) => {
      setBlog(res);
    });
  });
  //ma omor bag pula

  const addit = useMemo(() => async (id, cant) => {
    await firestore.addit(id, user, cant);
  });
  const delete_prod_app = useMemo(() => async (id, cant) => {
    await firestore.deleteDocument("cos", id).then((res) => {
      alert("Produs scos din cosul tau!");
    });
  });
  const update = useMemo(() => async (cant, uid) => {
    await firestore
      .updateDocument("cos", uid, { cantitate: cant })
      .then((res) => {
        alert("cantitatea s-a updatat!");
      });
  });
  const finish = useMemo(() => async () => {
    return await firestore
      .delete_all_from_cart_by_user_id(user.uid)
      .then((res) => {
        //
      });
  });
  const fixCant = useMemo(() => async (hidden) => {
    //
    hidden.forEach(async (element) => {
      await firestore.getProductById(element.id).then(async (res) => {
        //
        await firestore
          .updateDocument("products", res.id, {
            cantitate: res.cantitate - element.cant,
          })
          .then((ress) => {
            //
          });
      });
    });
    return true;
  });
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
    });
  });
  const [premii, setPremii] = useState([]);
  const getPremii = useMemo(() => async () => {
    await firestore.sortdata("premii", "an", "asc").then((res) => {
      setPremii(res);
    });
  });

  const [users, setUsers] = useState([]);

  const getUsers = useMemo(() => async () => {
    await firestore.readDocuments("thobor_users").then((res) => {
      setUsers(res);
    });
  });
  const [tasks, setTasks] = useState([]);

  const getTasks = useMemo(() => async () => {
    await firestore.readDocuments("tasks").then((res) => {
      setTasks(res);
    });
  });

  useEffect(() => {
    getAni();
    getBlog();
    getApps();
    getSpon();
    getPremii();
    getUsers();
    getTasks();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home premii={premii} />} />
        <Route path="/blog" element={<Blog blog={blog} />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/apps" element={<Apps apps={apps} />} />
        <Route path="/download" element={<Apps />} />
        <Route path="/team" element={<Alumni ani={ani} alumni={alumni} />} />
        <Route path="/sponsors" element={<Sponsors spon={spon} />} />
        <Route
          path="/shop/:categorie/:sort_param?/:price?"
          element={<Shop addit={addit} />}
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
        <Route path="/admin" element={<AdminPages emails={users} />}>
          {/* <Route path="/admin/" element={<Index />} /> */}
          <Route path="/admin/tasks" element={<Crm taskss={tasks} />} />
          <Route path="/admin/users" element={<Users userss={users} />} />
          <Route path="/admin/blog" element={<BlogPage blogs={blog} />} />
          <Route path="/admin/blog/:id" element={<BlogPagePost />} />
          <Route path="/admin/shop" element={<ShopPage />} />
          <Route path="/admin/apps" element={<AppsPage appss={apps} />} />
          <Route
            path="/admin/team"
            element={<AlumniPage anii={ani} alumnii={alumni} />}
          />
          <Route
            path="/admin/premii"
            element={<PremiiPage premiis={premii} />}
          />
          <Route
            path="/admin/sponsors"
            element={<SponsorsPage sponsorss={spon} />}
          />
          <Route path="/admin/ani" element={<AniPage anii={ani} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
