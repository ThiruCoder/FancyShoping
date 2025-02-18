import React, { useContext, useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AddShoppingCart, MoreVert } from "@mui/icons-material";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";


import { FetchableContext } from "../../Context/Context";
import { purple } from "@mui/material/colors";
import { ProductFetchedData } from "../../ReduxPage/ReduxActions/ActionReducer";
import { product1Reducer } from "../../ReduxPage/ReduxActions/Reducer";


const Product1 = () => {
  const { shoppingData, loading, skeleton } = useContext(FetchableContext);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [getProduct, setGetProduct] = useState([]);

  const { homeProducts } = useSelector((state) => state.product1);
  console.log('dataProduct1', homeProducts);

  useEffect(() => {
    setGetProduct(homeProducts)
  }, [setGetProduct, homeProducts])



  useEffect(() => {
    dispatch(ProductFetchedData())
  }, [product1Reducer, ProductFetchedData])
  // Use useMemo to shuffle only once when data changes



  const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2%",
          flexWrap: "wrap",
          overflowY: "auto",
          scrollBehavior: "smooth",
          overscrollBehaviorX: "auto",
          whiteSpace: "nowrap",
          overflowWrap: "anywhere",
          overflowClipBox: "content-box",
        }}
      >
        <Typography className="errorsLoad" variant="h3"></Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {getProduct?.products?.length > 0
            ? getProduct?.products?.map((item, index) => (
              <Grid
                className="product"
                xs={2}
                sm={4}
                md={3}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Card
                  sx={{
                    backgroundPosition: "cover",
                    background:
                      "linear-gradient(to bottom, #010d14 30%,rgb(2, 33, 33) 70%)",

                    width: matches ? 240 : 200, //200
                    height: matches ? 340 : 300, //300
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="settings"
                        sx={{ color: "#fff", fontSize: 15 }}
                        key={item?.id}
                      >
                        <StarBorderPurple500Icon style={{ width: 14 }} />
                        {item?.rating}
                      </IconButton>
                    }
                  />
                  <CardMedia
                    className="img"
                    srcSet={item?.thumbnail}
                    image={item?.thumbnail || skeleton}
                    alt={item?.title}
                    key={item?.id}
                    id={index}
                    onClick={() => navigator(`/productView/${item?.id}`)}
                    style={{
                      width: matches ? "240px" : "200px", //200
                      height: matches ? "240px" : "200px", //200
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      bottom: 38,
                    }}
                  />
                  <Divider sx={{ shadow: "2px 2px 2px gray" }} />
                  <CardActionArea
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      <Typography
                        className="MyStyle"
                        key={item?.id}
                        style={{
                          width: "170px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          position: "relative",
                          bottom: 45,
                          color: "#fff",
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Stack>
                    <Typography
                      key={item?.id}
                      sx={{
                        position: "relative",
                        left: "20px",
                        bottom: 58,
                        height: "0px",
                        color: "#fff",
                      }}
                    >
                      &#8377; {item?.price}
                    </Typography>
                  </Stack>
                  <CardActions>
                    <Stack spacing={2} direction="row">
                      <IconButton
                        sx={{
                          position: "relative",
                          left: matches ? 180 : 140,
                          bottom: 65,
                          height: "0px",
                          color: "#fff",
                        }}
                      >
                        <AddShoppingCart
                          sx={{ fontSize: 16, width: 30, py: 20 }}
                        />
                      </IconButton>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))
            : null}
        </Grid>
      </Stack>
      {/* <SShapeScroll /> */}
    </>
  );
};

export default Product1;
