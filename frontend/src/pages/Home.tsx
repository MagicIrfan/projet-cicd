import React, { useState } from "react";
import { Button, Card, CardContent, Typography, List, ListItem, ListItemText, Box, Collapse } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface Equipment {
    name: string;
    quantity: number;
    category: string;
}

export interface Character {
    race: string;
    class: string;
    equipments: Equipment[];
}

const races = ["Elfe", "Nain", "Humain", "Orc", "Demi-Elfe", "Gnome"];
const classes = ["Guerrier", "Mage", "Rôdeur", "Voleur", "Clerc", "Barbare"];
const equipmentList: Equipment[] = [
    { name: "Épée longue", quantity: 1, category: "Arme" },
    { name: "Bâton magique", quantity: 1, category: "Arme" },
    { name: "Arc court", quantity: 1, category: "Arme" },
    { name: "Potion de soin", quantity: 2, category: "Consommable" },
    { name: "Bouclier en fer", quantity: 1, category: "Armure" },
    { name: "Tunique en cuir", quantity: 1, category: "Armure" },
    { name: "Sac de rations", quantity: 5, category: "Divers" },
];

const generateRandomCharacter = (): Character => {
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomEquipments = Array.from({ length: 3 }, () =>
        equipmentList[Math.floor(Math.random() * equipmentList.length)]
    );

    return { race: randomRace, class: randomClass, equipments: randomEquipments };
};

const Home: React.FC = () => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [showEquipments, setShowEquipments] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#1e1e1e",
                color: "#e0c097",
                fontFamily: "'IM Fell English', serif",
                position: "relative",
                padding: "20px"
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontFamily: "'IM Fell English', serif",
                    position: "absolute",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                Donjons & Dragons - Création de Personnage
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 10 }}>
                {character && (
                    <Card
                        sx={{
                            maxWidth: 500,
                            backgroundColor: "#3e2723",
                            color: "#e0c097",
                            boxShadow: 8,
                            border: "2px solid #b71c1c",
                            textAlign: "center",
                            fontFamily: "'IM Fell English', serif"
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {character.race} {character.class}
                            </Typography>

                            {/* Bouton pour afficher/masquer l'équipement */}
                            <Button
                                variant="contained"
                                startIcon={<VisibilityIcon />}
                                sx={{
                                    backgroundColor: "#6d4c41",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#3e2723" },
                                    fontFamily: "'IM Fell English', serif",
                                    mb: 2
                                }}
                                onClick={() => setShowEquipments(!showEquipments)}
                            >
                                {showEquipments ? "Masquer l'équipement" : "Afficher l'équipement"}
                            </Button>

                            <Collapse in={showEquipments} timeout="auto">
                                <Box sx={{ minHeight: 100, overflow: "hidden" }}>
                                    <List>
                                        {character.equipments.map((equip, index) => (
                                            <ListItem key={index} divider>
                                                <ListItemText
                                                    primary={`${equip.name} (x${equip.quantity})`}
                                                    secondary={`Catégorie: ${equip.category}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Collapse>
                        </CardContent>
                    </Card>
                )}

                <Button
                    variant="contained"
                    startIcon={<CasinoIcon />}
                    sx={{
                        backgroundColor: "#b71c1c",
                        color: "white",
                        "&:hover": { backgroundColor: "#7f0000" },
                        fontFamily: "'IM Fell English', serif",
                        height: "56px" // Alignement avec la carte
                    }}
                    onClick={() => {
                        setCharacter(generateRandomCharacter());
                        setShowEquipments(false);
                    }}
                >
                    Créer un personnage aléatoire
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
