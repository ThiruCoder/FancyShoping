import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import BoltHeader from './BoltHeader';
import BoltProductCard from './ProductCard';
import Footer from './Footer';



export default function HeroSection() {
    const heroRef = useRef(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.from(heroRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
            });
        }
    }, []);

    return (
        <>
            <BoltHeader />
            <Box
                ref={heroRef}
                sx={{

                    color: 'black',
                    py: 8,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >

                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h1"
                            className="animate__animated animate__fadeInDown"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Summer Tech Sale
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Typography
                            variant="h5"
                            className="animate__animated animate__fadeInUp"
                            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
                        >
                            Up to 40% off on the latest gadgets and electronics. Limited time offer!
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="animate__animated animate__pulse animate__infinite"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                textTransform: 'none',
                            }}
                        >
                            Shop Now
                        </Button>
                    </motion.div>
                </Container>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070)',
                        backgroundSize: 'cover',
                        opacity: 0.1,
                        zIndex: 0,
                    }}
                />
            </Box>
            <BoltProductCard />
            <Footer />
        </>

    );
}