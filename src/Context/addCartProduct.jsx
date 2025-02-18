"use client"

import { motion } from "framer-motion"
import { Card, CardContent, IconButton } from "@mui/material"
import { Favorite, ShoppingCart } from "@mui/icons-material"
import pic1 from '../assets/undraw_online-shopping_hgf6-Photoroom.png'
import pic2 from '../assets/undraw_shopping_a55o-Photoroom.png'
import pic3 from '../assets/undraw_shopping-bags_nfsf-Photoroom.png'

const products = [
    {
        id: 1,
        name: "Brick cage",
        price: 129,
        brand: "Nike",
        image: pic1,
    },
    {
        id: 2,
        name: "Uncertainty of colors",
        price: 129,
        brand: "Nike",
        image: pic2,
    },
    {
        id: 3,
        name: "White marble",
        price: 129,
        brand: "Nike",
        image: pic3,
    },
    {
        id: 4,
        name: "Black Panther",
        price: 129,
        brand: "Nike",
        image: pic1,
        discount: "-30%",
    },
]

export default function ProductGrid() {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">New arrivals</h2>
                    <button className="text-sm text-gray-600">All products</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="relative">
                                {product.discount && (
                                    <span className="absolute top-2 right-2 bg-[#9AE364] text-black px-2 py-1 rounded-full text-sm">
                                        {product.discount}
                                    </span>
                                )}
                                <IconButton className="absolute top-2 left-2 text-gray-400 hover:text-red-500" size="small">
                                    <Favorite />
                                </IconButton>
                                <CardContent>
                                    <div className="aspect-square relative mb-4">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{product.name}</h3>
                                            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold">${product.price}</span>
                                            <IconButton className="bg-black text-white hover:bg-[#9AE364] hover:text-black" size="small">
                                                <ShoppingCart fontSize="small" />
                                            </IconButton>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

