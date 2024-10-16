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
import loadingAPIReducer from "./loadingAPIReducer";
const reducer = (state, action) => {
    return {
        products: productsReducer(state.products, action),
        categories: categoriesReducer(state.categories, action),
        product: productReducer(state.product, action),
        category: categoryReducer(state.category, action),
        showDialog: dialogReducer(state.showDialog, action),
        isLoading: loadingReducer(state.isLoading, action),
        isLoadingAPI: loadingAPIReducer(state.isLoadingAPI, action),
        msgSuccess: msgSuccessReducer(state.msgSuccess, action),
        error: errorReducer(state.error, action),
        currProduct: currProductReducer(state.currProduct, action),
        currCategory: currCategoryReducer(state.currCategory, action),
    };
};

export default reducer;
