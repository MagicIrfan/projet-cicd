import React from "react";
import { Box, Select, MenuItem} from "@mui/material";

const ClassSelector: React.FC<{ classnames: string[], class1: string, class2: string, setClass1: (value: string) => void, setClass2: (value: string) => void }> = ({ classnames, class1, class2, setClass1, setClass2 }) => (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 4 }}>
        <Select
            value={class1}
            onChange={(e) => setClass1(e.target.value)}
            sx={{ color: "white", backgroundColor: "#3e2723", fontFamily: "'IM Fell English', serif" }}
        >
            {classnames.map((classname: string) => (
                <MenuItem key={classname} value={classname.toLowerCase()}>{classname}</MenuItem>
            ))}
        </Select>

        <Select
            value={class2}
            onChange={(e) => setClass2(e.target.value)}
            sx={{ color: "white", backgroundColor: "#3e2723", fontFamily: "'IM Fell English', serif" }}
        >
            {classnames.map((classname: string) => (
                <MenuItem key={classname} value={classname.toLowerCase()}>{classname}</MenuItem>
            ))}
        </Select>
    </Box>
);

export default ClassSelector;
