import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root/root";
import { rootLoader } from "./pages/root/root-controller";

import Catalog from "./pages/catalog/catalog";
import { productLoader } from "./pages/catalog/catalog-controller";

import ProductDetail from "./pages/product-detail/product-detail";
import { productDetailLoader } from "./pages/product-detail/product-detail-controller";

import Login from "./pages/login/login";
import { loginAction } from "./pages/login/login-controller";

import Signup from "./pages/signup/signup";
import { signupAction } from "./pages/signup/signup-controller";

import Cart from "./pages/cart/cart";


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
                action: loginAction,
            },
            {
                path: "/signup",
                element: <Signup />,
                action: signupAction,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
