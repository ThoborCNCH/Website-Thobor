import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/blog/BlogPost";
import Home from "./components/home/Home";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";
import Despre from "./components/despre/Despre";
import Loading from "./components/utils/Loading";

// const Home = React.lazy(() => import("./components/home/Home"));

function App() {
  return (
    <BrowserRouter>
      {/* <Suspense  fallback={<Loading/>}> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/despre" element={<Despre />} />
      </Routes>
      <Footer />
      {/* </Suspense>       */}
    </BrowserRouter>
  );
}

export default App;
