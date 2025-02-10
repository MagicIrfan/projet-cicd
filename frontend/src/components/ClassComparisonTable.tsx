import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import {SpecialAbility} from "../types/special-ability.model.ts";
import {CompareClass} from "../types/compare-class.model.ts";
import {Proficiency} from "../types/proficiency.model.ts";

const ClassComparisonTable: React.FC<{ comparedClasses: CompareClass }> = ({ comparedClasses }) => {
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: "#3e2723", color: "white", maxWidth: 800, margin: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Characteristics</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold", textAlign:'center', fontSize:'20px' }}>{comparedClasses.class1.name}</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold", textAlign:'center', fontSize:'20px' }}>{comparedClasses.class2.name}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: "white" }}>Hit Points</TableCell>
                        <TableCell sx={{ color: "white" }}>{comparedClasses.class1.hitPoints}</TableCell>
                        <TableCell sx={{ color: "white" }}>{comparedClasses.class2.hitPoints}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ color: "white" }}>Armors & Weapons</TableCell>
                        <TableCell sx={{ color: "white" }}>
                            {comparedClasses.class1.armorWeapons.map((item: Proficiency) => item.name).join(", ")}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            {comparedClasses.class2.armorWeapons.map((item: Proficiency) => item.name).join(", ")}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ color: "white" }}>Subclasses</TableCell>
                        <TableCell sx={{ color: "white" }}>
                            {comparedClasses.class1.subclasses.join(", ")}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            {comparedClasses.class2.subclasses.join(", ")}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }} colSpan={3}>
                            Special abilities
                        </TableCell>
                    </TableRow>

                    {comparedClasses.class1.specialAbilities.map((ability: SpecialAbility, index: number) => (
                        <TableRow key={index}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Level {ability.level}</TableCell>
                            <TableCell sx={{ color: "white" }}>
                                {ability.features.length > 0 ? ability.features.join(", ") : "-"}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                {comparedClasses.class2.specialAbilities[index]?.features.length > 0
                                    ? comparedClasses.class2.specialAbilities[index].features.join(", ")
                                    : "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClassComparisonTable;
