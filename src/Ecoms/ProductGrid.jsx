import React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Rating,
    Box,
    Container,
} from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';

const products = [
    {
        id: 1,
        title: "Professional Camera Kit",
        price: 1299.99,
        category: "Photography",
        rating: 5,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000"
    },
    {
        id: 2,
        title: "Wireless Headphones",
        price: 199.99,
        category: "Audio",
        rating: 4,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"
    },
    {
        id: 3,
        title: "Smart Watch",
        price: 299.99,
        category: "Wearables",
        rating: 4,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000"
    },
    {
        id: 4,
        title: "Gaming Laptop",
        price: 1499.99,
        category: "Computers",
        rating: 5,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function ProductGrid() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography
                variant="h2"
                component="h2"
                className="gsap-fade-in"
                sx={{ mb: 4, textAlign: 'center' }}
            >
                Featured Products
            </Typography>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <motion.div variants={itemVariants}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            display: 'flex',
                                            gap: 1,
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                bgcolor: 'white',
                                                '&:hover': { bgcolor: 'white' },
                                            }}
                                        >
                                            <Favorite color="secondary" />
                                        </IconButton>
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {product.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {product.category}
                                        </Typography>
                                        <Rating value={product.rating} readOnly />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mt: 2,
                                            }}
                                        >
                                            <Typography variant="h6" color="primary">
                                                ${product.price}
                                            </Typography>
                                            <IconButton color="primary">
                                                <ShoppingCart />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Container>
    );
}