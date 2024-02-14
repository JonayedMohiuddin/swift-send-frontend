import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root/root";
import { rootLoader } from "./pages/root/rootApi";

import Catalog from "./pages/catalog/catalog";
import { productLoader } from "./pages/catalog/catalogApi";

import ProductDetail from "./pages/product-detail/product-detail";
import { productDetailLoader } from "./pages/product-detail/productDetailApi";

import Cart from "./pages/cart/cart";

import Login from "./pages/login/login";

import Signup from "./pages/signup/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <Catalog />,
                loader: productLoader,
            },
            {
                path: "/catalog",
                element: <Catalog />,
                loader: productLoader,
            },
            {
                path: "/catalog/:id",
                element: <ProductDetail />,
                loader: productDetailLoader,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            }
        ],
    },
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
