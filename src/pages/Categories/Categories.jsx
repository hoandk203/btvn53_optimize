import axios from "axios";
import { FCommonTable} from "../../components";
import { useEffect, useContext, useCallback } from "react";
import { CategoryDialog } from "../../components";
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
        text: "Name",
        name: "name",
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

export default function () {
    
    const baseApi = import.meta.env.VITE_BASE_API;
    const navigate = useNavigate();

    const {state, dispatch} = useContext(DialogContext)

    const getCategories = async () => {
        if (state.categories.length > 0) return;
        isLoadingAPI = true;
        try {
            const response = await axios.get(`${baseApi}/categories`);
            dispatch({type: "categories/load", payload: response.data});
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingAPI = false;
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const onUpdate = useCallback((category) => {
        dispatch({type: "dialog/true", payload: {category}})
        dispatch({type: "currCategory/update", payload: category})
    }, []);

    const onCreate = () => {
        dispatch({type: "dialog/true"})
    };

    const onDelete = useCallback((id) => {
        dispatch({type: "isLoading/true"})
        try {
            axios.delete(`${baseApi}/categories/${id}`);
            dispatch({type: "categories/load", payload: state.categories.filter((category) => category.id !== id)})
            dispatch({type: "msgSuccess/update", payload: "Delete category"})
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: "isLoading/false"});
        }
    }, []);

    const onCloseDialog = () => {
        dispatch({type: "dialog/false"})
        dispatch({type: "currCategory/update", payload: {}})
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch({type: "msgSuccess/update", payload: ""})
        }, 2500);
    }, [state.msgSuccess]);

    return (
        <>
            <div className="flex-1 relative">
                <Container maxWidth="md">
                    <h1 className="text-center">Category</h1>
                    {isLoadingAPI && (
                            <Alert
                            variant="filled"
                            severity="info"
                            className="top-50px left-50 translate-minus-50 absolute"
                        >
                                {"Loading Categories..."}
                        </Alert>
                    )}
                    {state.msgSuccess==="Create category" && (
                        <Alert variant="filled" severity="success" className="top-50px left-50 translate-minus-50 absolute">
                            Thêm danh mục thành công
                        </Alert>)
                    }
                    {state.msgSuccess==="Update category" && (
                        <Alert variant="filled" severity="success" className="top-50px left-50 translate-minus-50 absolute">
                            Cập nhật danh mục thành công
                        </Alert>)
                    }
                    {state.msgSuccess==="Delete category" && (
                        <Alert variant="filled" severity="success" className="top-50px left-50 translate-minus-50 absolute">
                            Xóa danh mục thành công
                        </Alert>)
                    }
                    <div style={{ maxWidth: "1000px", margin: "auto" }}>
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
                            New Category
                        </Button>
                        <FCommonTable
                            maxWidth={1000}
                            columns={columns}
                            rows={state.categories}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                        <CategoryDialog
                            onClose={onCloseDialog}
                            width={500}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
}
