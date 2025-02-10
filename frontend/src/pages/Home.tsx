import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRandomCharacter } from "../hooks/useRandomCharacter";
import LoadingSkeleton from "../components/LoadingSkeleton";
import CharacterCard from "../components/CharacterCard";
import RandomCharacterButton from "../components/RandomCharacterButton";

const Home: React.FC = () => {
    const [showEquipments, setShowEquipments] = useState(false);
    const { character, loading, error, regenerateCharacter } = useRandomCharacter();

    if (error) return <div>Error: {error}</div>;

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
                    top: 80,
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                Character creation
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 10 }}>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    character && (
                        <CharacterCard
                            character={character}
                            showEquipments={showEquipments}
                            setShowEquipments={setShowEquipments}
                        />
                    )
                )}

                <RandomCharacterButton regenerateCharacter={regenerateCharacter} />
            </Box>
        </Box>
    );
};

export default Home;
