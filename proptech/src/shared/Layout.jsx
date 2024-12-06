import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Layout() {

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;