import React from 'react'
import './AddCartItems.css'
import { Box, Button, Grid } from '@mui/material'

const AddCartItems = () => {
    return (
        <>
            <Grid spacing={2} container class="master-container">
                <Grid md={8}>
                    <div class="card cart">
                        <label class="title">Your cart</label>
                        <div class="products">
                            <div class="product">
                                <div>
                                    <span>Cheese Burger</span>
                                    <p>Extra Spicy</p>
                                    <p>No mayo</p>
                                </div>
                                <div class="quantity">
                                    <button>
                                        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                                        </svg>
                                    </button>
                                    <label>2</label>
                                    <button>
                                        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                        </svg>
                                    </button>
                                </div>
                                <label class="price small">$23.99</label>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid md={4}>
                    <div class="card coupons">
                        <label class="title">Apply coupons</label>
                        <form class="form">
                            <input type="text" placeholder="Apply your coupons here" class="input_field" />
                            <button>Apply</button>
                        </form>
                    </div>

                    <div class="card checkout">
                        <label class="title">Checkout</label>
                        <div class="details">
                            <span>Your cart subtotal:</span>
                            <span>47.99$</span>
                            <span>Discount through applied coupons:</span>
                            <span>3.99$</span>
                            <span>Shipping fees:</span>
                            <span>4.99$</span>
                        </div>
                        <div class="checkout--footer">
                            <label class="price"><sup>$</sup>57.99</label>
                            <Button class="checkout-btn">Checkout</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default AddCartItems