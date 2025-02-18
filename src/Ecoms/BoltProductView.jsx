import React from 'react';
import { Heart, Share2, ShoppingCart } from 'lucide-react';

const ProductViewProps = {
    title: string,
    price: number,
    description: string,
    images: string,
}

export function BoltProductView({ title, price, description, images }) {
    const [selectedImage, setSelectedImage] = React.useState(0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image gallery */}
                <div className="flex flex-col">
                    <div className="w-full aspect-square rounded-lg overflow-hidden">
                        <img
                            src={images[selectedImage]}
                            alt={title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-md overflow-hidden ${selectedImage === index
                                        ? 'ring-2 ring-indigo-500'
                                        : 'ring-1 ring-gray-200'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-cover object-center"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">
                            ${price.toFixed(2)}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div className="space-y-6 text-base text-gray-700">
                            {description}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col space-y-4">
                        <button className="flex-1 bg-indigo-600 text-white px-8 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </button>

                        <div className="flex space-x-4">
                            <button className="flex-1 border border-gray-300 px-8 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span>Save</span>
                            </button>
                            <button className="flex-1 border border-gray-300 px-8 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}