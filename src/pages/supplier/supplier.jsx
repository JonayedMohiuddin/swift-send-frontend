import { useLoaderData } from "react-router-dom";

export default function Supplier() {
    // const sellerProducts = useLoaderData();
    return (
        <div className="flex flex-row gap-4 items-center justify-start mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Product</button>
        </div>
    );
}
