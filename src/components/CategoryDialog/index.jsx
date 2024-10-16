import React, { useState, useEffect, useContext } from "react";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import "../../index.css";
import { v4 } from "uuid";
import DialogContainer from "../DialogContainer";
import axios from "axios";
import { validateInput } from "../../utils/Validate.js";
import DialogContext from "../../store";

export default function ({onClose}) {
    const baseApi = import.meta.env.VITE_BASE_API;
    
    const {state, dispatch} = useContext(DialogContext)

    useEffect(() => {
        dispatch({type: "error/update", payload: null});
        if (state.currCategory.id) {
            dispatch({type: "category/update", payload: state.currCategory})
        } else {
            dispatch({type: "category/update", payload: {
                id: v4(),
                name: "",
                orderNum: "",
            }})
        }
    }, [state.currCategory]);

    const onInput = (e) => {
        dispatch({type: "category/update", payload: {...state.category, [e.target.name]: e.target.value}})
        dispatch({type: "error/update", payload: null});
    };

    const onSave = async (e) => {
        e.target.disabled= true;
        if (validateInput(state.category, "category")) {
            e.target.disabled= false;
            dispatch({type: "error/update", payload: validateInput(state.category, "category")});
            return;
        }

        dispatch({type: "isLoading/true", })
        try {
            if (!state.currCategory.id) {
                // create category
                const response = await axios.post(
                    `${baseApi}/categories`,
                    state.category,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    dispatch({type: "msgSuccess/update", payload: "Create category"})
                    dispatch({type: "categories/create", payload: response.data})
                    e.target.disabled= false;
                    onClose();
                }
            } else {
                // update category
                const response = await axios.put(
                    `${baseApi}/categories/${state.currCategory.id}`,
                    state.category,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    dispatch({type: "msgSuccess/update", payload: "Update category"})
                    dispatch({type: "categories/update", payload: {
                        categories: state.categories.filter((category)=>category.id !== state.currCategory.id),
                        category: response.data
                    }})
                    e.target.disabled= false;
                    onClose();
                }
            }
        } catch (error) {
            dispatch({type: "error/update", payload: "Có lỗi xảy ra khi lưu danh mục"})
        } finally {
            dispatch({type: "isLoading/false"})
        }
    };

    return (
        <>
            <DialogContainer action={state.currCategory.id ? "Update" : "Create"} type="category" onClose={onClose} onSave={onSave}>
                {state.isLoading && (
                    <Alert
                    variant="filled"
                    severity="info"
                    className="top-50px left-50 translate-minus-50 fixed"
                >
                        {"Loading..."}
                    </Alert>
                )}
                {state.error && (
                    <Alert variant="filled" severity="error" className="top-50px left-50 translate-minus-50 fixed">
                        {state.error}
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
                    value={state.category.name}
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
                    value={state.category.orderNum}
                />
            </DialogContainer>
        </>
    );
}
