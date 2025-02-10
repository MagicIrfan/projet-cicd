import { Button } from "@mui/material";
import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";

interface RandomCharacterButtonProps {
    regenerateCharacter: () => void;
}

const RandomCharacterButton: React.FC<RandomCharacterButtonProps> = ({ regenerateCharacter }) => (
    <Button
        variant="contained"
        startIcon={<CasinoIcon />}
        sx={{
            backgroundColor: "#b71c1c",
            color: "white",
            "&:hover": { backgroundColor: "#7f0000" },
            fontFamily: "'IM Fell English', serif",
            height: "56px"
        }}
        onClick={regenerateCharacter}
    >
        Create a random character
    </Button>
);

export default RandomCharacterButton;
