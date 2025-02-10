import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

const LoadingSkeleton: React.FC = () => (
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
            <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
        </CardContent>
    </Card>
);

export default LoadingSkeleton;
