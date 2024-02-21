import { redirect } from "react-router-dom";

export async function addProductLoader({ request }) {
    let categories;

    try {
        const response = await fetch(`http://localhost:3000/catalog/categories`);
        const data = await response.json();

        console.log("data: ", data);

        if (!response.ok) {
            console.error("Error fetching categories:", data.errorMessage);
            throw new Error(data.errorMessage);
        }

        categories = data;

        return { categories };
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        return { errorMessage: error.message };
    }
}

export async function addProductAction({ request }) {
    let formData = await request.formData();
    console.log("formData: ", formData);

    const name = formData.get("product-name");
    const price = formData.get("price");
    let discount = formData.get("discount");
    const imageUrl = formData.get("image-url");
    const categoryId = formData.get("category");
    const description = formData.get("description");

    discount = discount / 100;

    const response = await fetch("http://localhost:3000/supplier/addProduct", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId, name, price, description, imageUrl, discount }),
    });

    const data = await response.json();

    
    const errors = {};

    if (response.ok) {
        console.log("Product added successfully.");
        return redirect("/supplier");
    } else {
        console.error("Error adding product:", data.errorMessage);
        errors.isError = true;
        errors.errorMessage = data.errorMessage;
    }

    return errors;
}
