import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.jpg";

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#3e2723" }}>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{ height: 50, width: "auto", marginRight: 10, cursor: "pointer" }}
                        />
                    </Link>
                </Box>

                <Button
                    color="inherit"
                    component={Link}
                    to="/compare"
                    sx={{
                        fontFamily: "'IM Fell English', serif",
                        color: "#e0c097",
                        "&:hover": {
                            color: "#ffb74d",
                            backgroundColor: "transparent"
                        }
                    }}
                >
                    Compare character classes
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
