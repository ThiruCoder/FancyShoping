import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Skeleton, Typography, Button, Rating, Avatar, CardHeader, Divider, useMediaQuery, } from '@mui/material';
import { color, motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { title } from 'framer-motion/client';


const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely amazing experience! The service exceeded all my expectations.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        date: "March 1, 2024"
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 4,
        comment: "Great product, very satisfied with the quality and delivery time.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        date: "February 28, 2024"
    },
    {
        id: 3,
        name: "Emily Davis",
        rating: 5,
        comment: "Outstanding customer service and fantastic results. Highly recommend!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        date: "February 27, 2024"
    },
    {
        id: 4,
        name: "David Wilson",
        rating: 5,
        comment: "Couldn't be happier with my purchase. Will definitely come back!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        date: "February 26, 2024"
    }
];


const ReviewList = ({ shoppingData }) => {
    React.useEffect(() => {
        gsap.from('.review-card', { opacity: 0, y: 50, duration: 1, stagger: 0.2 });
    }, []);
    const [bgColor, setBgColor] = useState('#ffffff');


    const matches = useMediaQuery('(min-width:645px)')

    if (!shoppingData) return <h2>No data Available</h2>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 " style={{ color: 'white', }}>


            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-2">
                <div className="max-w-6xl mx-auto" style={{ margin: matches ? 40 : 0 }}>
                    <Typography variant="h5" component="h5" className="text-center mb-12 animate__animated animate__fadeIn">
                        Customer Reviews
                    </Typography>

                    <div className="relative" >
                        <motion.div
                            initial={{ opacity: 0, transform: 'translateY(20px)' }}
                            animate={{ opacity: 1, transform: 'translateY(0)' }}

                            style={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {shoppingData.map((review) => (
                                <Card key={review.id} className="animate__animated animate__fadeIn" sx={{ mt: 1, width: matches ? '100%' : '80%' }}>
                                    <Box className="flex items-start space-x-4" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Box>
                                            <CardHeader avatar={
                                                <Avatar
                                                    src={review?.avatar}
                                                    alt={review?.reviewerName}
                                                    className="w-12 h-12"
                                                />}
                                                title={<Typography variant="h6" component="h2">
                                                    {review?.reviewerName}
                                                </Typography>}
                                                subheader={
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 1 }}>
                                                        <Typography>{review?.reviewerEmail}</Typography>
                                                        <Divider orientation='vertical' />
                                                        <hr />
                                                        <Typography variant="caption" color="text.secondary" ml={1} mt={0.2} className="block mt-2">
                                                            {new Date(review?.date).toLocaleDateString()}

                                                        </Typography>
                                                    </Box>}
                                            />
                                        </Box>

                                        <Box sx={{ mt: 3, mx: 4, position: 'relative', right: matches ? 20 : 100 }}>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <CardContent className="relative">
                                        <Typography variant="body2" color="text.secondary" className="mt-4">
                                            {review.comment}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;


const skeleton = [
    <Box
        sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <Skeleton
            sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
            variant="rectangular"
            width={490}
            height={380}

        />
    </Box>
]

const fadeIn = ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },


});






