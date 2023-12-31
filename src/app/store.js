import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";
import mainCatReducer from "../features/mainCategory/mainCategorySlice";
import subCatReducer from "../features/subCategory/subCategorySlice";
import contactReducer from "../features/contact/contactSlice";
import layoutReducer from "../features/layout/layoutSlice";

import authReducer from "../features/auth/authSlice";
import newsletterReducer from "../features/newsletter/newsletterSlice";
import blogReducer from "../features/blogs/blogSlice";
import blogTextReducer from "../features/blogs/blogInfoSlice";
import serviceReducer from "../features/service/serviceSlice";
import serviceTextReducer from "../features/service/serviceInfoSlice";

import homeServiceInfoReducer from "../features/home/service/serviceInfoSlice";
import homeBlogInfoReducer from "../features/home/blog/blogInfoSlice";
import homeSliderReducer from "../features/home/slider/sliderSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    mainCats: mainCatReducer,
    subCats: subCatReducer,
    contacts: contactReducer,
    blogs: blogReducer,
    services: serviceReducer,
    layout: layoutReducer,
    newsletters: newsletterReducer,
    serviceInfo: homeServiceInfoReducer,
    serviceText: serviceTextReducer,
    blogInfo: homeBlogInfoReducer,
    blogText: blogTextReducer,
    homeSlider: homeSliderReducer,
  },
});
