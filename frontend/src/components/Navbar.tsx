import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#3e2723" }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/" sx={{ fontFamily: "'IM Fell English', serif" }}>
                    Accueil
                </Button>
                <Button color="inherit" component={Link} to="/compare" sx={{ fontFamily: "'IM Fell English', serif" }}>
                    Comparer des classes
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
