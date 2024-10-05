import React, { useState, useEffect } from "react";
import {TextField} from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from "@mui/material/Alert";
import "../../index.css";
import { v4 } from "uuid";
import DialogContainer from "../DialogContainer";
import axios from "axios";
import {validateInput} from "../../utils/Validate.jsx";

export default function ({onClose, currProduct, reload, categories = [], setMsgSuccess}) {
    const baseApi = import.meta.env.VITE_BASE_API;
    const [product, setProduct] = useState(currProduct);
    const [error, setError] = useState(null);
    useEffect(() => {
        setError(null);
        if(currProduct.id) {
            setProduct(currProduct);
        } else {
            setProduct({
                id: v4(),
                name: "",
                categoryId: "",
                orderNum: "",
            });
        }
    }, [currProduct]);

    const onInput= (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
        setError(null);
    }

    const onChangeCategory = (e) => {
        setProduct({...product, categoryId: e.target.value});
        setError(null);
    }

    const onSave = async () => {

        if(validateInput(product, "product")) {
            setError(validateInput(product, "product"));
            return;
        }
        
        if(!currProduct.id) {
            // create product
            try {
                const response= await axios.post(`${baseApi}/products`, product,{
                    headers: {
                        "Content-Type" : "application/json"
                    }
                })
                if(response.data) {
                    setMsgSuccess("Create product");
                    onClose();
                    reload();
                }
            } catch (error) {
                console.log(error);
            }
        }else {
            // update product
            try {
                const response = await axios.put(`${baseApi}/products/${currProduct.id}`, product, {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                })
                if(response.data) {
                    setMsgSuccess("Update product");
                    onClose();
                    reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <DialogContainer action={currProduct.id ? "Update" : "Create"} type="product" onClose={onClose} onSave={onSave}>
                    
            <TextField
                    required
                    margin="dense"
                    name="name"
                    label="Product Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={product.name}
                />
                {/* <TextField
                    required
                    margin="dense"
                    name="categoryId"
                    label="Category ID"
                    type="number"
                    fullWidth
                    variant="standard"
                    onInput={onInput}
                    value={product.categoryId}
                    
                /> */}
                <FormControl variant="standard" fullWidth>
                    {error && (
                        <Alert variant="filled" severity="error" className="top-50px left-50 translate-minus-50 fixed">
                            {error}
                        </Alert>
                    )}
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={product.categoryId}
                        onChange={onChangeCategory}
                        label="Category"
                        >
                        {categories.map((category)=>{
                            return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
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
                    value={product.orderNum}
                />
                    
            </DialogContainer>
        </>
    )
}