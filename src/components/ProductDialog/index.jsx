import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import "../../index.css";
import { v4 } from "uuid";
import DialogContainer from "../DialogContainer";
import axios from "axios";
import { validateInput } from "../../utils/Validate.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { readFile } from "../../utils/index.js";
import DialogContext from "../../store";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function ({ onClose }) {
    const baseApi = import.meta.env.VITE_BASE_API;

    const {state, dispatch} = useContext(DialogContext)

    useEffect(() => {
        dispatch({type: "error/update", payload: null});
        if (state.currProduct.id) {
            dispatch({type: "product/update", payload: state.currProduct})
        } else {
            dispatch({type: "product/update", payload: {
                id: v4(),
                name: "",
                categoryId: "",
                orderNum: "",
                img: [],
            }})
        }
    }, [state.currProduct]);

    const onInput = (e) => {
        dispatch({type: "product/update", payload: {...state.product, [e.target.name]: e.target.value}})
        dispatch({type: "error/update", payload: null});
    };

    const onChangeCategory = (e) => {
        dispatch({type: "product/update", payload: {...state.product, categoryId: e.target.value}})
        dispatch({type: "error/update", payload: null});
    };

    const onSave = async (e) => {
        e.target.disabled= true;
        if (validateInput(state.product, "product")) {
            e.target.disabled= false;
            dispatch({type: "error/update", payload: validateInput(state.product, "product")});
            return;
        }

        dispatch({type: "isLoading/true"});
        try {
            if (!state.currProduct.id) {
                // create product
                const response = await axios.post(`${baseApi}/products`, state.product, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.data) {
                    dispatch({type: "msgSuccess/update", payload: "Create product"})
                    onClose();
                    dispatch({type: "products/create", payload: response.data})
                }
            } else {
                // update product
                const response = await axios.put(`${baseApi}/products/${state.currProduct.id}`, state.product, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.data) {
                    dispatch({type: "msgSuccess/update", payload: "Update product"})
                    onClose();
                    dispatch({type: "products/update", payload: {
                        products: state.products.filter((product)=>product.id !== state.currProduct.id),
                        product: response.data
                    }})
                }
            }
        } catch (error) {
            console.log(error);
            dispatch({type: "error/update", payload: "Có lỗi xảy ra khi lưu sản phẩm"});
        } finally {
            dispatch({type: "isLoading/false"});
        }
    };

    const onUploadFile = async (event) => {
        const fileListData = [];
        const fileList = event.target.files;
        const fileLimit = 4;

        if (fileList.length > fileLimit) {
            alert(`Chỉ có thể tải lên tối đa ${fileLimit} ảnh. ${fileList.length - fileLimit} ảnh cuối cùng sẽ bị bỏ qua.`);
        } else {
            for (let i = 0; i < fileList.length; i++) {

                if (fileList[i]) {
                    if (fileList[i].type.includes("image/jpg") || fileList[i].type.includes("image/png") || fileList[i].type.includes("image/jpeg")) {
                        fileListData.push(await readFile(fileList[i]));
                    } else {
                        alert("Ảnh phải có định dạng PNG, JPG, JPEG");
                    }
                }
            }
        }

        dispatch({type: "product/update", payload: {...state.product, img: fileListData}})
    };
    return (
        <>
            <DialogContainer action={state.currProduct && state.currProduct.id ? "Update" : "Create"} type="product" onClose={onClose} onSave={onSave}>
                {state.isLoading && (
                    <Alert variant="filled" severity="info" className="top-50px left-50 translate-minus-50 fixed">
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
                    label="Product Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={state.product.name}
                />
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={state.product.categoryId}
                        onChange={onChangeCategory}
                        label="Category"
                    >
                        {state.categories.map((category) => {
                            return (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin="dense"
                    name="orderNum"
                    label="Order Number"
                    type="number"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={state.product.orderNum}
                />

                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                    Upload files
                    <VisuallyHiddenInput type="file" onChange={(event) => onUploadFile(event)} multiple />
                </Button>
                <div style={{ display: "flex" }}>
                    {Array.isArray(state.product.img) &&
                        state.product.img.length > 0 &&
                        state.product.img.map((img, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    border: "1px solid black",
                                    margin: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <img src={img} style={{ width: "100%" }} />
                            </div>
                        ))}
                </div>
            </DialogContainer>
        </>
    );
}
