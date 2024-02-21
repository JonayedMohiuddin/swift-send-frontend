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

import Cart from "./pages/cart/cart";
import { cartLoader, cartAction } from "./pages/cart/cart-controller";

import UsersLogin from "./pages/users-login/users-login";
import { usersLoginLoader, usersLoginAction } from "./pages/users-login/users-login-controller";

import UsersSignup from "./pages/users-signup/users-signup";
import { usersSignupAction } from "./pages/users-signup/users-signup-controller";

import SupplierSignup from "./pages/supplier-signup/supplier-signup";
import { supplierSignupAction } from "./pages/supplier-signup/supplier-signup-controller";

import SupplierLogin from "./pages/supplier-login/supplier-login";
import { supplierLoginAction } from "./pages/supplier-login/supplier-login-controller";

// import Supplier from "./pages/supplier/supplier";
// import { supplierLoader } from "./pages/supplier/supplier-controller";

import ErrorPage from "./pages/error/error-page";

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
                loader: cartLoader,
                action: cartAction,
            },
            {
                path: "/users/login",
                element: <UsersLogin />,
                loader: usersLoginLoader,
                action: usersLoginAction,
            },
            {
                path: "/users/signup",
                element: <UsersSignup />,
                action: usersSignupAction,
            },
            {
                path: "/supplier/signup",
                element: <SupplierSignup />,
                action: supplierSignupAction,
            },
            {
                path: "/supplier/login",
                element: <SupplierLogin />,
                action: supplierLoginAction,
            },

            // {
            //     path: "/supplier",
            //     element: <Supplier />,
            //     loader: supplierLoader,
            // }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
