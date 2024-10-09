import React, { useState, useEffect } from "react";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import "../../index.css";
import { v4 } from "uuid";
import DialogContainer from "../DialogContainer";
import axios from "axios";
import { validateInput } from "../../utils/Validate.jsx";

export default function ({onClose, reload, currCategory, setMsgSuccess }) {
    const baseApi = import.meta.env.VITE_BASE_API;
    const [category, setCategory] = useState({
        id: v4(),
        name: "",
        orderNum: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setError(null);
        if (currCategory.id) {
            setCategory(currCategory);
        } else {
            setCategory({
                id: v4(),
                name: "",
                orderNum: "",
            });
        }
    }, [currCategory]);

    const onInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
        setError(null);
    };

    const onSave = async () => {
        if (validateInput(category, "category")) {
            setError(validateInput(category, "category"));
            return;
        }

        setIsLoading(true);
        try {
            if (!currCategory.id) {
                // create category
                const response = await axios.post(
                    `${baseApi}/categories`,
                    category,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    setMsgSuccess("Create category");
                    onClose();
                    reload();
                }
            } else {
                // update category
                const response = await axios.put(
                    `${baseApi}/categories/${currCategory.id}`,
                    category,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    setMsgSuccess("Update category");
                    onClose();
                    reload();
                }
            }
        } catch (error) {
            console.log(error);
            setError("Có lỗi xảy ra khi lưu danh mục");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DialogContainer action={currCategory.id ? "Update" : "Create"} type="category" onClose={onClose} onSave={onSave}>
                {isLoading && (
                    <Alert
                    variant="filled"
                    severity="info"
                    className="top-50px left-50 translate-minus-50 fixed"
                >
                        {"Loading..."}
                    </Alert>
                )}
                {error && (
                    <Alert variant="filled" severity="error" className="top-50px left-50 translate-minus-50 fixed">
                        {error}
                    </Alert>
                )}
                <TextField
                    required
                    margin="dense"
                    name="name"
                    label="Category Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={category.name}
                />
                <TextField
                    required
                    margin="dense"
                    name="orderNum"
                    label="Order Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={category.orderNum}
                />
            </DialogContainer>
        </>
    );
}
