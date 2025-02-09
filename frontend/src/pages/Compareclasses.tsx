import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Données des classes
const classStats = {
    Guerrier: { vie: 100, attaque: 8, défense: 7, magie: 2 },
    Mage: { vie: 60, attaque: 4, défense: 3, magie: 10 },
    Rôdeur: { vie: 80, attaque: 7, défense: 5, magie: 4 },
    Voleur: { vie: 70, attaque: 6, défense: 4, magie: 3 },
    Clerc: { vie: 85, attaque: 5, défense: 6, magie: 8 },
    Barbare: { vie: 120, attaque: 9, défense: 6, magie: 1 }
};

const CompareClasses: React.FC = () => {
    const [class1, setClass1] = useState<string>("Guerrier");
    const [class2, setClass2] = useState<string>("Mage");

    return (
        <Box sx={{ padding: 4, textAlign: "center", backgroundColor: "#1e1e1e", color: "#e0c097", minHeight: "100vh" }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: "'IM Fell English', serif" }}>
                Comparaison des Classes
            </Typography>

            {/* Sélection des classes */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 4 }}>
                <Select
                    value={class1}
                    onChange={(e) => setClass1(e.target.value)}
                    sx={{ color: "white", backgroundColor: "#3e2723", fontFamily: "'IM Fell English', serif" }}
                >
                    {Object.keys(classStats).map((classe) => (
                        <MenuItem key={classe} value={classe}>{classe}</MenuItem>
                    ))}
                </Select>

                <Select
                    value={class2}
                    onChange={(e) => setClass2(e.target.value)}
                    sx={{ color: "white", backgroundColor: "#3e2723", fontFamily: "'IM Fell English', serif" }}
                >
                    {Object.keys(classStats).map((classe) => (
                        <MenuItem key={classe} value={classe}>{classe}</MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Tableau comparatif */}
            <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", backgroundColor: "#3e2723" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>Caractéristique</TableCell>
                            <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>{class1}</TableCell>
                            <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>{class2}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(classStats[class1]).map((stat) => (
                            <TableRow key={stat}>
                                <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>{stat}</TableCell>
                                <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>{classStats[class1][stat]}</TableCell>
                                <TableCell sx={{ color: "#e0c097", fontFamily: "'IM Fell English', serif" }}>{classStats[class2][stat]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CompareClasses;
