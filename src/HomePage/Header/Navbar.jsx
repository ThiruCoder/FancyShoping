import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  const [navigator, setNavigator] = useState(0);

  const maches = useMediaQuery("(max-width:830px)");

  const navbarList = [
    "Grosaries",
    "Electronics",
    "ProductView",
    "Accesories",
    "Cart Page",
    "LogIn",
  ];
  const navigate = useNavigate();

  return (
    <header>
      <Stack>
        <Card
          sx={{
            display: "flex",
            margin: "8px",
            padding: "12px",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <h6
            style={{
              position: "absolute",
              fontSize: "10px",
              top: "30px",
              left: "26px",
              letterSpacing: "2px",
              color: "gray",
            }}
          >
            Made By Thirumal
          </h6>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{

                background:
                  "linear-gradient(90deg, rgba(34,2,71,1) 18%, rgba(150,26,218,0.9119514016544118) 79%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                fontWeight: "700",
                fontSize: "2em",
              }}
            >
              The
            </Typography>
            <Typography
              sx={{

                background:
                  "linear-gradient(90deg, rgba(26,89,218,0.7999065837272409) 8%, rgba(34,2,71,1) 63%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                fontWeight: "700",
                fontSize: "2em",
              }}
            >
              Shopsy
            </Typography>
          </Box>
          {maches ? (
            <SideNavbar />
          ) : (
            <Box
              sx={{
                maxWidth: { xm: "320", sm: "480" },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                // onChange={handleChange}
                // value={navigator}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Navigator"
              >
                <NavLink to="/" activeClassName="active" exact>
                  <Tab label={navbarList[0]} />
                </NavLink>
                <NavLink to='/HeroSection'>
                  <Tab label={navbarList[1]} />
                </NavLink>

                <NavLink to="/ProductDetails"
                  sx={{ color: navbarList[4] ? "green" : "red" }}>
                  <Tab label={navbarList[2]} />
                </NavLink>

                <Button onClick={() => navigate('/')}>AddToCartPage</Button>
                {/* <NavLink to="/ScrollBody">
                  <Tab label={navbarList[3]} />
                </NavLink> */}

                <Button onClick={() => navigate("/Carousel")}>Carousel</Button>
                <NavLink
                  to="/AddCart"
                  sx={{ color: navbarList[4] ? "green" : "red" }}
                >
                  <Tab label={navbarList[4]} />
                </NavLink>
                <NavLink to="/LogInForm">
                  <Tab label={navbarList[5]} />
                </NavLink>
              </Tabs>
            </Box>
          )}
        </Card>
      </Stack>
    </header>
  );
};

export default Navbar;
