import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
// swiper styles
import "swiper/css";
import "swiper/css/pagination";

// main style
import "./css/style.css";

import { Layout } from "./components/layout";

import { SingleBlog, SingleService } from "./pages/single";

import {
  Home,
  Blogs,
  ShopsAndRestaurants,
  NotFound,
  Contact,
  ErrorPage,
  Search,
} from "./pages";

// admin
import { AdminLayout, NotFoundAdmin } from "./admin/components";
import {
  Blog,
  BlogBanner,
  Bloglist,
  ChangePassword,
  Dashboard,
  Newsletter,
  Profile,
  Contacts,
  Service,
  Services,
  ServisBanner,
  ViewContact,
} from "./admin/pages";
import { EditLayout } from "./admin/pages/editLayout";
import { ParentCat, SubCat } from "./admin/pages/categories";
import Login from "./admin/pages/auth/login/Login";
import { BlogInfo, ServisInfo, Slider, Sliders } from "./admin/pages/home";

function App() {
  const location = useLocation();
  const getTokenFromLocalStorage = localStorage.getItem("CityAdmin")
    ? JSON.parse(localStorage.getItem("CityAdmin"))
    : null;

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "smooth";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  // Set Axios default headers with the token
  useEffect(() => {
    if (getTokenFromLocalStorage) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${getTokenFromLocalStorage.token}`;
    }
  }, [getTokenFromLocalStorage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="magaza-ve-restoranlar"
            element={<ShopsAndRestaurants />}
          />
          <Route path="axtaris" element={<Search />} />
          <Route path="magaza-ve-restoranlar/:id" element={<SingleService />} />
          <Route path="xeberler-ve-yenilikler" element={<Blogs />} />
          <Route path="xeber/:id" element={<SingleBlog />} />
          <Route path="elaqe" element={<Contact />} />
          {/* not found */}
          <Route path="*" element={<NotFound />} />
          <Route path="error" element={<ErrorPage />} />
        </Route>

        {/* auth */}
        <Route path="/login" element={<Login />} />

        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="home/sliders" element={<Sliders />} />
          <Route path="home/slider" element={<Slider />} />
          <Route path="home/slider/:id" element={<Slider />} />
          <Route path="home/servis" element={<ServisInfo />} />
          <Route path="home/blog" element={<BlogInfo />} />
          <Route path="service-info" element={<ServisBanner />} />
          <Route path="services" element={<Services />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:id" element={<Service />} />
          <Route path="blogs" element={<Bloglist />} />
          <Route path="blog-info" element={<BlogBanner />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/:id" element={<ViewContact />} />

          <Route path="categories/parent" element={<ParentCat />} />
          <Route path="categories/sub" element={<SubCat />} />
          <Route path="layout" element={<EditLayout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-password" element={<ChangePassword />} />
          <Route path="subscribe" element={<Newsletter />} />
          <Route path="*" element={<NotFoundAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
