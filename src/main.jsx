import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root/root";

import Catalog from "./pages/catalog/catalog";
import { productLoader } from "./pages/catalog/catalogApi";

import ProductDetail from "./pages/product-detail/product-detail";
import { productDetailLoader } from "./pages/product-detail/productDetailApi";

import Cart from "./pages/cart/cart";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      children: [ 
          {
            index: true, 
            element: <Catalog />,
            loader: productLoader
          },
          {
              path: "/catalog",
              element: <Catalog />,
              loader: productLoader
          },
          {
              path: "/catalog/:id",
              element: <ProductDetail />,
              loader: productDetailLoader
          },
          {
              path: "/cart",
              element: <Cart />,
          }
      ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
