import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Link,
    Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.dark',
                color: 'white',
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                ShopVista
                            </Typography>
                            <Typography variant="body2">
                                Your one-stop shop for all things tech.
                            </Typography>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Quick Links
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {['About Us', 'Contact', 'Blog'].map((item) => (
                                    <Box component="li" key={item} sx={{ mb: 1 }}>
                                        <Link
                                            href="#"
                                            color="inherit"
                                            sx={{
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' },
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Customer Service
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {[
                                    'Shipping Policy',
                                    'Returns & Exchanges',
                                    'FAQ',
                                ].map((item) => (
                                    <Box component="li" key={item} sx={{ mb: 1 }}>
                                        <Link
                                            href="#"
                                            color="inherit"
                                            sx={{
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' },
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Newsletter
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Subscribe to get special offers and updates.
                            </Typography>
                            <Box component="form" noValidate>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter your email"
                                    size="small"
                                    sx={{
                                        bgcolor: 'white',
                                        borderRadius: 1,
                                        mb: 2,
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Subscribe
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
                    © 2025 ShopVista. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}