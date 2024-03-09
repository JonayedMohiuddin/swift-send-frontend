import { useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

export default function Supplier() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/admin/orders");
    }, []);

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-start mb-4">
                <Link to="/admin/categoryManagement" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Manage Categories
                </Link>
                <Link to="/admin/supplierManagement" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Manage Suppliers
                </Link>
                <Link to="/admin/orders" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                    Deliver Orders
                </Link>
                <Link to="/admin" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Problems
                </Link>
                <Link to="/admin" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Logs
                </Link>
            </div>
        </>
    );
}
