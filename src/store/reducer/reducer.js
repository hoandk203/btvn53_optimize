import productsReducer from "./productsReducer";
import categoriesReducer from "./categoriesReducer";
import dialogReducer from "./dialogReducer";
import loadingReducer from "./loadingReducer";
import msgSuccessReducer from "./msgSuccessReducer";
import currProductReducer from "./currProductReducer";
import currCategoryReducer from "./currCategoryReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import errorReducer from "./errorReducer";
import { v4 } from "uuid";

export const initialState = {
    products: [],
    categories: [],
    product: {
        id: v4(),
        name: "",
        categoryId: "",
        orderNum: "",
        img: [],
    },
    category: {
        id: v4(),
        name: "",
        orderNum: "",
    },
    currProduct: {
        id: "",
        name: "",
        categoryId: "",
        orderNum: "",
        img: [],
    },
    currCategory: {
        id: "",
        name: "",
        categoryId: "",
        orderNum: "",
        img: [],
    },
    isLoading: false,
    showDialog: false,
    msgSuccess: "",
    error: "",
};

export const reducer = (state, action) => {
    return {
        products: productsReducer(state.products, action),
        categories: categoriesReducer(state.categories, action),
        product: productReducer(state.product, action),
        category: categoryReducer(state.category, action),
        showDialog: dialogReducer(state.showDialog, action),
        isLoading: loadingReducer(state.isLoading, action),
        msgSuccess: msgSuccessReducer(state.msgSuccess, action),
        error: errorReducer(state.error, action),
        currProduct: currProductReducer(state.currProduct, action),
        currCategory: currCategoryReducer(state.currCategory, action),
    };
};
