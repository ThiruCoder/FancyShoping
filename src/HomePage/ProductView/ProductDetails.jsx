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
    Radio,
    RadioGroup,
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Slider from "./Slider ";



const ProductDetails = () => {
    const [quantity, setQuantity] = useState('')
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

    const matches = useMediaQuery("(min-width:996px)");
    const titleMatches = useMediaQuery("(min-width:676px)");

    const [rating, setRating] = useState(null);
    const navigate = useNavigate();
    // const [error, setError] = useState(null);

    const dispatch = useDispatch()

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





    return (
        <>
            <Navbar />
            <Container>

                <Grid container spacing={2}>
                    <Grid md={7}><Slider /></Grid>
                    <Grid md={5}>
                        <div className="animate__animated animate__fadeIn" style={{ color: 'white' }}>
                            <Typography variant="h4" gutterBottom>
                                MOMENTUM<sup>&reg;</sup> Wireless Black
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Wireless headphones with integrated microphone
                            </Typography>
                            <Typography variant="h6" color="error" gutterBottom>
                                $499.95
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={quantity}
                                        sx={{ color: 'white' }}
                                        onChange={(e) => onQuantityChange(Number(e.target.value) - quantity)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained"
                                        color="primary" fullWidth
                                        onClick={handleAddCard}>
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </Grid>
                            <RadioGroup row>
                                <FormControlLabel value="black" control={<Radio />} label="Black" />
                                <FormControlLabel value="silver" control={<Radio />} label="Silver" />
                            </RadioGroup>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </>

    );
};

export default ProductDetails;