import React, { useLayoutEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { motion, transform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";

import pic1 from "../../assets/undraw_online-shopping_hgf6-Photoroom.png";
import pic2 from "../../assets/undraw_shopping_a55o-Photoroom.png";
import pic3 from "../../assets/undraw_shopping-bags_nfsf-Photoroom.png";
import { makeStyles } from "@mui/styles";

// ✅ Register ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

const dataFetched = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data;
};

const useStyles = makeStyles({
  pic3f: {},
});

const GsapScrolling = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const pic3Ref = useRef(null);

  const { data, loading, error } = useQuery({
    queryKey: ["product2"],
    queryFn: dataFetched,
  });

  const classes = useStyles();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const element = scrollRef.current;
      const pic31 = pic3Ref.current;
      if (!element || !pic31) return;

      gsap.to(element, {
        x: () => -element.scrollWidth + window.innerWidth, // Move left based on content width
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${element.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true, // Ensures resizing works properly
        },
      });
      gsap.to(pic31, {
        rotation: 360,
        duration: 1,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations on component unmount
  }, [containerRef, scrollRef, pic3Ref]);

  // gsap.to(pic3, {
  //   trigger: containerRef.current,
  //   duration: 2,
  //   x: 100, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
  //   xPercent: -100,
  //   rotation: 360,
  //   yoyo: true,

  //   // or target SVG attributes
  //   attr: {
  //     fill: "#8d3dae",
  //     rx: 50,
  //   },
  // });

  return (
    <Box
      ref={containerRef}
      sx={{
        overflow: "hidden",
        position: "relative",
        height: "100vh",
        width: "300vw",
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 4,
          width: "max-content",
          padding: 4,
        }}
      >
        {/* <img
          className="animate__animated animate__fadeInLeft"
          src={pic1}
          alt=""
          width={600}
          height={600}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            minWidth: "10%",
            minHeight: "60%",
          }}
        /> */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          style={box}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <Typography variant="h4" sx={{ color: "#fff" }}>
              Search anything
              <br /> and
              <br /> get anything
              <br /> because
              <br /> all available here !
            </Typography>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <Typography variant="h5" sx={{ color: "#fff", mt: 2 }}>
                Shop a day
              </Typography>
            </motion.div>
          </Box>

        </motion.div>
        <HoverCard />
        <motion.div
          animate={{ x: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50, x: 0 }} // Start invisible and move up
          whileInView={{ opacity: 1, y: 0, x: 40 }} // Animate when visible
          transition={{ duration: 0.8, ease: "easeOut", type: "spring" }} // Smooth transition
          style={{ width: "300px", height: "200px", borderRadius: "10px" }}
        >
          <img
            className={`animate__animated animate__fadeInUp ${classes.pic3f}`}
            ref={pic3Ref}
            src={pic3}
            alt=""
            width={600}
            height={600}
            style={{
              marginBottom: 140,
            }}
          />
        </motion.div>

        {/* {data?.products?.length > 0 && data
          ? data?.products?.map((item, index) => (
              <div className="brand">
                <Card className="brandImage">
                  <img
                    className="img"
                    src={item?.thumbnail}
                    key={item?.id}
                    id={index}
                    alt=""
                  />
                </Card>
              </div>
            ))
          : null} */}
      </Box>
    </Box>
  );
};

export default GsapScrolling;

const box = {
  width: 400,
  height: 400,
  borderRadius: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function AnimatedItem({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          minWidth: "300px",
          height: "200px",
          bgcolor: index % 2 === 0 ? "#84bbd0" : "#ffdeeb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">Item {index + 1}</Typography>
      </Box>
    </motion.div>
  );
}

function HoverCard() {


  return (
    <motion.div
      class="container noselect animate__animated animate__fadeInRight"
      animate={{ x: 100 }}
      transition={{ type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div
        class="canvas"
        style={{
          marginTop: 12,
          marginRight: 100,
        }}
      >
        <>
          <div class="tracker tr-1"></div>
          <div class="tracker tr-2"></div>
          <div class="tracker tr-3"></div>
          <div class="tracker tr-4"></div>
          <div class="tracker tr-5"></div>
          <div class="tracker tr-6"></div>
          <div class="tracker tr-7"></div>
          <div class="tracker tr-8"></div>
          <div class="tracker tr-9"></div>
          <div class="tracker tr-10"></div>
          <div class="tracker tr-11"></div>
          <div class="tracker tr-12"></div>
          <div class="tracker tr-13"></div>
          <div class="tracker tr-14"></div>
          <div class="tracker tr-15"></div>
          <div class="tracker tr-16"></div>
          <div class="tracker tr-17"></div>
          <div class="tracker tr-18"></div>
          <div class="tracker tr-19"></div>
          <div class="tracker tr-20"></div>
          <div class="tracker tr-21"></div>
          <div class="tracker tr-22"></div>
          <div class="tracker tr-23"></div>
          <div class="tracker tr-24"></div>
          <div class="tracker tr-25"></div>
        </>
        <div id="card">
          <Box id="prompt">
            <CardMedia component={"img"} image={pic1} />
          </Box>

          <Box class="title">
            <CardMedia component={"img"} image={pic2} />
          </Box>
        </div>
      </div>
    </motion.div>
  );
}
