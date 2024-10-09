import React from "react";
import {
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../../index.css";
import style from "./style.module.css";

const FCommonTable = ({ columns, rows, maxWidth, onUpdate, onDelete }) => {
    return (
        <>
            <TableContainer
                sx={{ maxWidth: maxWidth, margin: "0 auto" }}
                component={Paper}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    className={style["text--red"]}
                                    width={column?.width}
                                    key={column.name}
                                >
                                    {column.text}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, ridx) => {
                            return (
                                <TableRow key={`${ridx}`}>
                                    {columns.map((column) => {
                                        if (column.name === "action") {
                                            return (
                                                <TableCell
                                                    key={`${ridx}${column.name}`}
                                                >
                                                    <EditIcon
                                                        onClick={() =>
                                                            onUpdate(row)
                                                        }
                                                        sx={{ color: "green" }}
                                                        className={
                                                            "ma-2 pointer"
                                                        }
                                                    />
                                                    <DeleteOutlineIcon
                                                        onClick={() =>
                                                            onDelete(row.id)
                                                        }
                                                        sx={{ color: "red" }}
                                                        className={
                                                            "ma-2 pointer"
                                                        }
                                                    />
                                                </TableCell>
                                            );
                                        }
                                        if (column.name === "img") {
                                            return (
                                                <TableCell
                                                    key={`${ridx}${column.name}`}
                                                >
                                                    <div 
                                                        style={{display: "flex", flexDirection: "row", wrap: "no-wrap"}}>
                                                            {Array.isArray(row[column.name]) && row[column.name].map((img, index)=>{
                                                                return (
                                                                    
                                                                        <img
                                                                            key={index}
                                                                            style={{
                                                                                maxWidth: "80px",
                                                                                maxHeight: "80px",
                                                                                border: "1px solid black",
                                                                                margin: "5px"
                                                                            }}
                                                                            src={img}
                                                                        ></img>
                                                                    )
                                                                })}
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell
                                                key={`${ridx}${column.name}`}
                                            >
                                                {row[column.name]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default FCommonTable;
