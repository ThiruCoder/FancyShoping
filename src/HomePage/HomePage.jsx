import React, { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchableContext } from "../Context/Context";
import Navbar from "./Header/Navbar";
import Carousel from "./Products/Carousel";
import Product1 from "./Products/HomeProduct1";
import { makeStyles } from "@mui/styles";
import GsapScrolling from "./Products/GsapScrolling";
import Footer from "../Ecoms/Footer";

// import FormAdmin from "./UserForm/Form";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2%",
    alignContent: "flex",
  },
});

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos?_limit=5"
  );
  return data;
};

const MainPage = () => {
  const { shoppingData, skeleton } = useContext(FetchableContext);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  // const { dataProduct, loading, error } = useSelector(
  //   (state) => state.product || {}
  // );

  const classes = useStyles();
  const { data, isFetching, isErrors } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <div className={classes.Container}>
        <header style={{ width: "100%" }}>
          <Navbar />
        </header>
        <div>
          <Box sx={{ width: "100%" }}>
            {isFetching ? <LinearProgress /> : null}
          </Box>
          <Box></Box>
          <content className={classes.Container}>
            <GsapScrolling />
            <Product1 />
          </content>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
