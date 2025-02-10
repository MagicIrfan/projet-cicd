import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useCharacterClasses } from "../hooks/useCharacterClasses";
import { useCompareClasses } from "../hooks/useCompareClasses";
import ClassSelector from "../components/ClassSelector";
import ClassComparisonTable from "../components/ClassComparisonTable";

const CompareClasses: React.FC = () => {
    const { classnames } = useCharacterClasses();
    const [class1, setClass1] = useState<string>("");
    const [class2, setClass2] = useState<string>("");

    useEffect(() => {
        if (classnames && classnames.length > 1) {
            setClass1(classnames[0].toLowerCase());
            setClass2(classnames[1].toLowerCase());
        }
    }, [classnames]);

    const { comparedClasses, loading: loadingComparison} = useCompareClasses(class1, class2);

    return (
        <Box sx={{ padding: 4, textAlign: "center", backgroundColor: "#1e1e1e", color: "#e0c097", minHeight: "100vh" }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: "'IM Fell English', serif", top: 80 }}>
                Character classes comparison
            </Typography>

            {classnames && (
                <ClassSelector classnames={classnames} class1={class1} class2={class2} setClass1={setClass1} setClass2={setClass2} />
            )}

            {loadingComparison && (
                <Box sx={{ backgroundColor: "#3e2723", color: "white", maxWidth: 800, margin: "auto" }}>
                    <Skeleton variant="rectangular" width="100%" height={400} sx={{ marginBottom: 2 }} />
                    <Skeleton variant="text" width="30%" sx={{ marginBottom: 1 }} />
                    <Skeleton variant="text" width="30%" sx={{ marginBottom: 1 }} />
                    <Skeleton variant="text" width="30%" sx={{ marginBottom: 1 }} />
                </Box>
            )}

            {comparedClasses && <ClassComparisonTable comparedClasses={comparedClasses} />}
        </Box>
    );
};

export default CompareClasses;
