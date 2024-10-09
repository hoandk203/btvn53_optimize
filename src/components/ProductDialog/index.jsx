import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import "../../index.css";
import { v4 } from "uuid";
import DialogContainer from "../DialogContainer";
import axios from "axios";
import { validateInput } from "../../utils/Validate.jsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { readFile } from "../../utils/index.js";

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

export default function ({
    onClose,
    currProduct,
    reload,
    categories = [],
    setMsgSuccess,
}) {
    const baseApi = import.meta.env.VITE_BASE_API;
    const [product, setProduct] = useState(currProduct);
    const [error, setError] = useState(null);
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setError(null);
        if (currProduct.id) {
            setProduct(currProduct);
        } else {
            setProduct({
                id: v4(),
                name: "",
                categoryId: "",
                orderNum: "",
                img: [],
            });
        }
    }, [currProduct]);

    const onInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        setError(null);
    };

    const onChangeCategory = (e) => {
        setProduct({ ...product, categoryId: e.target.value });
        setError(null);
    };

    const onSave = async () => {
        if (validateInput(product, "product")) {
            setError(validateInput(product, "product"));
            return;
        }

        setIsLoading(true);
        try {
            if (!currProduct.id) {
                // create product
                const response = await axios.post(
                    `${baseApi}/products`,
                    product,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    setMsgSuccess("Create product");
                    onClose();
                    reload();
                }
            } else {
                // update product
                const response = await axios.put(
                    `${baseApi}/products/${currProduct.id}`,
                    product,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data) {
                    setMsgSuccess("Update product");
                    onClose();
                    reload();
                }
            }
        } catch (error) {
            console.log(error);
            setError("Có lỗi xảy ra khi lưu sản phẩm");
        } finally {
            setIsLoading(false);
        }
    };

    const onUploadFile = async (event) => {
        const fileListData = [];
        const fileList = event.target.files;
        const fileLimit = 4;
    
        for (let i = 0; i < fileLimit; i++) {
            if (fileList[i]) {
                fileListData.push(await readFile(fileList[i]));
            }
        }
    
        if (fileList.length > fileLimit) {
            alert(`Chỉ có thể tải lên tối đa ${fileLimit} ảnh. ${fileList.length - fileLimit} ảnh cuối cùng sẽ bị bỏ qua.`);
        }
    
        setProduct({ ...product, img: fileListData });
    };
    return (
        <>
            <DialogContainer
                action={currProduct.id ? "Update" : "Create"}
                type="product"
                onClose={onClose}
                onSave={onSave}
            >
                {isLoading && (
                    <Alert
                    variant="filled"
                    severity="info"
                    className="top-50px left-50 translate-minus-50 fixed"
                >
                        {"Loading..."}
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
                    value={product.name}
                />
                <FormControl variant="standard" fullWidth>
                    {error && (
                        <Alert
                            variant="filled"
                            severity="error"
                            className="top-50px left-50 translate-minus-50 fixed"
                        >
                            {error}
                        </Alert>
                    )}
                    <InputLabel id="demo-simple-select-standard-label">
                        Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={product.categoryId}
                        onChange={onChangeCategory}
                        label="Category"
                    >
                        {categories.map((category) => {
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
                    value={product.orderNum}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => onUploadFile(event)}
                        multiple
                    />
                </Button>
            </DialogContainer>
        </>
    );
}
