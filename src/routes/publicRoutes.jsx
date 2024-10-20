
import {Home, Products, Categories} from "../pages/index.js";
import DefaultLayout from './../layout/DefaultLayout';

const publicRoutes = {
    layout: DefaultLayout,
    routes: [
        {
            path: "/",
            element: Home,
        },
        {
            path: "/categories",
            element: Categories,
        },
        {
            path: "/products",
            element: Products,
        },
    ]
}

export default publicRoutes;
