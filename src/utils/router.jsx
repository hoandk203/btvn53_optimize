import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import {Home, Products, Categories} from "../pages/index.js";
import { Layout } from "../components/index.js";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Home/></Layout>,
    },
    {
        path: "/categories",
        element: <Layout><Categories/></Layout>,
    },
    {
        path: "/products",
        element: <Layout><Products/></Layout>,
    },
])
