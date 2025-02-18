import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';

const products = { title: 'Product', price: 36, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', category: 'design', rating: 3.9 }

const BoltProductCard = () => {
    return (
        <Card className="rounded-2xl shadow-md transition-transform hover:scale-105">
            <Box position="relative">
                <CardMedia
                    component="img"
                    height="200"
                    image={products.image}
                    alt={products.title}
                    className="object-cover"
                />
                <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'white' }}
                >
                    <FavoriteBorder fontSize="small" />
                </IconButton>
            </Box>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {products.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    {products.category}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                        {'★'.repeat(products.rating) + '☆'.repeat(5 - products.rating)} ({products.rating}.0)
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${products.price.toFixed(2)}
                    </Typography>
                </Box>
                <IconButton
                    color="primary"
                    sx={{ mt: 1, borderRadius: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                >
                    <ShoppingCart fontSize="small" sx={{ color: 'white' }} />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default BoltProductCard;
