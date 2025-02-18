import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductView from "./HomePage/ProductView/ProductView";
import AddCart from "./HomePage/AddCart/AddCart";
import NotFoundPage from "../NoPageFound";
import MainPage from "./HomePage/HomePage";
import Carousel from "./HomePage/Products/Carousel";
import ProductDetails from "./HomePage/ProductView/ProductDetails";
import HeroSection from "./Ecoms/HeroSection";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="productView/:id" element={<ProductView aria-label="Quantity Input" min={1} max={99} />} />
        <Route path="AddCart" element={<AddCart />} />
        <Route path="Carousel" element={<Carousel />} />
        <Route path="ProductDetails/:id" element={<ProductDetails />} />


        <Route path="HeroSection" element={<HeroSection />} />
        {/* <Route path="LogInForm" element={<LogInForm />} />
          <Route path="ScrollBody" element={<ScrollBody />} /> */}
        <Route path="*" element={<NotFoundPage />} />;
      </Routes>
    </>
  );
}

export default App;
