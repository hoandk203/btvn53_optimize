import axios from "axios";
import { FCommonTable } from "../../components";
import { useEffect, useContext, useCallback } from "react";
import { ProductDialog } from "../../components";
import { Button, Alert, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import DialogContext from "../../store";
const columns = [
    {
        text: "Id",
        name: "id",
    },
    {
        text: "Image",
        name: "img",
    },
    {
        text: "Name",
        name: "name",
    },
    {
        text: "Category",
        name: "categoryId",
    },
    {
        text: "Order Number",
        name: "orderNum",
    },
    {
        text: "",
        name: "action",
    },
];

let isLoadingAPI = false;
let isLoading = false;

export default function () {
    
    const baseApi = import.meta.env.VITE_BASE_API;
    const navigate = useNavigate();
    const {state, dispatch} = useContext(DialogContext)
    
    const getCategories = async () => {
        
        if (state.categories.length > 0) return;
        isLoadingAPI = true;
        try {
            const response = await axios.get(`${baseApi}/categories`);
            if (response.data) {
                dispatch({type: "categories/load", payload: response.data})
            }
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingAPI = false;
        }
    };

    const getProducts = async () => {
        
        if (state.products.length > 0) return;
        isLoadingAPI = true;
        try {
            const response = await axios.get(`${baseApi}/products`);
            dispatch({type: "products/load", payload: response.data})
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingAPI = false;
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const onUpdate = useCallback((product) => {
        dispatch({type: "dialog/true", payload: {product}})
        dispatch({type: "currProduct/update", payload: product})
    }, []);

    const onCreate = () => {
        dispatch({type: "dialog/true"})
    };

    const onCloseDialog = useCallback(() => {
        dispatch({type: "dialog/false"})
        dispatch({type: "currProduct/update", payload: {}})
    }, [dispatch]);

    const onDelete = useCallback((id) => {
        dispatch({type: "isLoading/true"})
        try {
            axios.delete(`${baseApi}/products/${id}`);
            dispatch({type: "products/load", payload: state.products.filter((product)=>{
                return product.id !== id
            })})
            dispatch({type: "msgSuccess/update", payload: "Delete product"})
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: "isLoading/false"})
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch({type: "msgSuccess/update", payload: ""})
        }, 2500);
    }, [state.msgSuccess]);

    return (
        <>
                <div className="flex-1 relative">
                    <Container maxWidth="md">
                        <h1 className="text-center">Products</h1>
                        {isLoadingAPI && (
                            <Alert
                            variant="filled"
                            severity="info"
                            className="top-50px left-50 translate-minus-50 absolute"
                        >
                                {"Loading Products..."}
                        </Alert>
                        )}
                        {state.msgSuccess === "Create product" && (
                            <Alert
                                variant="filled"
                                severity="success"
                                className="top-50px left-50 translate-minus-50 absolute"
                            >
                                Thêm sản phẩm thành công
                            </Alert>
                        )}
                        {state.msgSuccess === "Update product" && (
                            <Alert
                                variant="filled"
                                severity="success"
                                className="top-50px left-50 translate-minus-50 absolute"
                            >
                                Cập nhật sản phẩm thành công
                            </Alert>
                        )}
                        {state.msgSuccess === "Delete product" && (
                            <Alert
                                variant="filled"
                                severity="success"
                                className="top-50px left-50 translate-minus-50 absolute"
                            >
                                Xóa sản phẩm thành công
                            </Alert>
                        )}
                        <div style={{ maxWidth: "1140px", margin: "auto" }}>
                            <Button
                                variant="outlined"
                                startIcon={<HomeIcon />}
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Home
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                className="float-right"
                                onClick={onCreate}
                            >
                                New Product
                            </Button>
                            <FCommonTable
                                maxWidth={1140}
                                columns={columns}
                                rows={state.products}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                            <ProductDialog
                                onClose={onCloseDialog}
                                width={500}
                            />
                        </div>
                    </Container>
                </div>
        </>
    );
}
