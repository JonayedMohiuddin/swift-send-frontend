import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { AuthContext, AuthProvider } from "./pages/AuthContext/authContext";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Root from "./pages/root/root";
import { rootLoader } from "./pages/root/root-controller";

import Catalog from "./pages/catalog/catalog";
import { productLoader } from "./pages/catalog/catalog-controller";

import ProductDetail from "./pages/product-detail/product-detail";
import { productDetailLoader } from "./pages/product-detail/product-detail-controller";

import Cart from "./pages/cart/cart";
import { cartLoader, cartAction } from "./pages/cart/cart-controller";

import UsersLogin from "./pages/users-login/users-login";
import { usersLoginLoader } from "./pages/users-login/users-login-controller";

import UsersSignup from "./pages/users-signup/users-signup";
import { usersSignupAction } from "./pages/users-signup/users-signup-controller";

import SupplierSignup from "./pages/supplier-signup/supplier-signup";
import { supplierSignupAction } from "./pages/supplier-signup/supplier-signup-controller";

import SupplierLogin from "./pages/supplier-login/supplier-login";
import { supplierLoginLoader } from "./pages/supplier-login/supplier-login-controller";

import Supplier from "./pages/supplier/supplier";
import { supplierLoader } from "./pages/supplier/supplier-controller";

import AddProduct from "./pages/add-product/add-product";
import { addProductAction, addProductLoader } from "./pages/add-product/add-product-controller";

import UpdateProduct from "./pages/update-product/update-product";
import { updateProductLoader, updateProductAction } from "./pages/update-product/update-product-controller";

import SupplierProductDetail from "./pages/supplier-product-detail/supplier-product-detail";
import { supplierProductDetailLoader } from "./pages/supplier-product-detail/supplier-product-detail-controller";

import UsersOrders from "./pages/users-orders/users-orders";

import UsersProfile from "./pages/users-profile/users-profile";

import UsersWishlist from "./pages/users-wishlist/users-wishlist";

import SupplierPendingOrders from "./pages/supplier-pending-orders/supplier-pending-orders";

import SupplierDeletedProduct from "./pages/supplier-deleted-product/supplier-deleted-product";

import SupplierProfile from "./pages/supplier-profile/supplier-profile";

import AdminLogin from "./pages/admin-login/admin-login";
import { adminLoginLoader } from "./pages/admin-login/admin-login-controller";

import Admin from "./pages/admin/admin";

import AdminOrders from "./pages/admin-orders/admin-orders";

import AdminCategoryManagement from "./pages/admin-category-management/admin-category-management";

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
                path: "/users/cart",
                element: <Cart />,
                loader: cartLoader,
                action: cartAction,
            },
            {
                path: "/users/login",
                element: <UsersLogin />,
                loader: usersLoginLoader,
                // action: usersLoginAction,
            },
            {
                path: "/users/signup",
                element: <UsersSignup />,
                action: usersSignupAction,
            },
            {
                path: "/users/orders",
                element: <UsersOrders />,
            },
            {
                path: "/users/profile",
                element: <UsersProfile />,
            },
            {
                path: "/users/wishlist",
                element: <UsersWishlist />,
            },
            {
                path: "/supplier",
                element: <Supplier />,
                loader: supplierLoader,
            },
            {
                path: "/supplier/signup",
                element: <SupplierSignup />,
                action: supplierSignupAction,
            },
            {
                path: "/supplier/profile",
                element: <SupplierProfile />,
            },
            {
                path: "/supplier/login",
                element: <SupplierLogin />,
                // action: supplierLoginAction,
                loader: supplierLoginLoader,
            },
            {
                path: "/supplier/pendingOrders",
                element: <SupplierPendingOrders />,
            },
            {
                path: "/supplier/deletedProducts",
                element: <SupplierDeletedProduct />,
            },
            {
                path: "/supplier/addProduct",
                element: <AddProduct />,
                action: addProductAction,
                loader: addProductLoader,
            },
            {
                path: "/supplier/updateProduct/:id",
                element: <UpdateProduct />,
                loader: updateProductLoader,
                action: updateProductAction,
            },
            {
                path: "/supplier/:id",
                element: <SupplierProductDetail />,
                loader: supplierProductDetailLoader,
            },
            {
                path: "/admin/login",
                element: <AdminLogin />,
                loader: adminLoginLoader,
                // action: adminLoginAction,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/admin/orders",
                element: <AdminOrders />,
            },
            {
                path: "/admin/categoryManagement",
                element: <AdminCategoryManagement />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
