import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../Header/Navbar";
import { FetchableContext } from "../../Context/Context";
import { get, ref, remove, set, update } from "firebase/database";
import * as motion from "motion/react-client"
import { database } from "../../Firebase/FirebaseConfig";
import AddCartItems from "./AddCartItems";
import { makeStyles } from "@mui/styles";
import { color } from "framer-motion";
import { Add, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from "react-redux";
import { decQuantity, incQuantity, RemoveAll, RemoveItemFromStore } from "../../ReduxPage/ReduxActions/Slicer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    '&:hover': {
      color: 'red'
    }
  }
})


const AddCart = () => {
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isremove, setIsRemove] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cardItems, setCardItems] = useState([])
  const { cartItem, addCart, totalArray } = useContext(FetchableContext);
  const [total, setTotal] = useState(null)
  const [decreaseLimit, setDecreaseLimit] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { dataProduct1 } = useSelector(state => state.addItem)
  console.log('dataProduct1', dataProduct1);



  useEffect(() => {
    async function getItems() {
      const refTransactionData = ref(database, "addCart/cartItems");
      const getItem = await get(refTransactionData);
      try {
        if (getItem.exists()) {
          const objTransactionData = Object.values(getItem.val());
          setCardItems(objTransactionData)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getItems()
    setCardItems(dataProduct1)
  }, [dataProduct1, addCart, setCardItems])


  // useEffect(() => {
  //   async function getItems() {
  //     const refTransactionData = ref(database, "addCart/cartItems");
  //     const getItem = await get(refTransactionData);
  //     try {
  //       if (getItem.exists()) {
  //         const objTransactionData = Object.values(getItem.val());
  //         if (objTransactionData) {
  //           const filteringContext = objTransactionData?.filter(ite => ite?.id === addCart?.id)
  //           console.log(filteringContext);
  //           setCardItems(addCart);
  //         }

  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getItems()
  // }, [addCart])



  const classes = useStyles()
  const btnRef = useRef()

  useEffect(() => {

  }, [])

  async function handleRemoveAll() {


    const refTransactionData = ref(database, "addCart/cartItems");
    await remove(refTransactionData)
    dispatch(RemoveAll())

    const updatedSnapshot = await get(refTransactionData);
    if (!updatedSnapshot.exists()) {
      // 🟡 If empty, keep the folder with an empty object
      await set(refTransactionData, '');
      console.log('Cart folder retained as empty.');
    }
  }

  async function handleRemove(itemId) {
    const refTransactionData = ref(database, "addCart/cartItems");
    const getItem = await get(refTransactionData);

    if (getItem.exists()) {
      const objTransactionData = Object.entries(getItem.val());
      const getEntries = objTransactionData.find(([Keys, values]) => values?.id === itemId)
      console.log(getEntries);

      try {
        if (getEntries) {
          const [keys] = getEntries
          const itemRef = ref(database, `addCart/cartItems/${keys}`)
          await remove(itemRef)

          dispatch(RemoveItemFromStore(itemId))
          const updatedSnapshot = await get(refTransactionData);
          if (!updatedSnapshot.exists()) {
            // 🟡 If empty, keep the folder with an empty object
            await set(refTransactionData, '');
            console.log('Cart folder retained as empty.');
          }
        }
      } catch (error) {
        console.log('addcart error', error);
      }
    } else {

      console.log('Folder created successfully!');
    }

  }


  useEffect(() => {
    const ArrayAddCart = Array.isArray(cardItems) ? cardItems : [cardItems];
    const totalPriceMap = ArrayAddCart.map((item) => item?.price * item?.quantity);
    const totalPriceReduce = totalPriceMap.reduce((arr, curr) => arr + curr, 0);

    const totalQuantityMap = ArrayAddCart.map((item) => item?.quantity);
    const totalQuantityReduce = totalQuantityMap.reduce(
      (arr, curr) => arr + curr,
      0
    );
    const totalPrice = totalPriceReduce

    setTotalQuantity(totalQuantityReduce);
    setTotalPrice(totalPrice.toFixed(2));
  }, [cardItems]);


  async function increaseQuantity(itemId) {

    const refTransactionData = ref(database, "addCart/cartItems");
    const getItem = await get(refTransactionData);

    if (getItem.exists()) {
      const objTransactionData = Object.entries(getItem.val());
      const getEntries = objTransactionData.find(([_, values]) => values?.id === itemId)

      if (getEntries) {
        const [keys, values] = getEntries
        const itemRef = ref(database, `addCart/cartItems/${keys}`)
        const incQuantityItem = Number(values?.quantity || 0) + 1


        await update(itemRef, {
          quantity: incQuantityItem
        })
        // dispatch(UpdateItemQuantity({ id: itemId, quantity: incQuantityItem }));
        dispatch(incQuantity(itemId))

      }
    }
  }

  async function decreaseQuantity(itemId) {

    const refTransactionData = ref(database, "addCart/cartItems");
    const getItem = await get(refTransactionData);

    if (getItem.exists()) {
      const objTransactionData = Object.entries(getItem.val());
      const getEntries = objTransactionData.find(([_, values]) => values?.id === itemId)

      if (getEntries) {
        const [keys, values] = getEntries
        const itemRef = ref(database, `addCart/cartItems/${keys}`)
        const incQuantityItem = Number(values?.quantity) - 1

        if (incQuantityItem > 0) {
          await update(itemRef, {
            quantity: incQuantityItem
          })
          dispatch(decQuantity(itemId))
          // dispatch(UpdateItemQuantity({ id: itemId, quantity: incQuantityItem }));

        } else {
          setDecreaseLimit(false)
        }



      }
    }

  }




  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const matches = useMediaQuery("(min-width: 600px)")

  // function handleDecrease() {
  //   btnRef.current.style.scale = 1.4
  // }
  return (
    <div>
      {<Navbar />}
      {/* {loading ? <LinearProgress /> : null} */}

      <Box mt={6}>
        <Container>
          <Grid spacing={1} container>


            <Grid container spacing={2}>

              <Grid md={8} lg={8} sm={8} xs={8}>
                {cardItems?.length > 0 ? (
                  cardItems?.map((item, index) => (
                    <>
                      <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', mb: 2, pl: 4, height: matches ? 100 : 70 }}>
                        <Box style={removerHeader}>
                          <motion.button style={remover}
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ opacity: 0.8, scale: 1.2, color: 'rgb(255, 0, 0)', cursor: 'pointer' }}
                            whileTap={{ color: 'rgb(255, 0, 0)' }}
                            transition={{
                              duration: 0.2,
                              scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
                            }}
                            onClick={() => handleRemove(item?.id)}

                          ><HighlightOffIcon sx={{ color: '#31473A', fontSize: 30 }} /></motion.button>
                        </Box>
                        <Box><CardMedia component={'img'} sx={{ width: matches ? 100 : 80, height: matches ? 100 : 70 }} image={item?.thumbnail} key={item?.id} /></Box>

                        <CardHeader sx={{
                          display: 'flex', justifyContent: 'end', width: 460, overlay: "auto", overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",

                        }} key={item?.id} id={index} title={item?.title} subheader={`₹ ${item?.price ? Number(item?.price).toFixed(2) : ' 0.00'}`} />

                        <Box aria-label="minMax" sx={{ display: 'flex', flexDirection: 'row', position: 'relative', top: 35, gap: 1.4, right: 20 }}>
                          <motion.button initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, }}
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.1 },
                              x: 2,
                              cursor: 'pointer'
                            }}

                            onClick={item?.quantity > 0 ? () => decreaseQuantity(item?.id) : null}
                            whileTap={{ scale: 0.9, rotate: 3, }}
                            transition={{
                              duration: 0.2,
                              scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
                            }}

                            style={ball}>-
                            {/* <button ref={btnRef} onClick={handleDecrease} style={{}} className={`${classes.btn}`}>-</button> */}
                          </motion.button>


                          <Typography variant="body1">{item?.quantity}</Typography>

                          <motion.button initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, }}
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.1 },
                              x: 2,
                              cursor: 'pointer'
                            }}
                            onClick={() => increaseQuantity(item?.id)}
                            whileTap={{ scale: 0.9, rotate: 3, }}
                            transition={{
                              duration: 0.2,
                              scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
                            }}
                            style={ball}>+
                            {/* <button ref={btnRef} onClick={handleDecrease} style={{}} className={`${classes.btn}`}>-</button> */}
                          </motion.button>
                        </Box>

                        <Box></Box>
                      </Card>
                      {/*  */}
                    </>
                  ))
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography variant="h4" sx={{ color: '#fff' }}>No items in cart</Typography ></Box>

                )}
              </Grid>

              <Grid md={4} lg={4} sm={4} xs={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Card sx={{ width: '98%', ml: 2, position: 'sticky', top: 2 }}>
                      <Box>
                        <CardHeader title={`Total Items in cart`} subheader={`Total quentity`} action={
                          <Button onClick={handleRemoveAll}>Remove all</Button>
                        } />

                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'start', }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 3 }}>

                            <Typography>Quantity</Typography>

                            <Typography>Total amount</Typography>
                          </Box>
                          <Divider orientation="horizontal" />
                          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 3, pb: 3.3 }}>
                            <Box sx={{ ml: 5, display: 'flex', justifyContent: 'start', flexDirection: 'row', gap: 2 }}>

                              <Typography variant="body1">{totalQuantity}</Typography>

                            </Box>
                            <Typography variant="body1" sx={{ ml: 5 }}>₹ {totalPrice}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, mx: 6, my: 5 }}>
                    <Button variant="contained" sx={{ width: 150 }} onClick={handleBack}>Back</Button>
                    <Button variant="contained" sx={{ width: 150 }} onClick={() => navigate('/')}>Home</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>


          </Grid>
          {" "}
        </Container>

        {/* <AddCartItems /> */}
      </Box>
    </div >

  );
};

export default AddCart;

const remover = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  width: 28,
  height: 30,
  backgroundColor: 'transparent',
  border: 'none'
}

const removerHeader = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
}

const ball = {
  width: '30px',
  height: '30px',
  backgroundColor: 'transparent',
  border: '2px solid blue',
  borderRadius: '50%',
  fontWeight: 700,
  transition: '0.4s ease-in',
}