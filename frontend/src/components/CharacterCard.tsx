import { Card, CardContent, Typography, Button, Box, Collapse, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import {Character} from "../types/character.model.ts";
import {Equipment} from "../types/equipment.model.ts";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface CharacterCardProps {
    character: Character;
    showEquipments: boolean;
    setShowEquipments: React.Dispatch<React.SetStateAction<boolean>>;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, showEquipments, setShowEquipments }) => (
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
                {showEquipments ? "Hide equipment" : "Show equipment"}
            </Button>

            <Collapse in={showEquipments} timeout="auto">
                <Box sx={{ minHeight: 100, overflow: "hidden" }}>
                    <List>
                        {character.equipments.map((equip: Equipment, index: number) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={`${equip.name} (x${equip.quantity})`}
                                    secondary={`Category: ${equip.category}`}
                                    sx={{
                                        "& .MuiListItemText-secondary": {
                                            color: "white"
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Collapse>
        </CardContent>
    </Card>
);

export default CharacterCard;
