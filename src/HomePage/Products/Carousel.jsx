import { Card, CardMedia } from "@mui/material";
"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@mui/material"
import { ChevronLeft, ChevronRight, Search } from "@mui/icons-material"
import pic1 from '../../assets/undraw_shopping-bags_nfsf-Photoroom.png'
import './forCss.css'

export default function Carousel() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-shoe", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative bg-[#1C1C1C] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-6">
            <CardMedia
              src={pic1}
              alt="Pyrim Logo"
              width={100}
              height={40}
              className="object-contain"
            />
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white/80 hover:text-white">
                Home
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                Store
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                Women
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                Contacts
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">ENG</span>
            <Search className="text-[#9AE364]" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.h1
              className="hero-text text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Design & high quality
            </motion.h1>
            <motion.p
              className="hero-text text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Sale of high-quality branded sneakers in a wide range with unique designs
            </motion.p>
            <div className="hero-text flex space-x-4">
              <Button variant="contained" className="bg-[#9AE364] hover:bg-[#8ACE55] text-black px-8 py-3 rounded-full">
                Open Store
              </Button>
              <Button variant="outlined" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full">
                Explore More
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="hero-shoe relative">
              <CardMedia
                src={pic1}
                alt="Green Jordan Sneaker"
                width={600}
                height={400}
                className="object-contain"
              />
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">$129</div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between">
              <button className="bg-white/10 p-2 rounded-full">
                <ChevronLeft />
              </button>
              <button className="bg-white/10 p-2 rounded-full">
                <ChevronRight />
              </button>
            </div>

            {/* Feature Badge */}
            <div className="absolute top-1/2 right-4 bg-white p-4 rounded-xl shadow-lg animate__animated animate__fadeInRight">
              <div className="text-black">
                <span className="text-2xl font-bold text-[#9AE364]">50+</span>
                <p className="text-sm">
                  types with a<br />
                  unique design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="#9AE364"
            fillOpacity="0.3"
          />
        </svg>
      </div>
    </div>
  )
}

