"use client"
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Grid2,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,

  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FetchableContext } from "../../Context/Context";
import Navbar from "../Header/Navbar";
import { DataStored } from "../../ReduxPage/ReduxActions/Slicer";
import { useDispatch } from "react-redux";
import { get, push, ref, update } from "firebase/database";
import { database } from "../../Firebase/FirebaseConfig";
import { AddCart } from "../../ReduxPage/ReduxActions/Addcart/AddCardReducer";
import { ProductFetchedData } from "../../ReduxPage/ReduxActions/Addcart/addCartAction";
import { AddProducts } from "../../ReduxPage/ReduxActions/AddProductSlicer";
import { AddShoppingCart, AccountCircle, Star } from '@mui/icons-material';
import Slider from "./Slider ";
import { styled } from "@mui/styles";
import ReviewList from "./ReviewList";


import { motion, useScroll } from "motion/react"
import Footer from "../../Ecoms/Footer";

const ProductView = () => {
  const [quantity, setQuantity] = useState('')
  const [gridMd, setGridMd] = useState(4); // Default: 3 columns (md=4)
  const [isGridMd, setIsGridMd] = useState(false)
  const [reviews, setReviews] = useState([])
  const { id } = useParams();

  const {
    shoppingData,
    setShoppingData,
    loading,
    setLoading,
    error,
    setError,
    handleNavigate,
  } = useContext(FetchableContext);

  const matches = useMediaQuery("(min-width:900px)");
  const titleMatches = useMediaQuery("(min-width:645px)");

  const [rating, setRating] = useState(null);
  const navigate = useNavigate();
  // const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setCount(isNaN(value) ? 0 : value);
  };




  async function productView() {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      // if (!response?.ok) throw new Error(response?.statusText);
      const result = await response.json();
      if (result) {
        setShoppingData(result);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    productView();
  }, [id]);



  async function handleAddCard() {
    const refer = ref(database, "addCart/cartItems");
    try {
      const product = await get(refer);
      if (product.exists()) {
        const valueOfCart = Object.entries(product.val());
        const filteringData = valueOfCart.find(
          ([index, items]) => String(items.id) === String(shoppingData.id)
        );

        if (!filteringData) {

          const refers = ref(database, "addCart/cartItems");

          await push(refers, {
            quantity: 1,
            ...shoppingData
          });
          const passingData = {
            quantity: 1,
            ...shoppingData
          }
          dispatch(DataStored(passingData))
          dispatch(AddProducts(passingData))
          navigate("/AddCart");
        } else {

          const [keys, values] = filteringData;
          const quantityPerValue = 1;
          const productPrice = shoppingData.price;
          const updatePort = ref(database, `addCart/cartItems/${keys}`);
          const ArrayQuantity = [
            Number(values.quantity),
            Number(quantityPerValue),
          ];
          const ArrayPrice = [Number(values.price), Number(productPrice)];

          const TotalQuantity = ArrayQuantity.reduce(
            (arr, curr) => arr + curr,
            0
          );

          const TotalPrice = ArrayPrice.reduce((arr, curr) => arr + curr, 0);
          const addCartArray = [TotalPrice, TotalQuantity];
          if (updatePort) {
            await update(updatePort, {
              quantity: TotalQuantity,
              price: TotalPrice,
            });
            navigate("/AddCart");
          }

          console.log('filteringDataddf', shoppingData);
        }


      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleScroll = () => {
    if (window.scrollY <= 600) {
      setGridMd(6); // Change to 2 columns (md=6) at 600px
      setIsGridMd(true)
    } else {
      setGridMd(4); // Default 3 columns
      setIsGridMd(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    setReviews(shoppingData?.reviews)

  }, [setReviews, shoppingData?.reviews])
  console.log('reviews', reviews);

  const windowHeight = useMediaQuery('(min-width:500px)')
  const { scrollYProgress } = useScroll()
  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <Container>

        <Grid container spacing={2}>

          <Grid md={gridMd} sx={{ bgcolor: 'bisque', mt: 1.4 }}><Slider thumbnail={shoppingData?.thumbnail} images={shoppingData?.images} loading={loading} isGridMd={isGridMd} /></Grid>
          <Grid md={isGridMd ? 5 : 8}>
            <div className="animate__animated animate__fadeIn" style={{ color: 'white' }}>
              {shoppingData?.title ?
                <CardHeader
                  title={<Typography variant="h5" sx={{ fontFamily: 'fantasy', fontSize: 'clamp(1rem, 2vw, 2rem)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '80%', }} >{shoppingData?.title}</Typography>}
                  subheader={
                    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'}>
                      <Typography variant="h6" sx={{ fontFamily: 'sans-serif', color: 'white' }}>{shoppingData?.price}</Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'sans-serif', color: 'whitesmoke', mt: 0.8, ml: 2, fontWeight: 500, textDecoration: 'line-through', }}>{shoppingData?.discountPercentage}</Typography>
                    </Box>}

                  action={
                    <>
                      <Paper sx={{ display: 'flex', flexDirection: 'row', px: 1.6, position: 'relative', right: matches ? 30 : 0, top: 7 }}>
                        <Star sx={{ color: 'yellow', mr: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Rating</Typography>
                        <Typography variant="body2" sx={{ mt: 0.3, ml: 2, fontWeight: 600 }}>{shoppingData?.rating}</Typography>
                      </Paper>
                    </>

                  }
                  sx={{ pt: 4, pl: 4 }}
                /> : titleSkeleton}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{ p: 1, border: '1px solid #ccc', borderRadius: 2, maxWidth: 400, width: 195, ml: 4 }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDecrement}
                      disabled={count <= 1}
                      sx={{ width: 'clamp(1rem, 3.5vw, 2rem)', }}
                    >
                      -
                    </Button>

                    <input
                      value={count}
                      onChange={handleChange}
                      type="number"
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      style={{
                        width: 'clamp(2rem, 3.5vw, 2rem)',
                        textAlign: 'center',
                        color: 'black',
                        WebkitTextFillColor: 'black',
                        WebkitTextOrientation: 'sideways',
                        MozAppearance: 'textfield',
                        WebkitAppearance: 'textfield',
                        padding: '5px 0px',
                        fontSize: 16,
                        fontFamily: 'cursive',
                        fontWeight: 700
                      }}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={6}>

                </Grid>
              </Grid>
              <RadioGroup row sx={{ m: 2, ml: 4 }}>
                <FormControlLabel value="black" control={<Radio sx={{ WebkitBorderBeforeColor: 'teal', color: 'white' }} />} label="Black" />
                <FormControlLabel value="silver" control={<Radio sx={{ WebkitBorderBeforeColor: 'teal', color: 'white' }} />} label="Silver" />
              </RadioGroup>
              <Grid container spacing={2} sx={{ m: 1, mt: 4, mb: 10 }}>
                <Grid md={6} sx={{ display: 'flex', justifyContent: 'start', gap: 2, flexDirection: 'column' }}>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Stock</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Warranty</Typography>

                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Shipping Information</Typography>

                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Availability Status</Typography>

                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Sku</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Weight</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Return Policy</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography >Minimum Order Quantity</Typography>
                  </Box>
                </Grid>

                <Grid md={6} sx={{ display: 'flex', justifyContent: 'start', gap: 2, flexDirection: 'column' }}>
                  {shoppingData.length !== 0 ?
                    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                      <Typography>{shoppingData?.stock}</Typography>
                    </Box>
                    : skeleton}
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography>{shoppingData?.warrantyInformation}</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography>{shoppingData?.shippingInformation}</Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>
                    <Typography>{shoppingData?.availabilityStatus}</Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>

                    <Typography>{shoppingData?.sku}</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>

                    <Typography>{shoppingData?.weight}</Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>

                    <Typography>{shoppingData?.returnPolicy}</Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} ml={4} gap={4}>

                    <Typography>{shoppingData?.minimumOrderQuantity}</Typography>
                  </Box>
                </Grid>
              </Grid>


              <Box sx={{ position: 'sticky', bottom: 20 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 4, mr: titleMatches ? 0 : 19, ml: titleMatches ? 3 : 0 }}>
                  <Button variant="contained"
                    color="primary" fullWidth
                    onClick={handleAddCard}
                    sx={{ width: 200 }}>
                    Add to Cart
                  </Button>
                  <Button variant="contained"
                    color="primary" fullWidth
                    onClick={handleAddCard}
                    sx={{ width: 200 }}>
                    Buy now
                  </Button>
                </Box>
              </Box>

              <ReviewList shoppingData={reviews} />

            </div>

          </Grid>
        </Grid>
        {/* <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }} >
          <Typography variant="h5" sx={{ color: 'wheat' }}>Ratings</Typography>

          
            <Grid md={10} >
              <ReviewList shoppingData={shoppingData?.reviews}/>
            </Grid>

          <Grid md={2}></Grid>
        </Grid> */}
      </Container>
      <Footer />
    </>
  );
};

export default ProductView;





const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const titleSkeleton = [
  <Box sx={{ width: '100%', my: 3, ml: 4, display: 'inline-flex', justifyContent: 'start', flexDirection: 'row', gap: 2 }}>
    <Skeleton width={360} height={50} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={170} height={50} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
  </Box>
]
const skeleton = [
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'stretch', flexDirection: 'column', gap: 1.2 }}>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>

    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
    <Skeleton width={240} height={12} sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular">
      <Typography>.</Typography>
    </Skeleton>
  </Box>
]