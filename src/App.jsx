import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root/root";
import Catalog from "./pages/catalog/catalog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/catalog",
                element: <Catalog />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
