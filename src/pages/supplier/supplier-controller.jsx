import { redirect } from "react-router-dom";

export async function supplierLoader({ params }) {
    try {
        const response = await fetch(`http://localhost:3000/supplier/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials (cookies, authorization headers)
        });
        const data = await response.json();

        if (response.status === 401) {
            return redirect("/supplier/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status === 403) {
            return redirect("/supplier/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status !== 200) 
        {
            console.error("Error fetching products:", data.errorMessage);
            throw new Error(data.errorMessage);
        }

        return { products: data };
    } catch (error) {
        return { errorMessage: error.message };
    }
}
