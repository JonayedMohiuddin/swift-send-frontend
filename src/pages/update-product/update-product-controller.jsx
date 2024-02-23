import { redirect } from "react-router-dom";

export async function updateProductLoader({ params }) {
    let categories;

    try {
        let response = await fetch(`http://localhost:3000/catalog/categories`);
        let data = await response.json();
        console.log("categories response: ", data);
        if (!response.ok) {
            console.error("Error fetching categories:", data.errorMessage);
            throw new Error(data.errorMessage);
        }
        categories = data;

        response = await fetch(`http://localhost:3000/catalog/product/${params.id}`);
        let product = await response.json();
        console.log("productDetailLoader response:", product);
        if (!response.ok) {
            throw new Error("Fetch failed");
        }

        return { categories, product };
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        return { errorMessage: error.message };
    }
}

function sanitizeFormData(formData) {
    let name = formData.get("product-name");
    let price = formData.get("price");
    let discount = formData.get("discount");
    let imageUrl = formData.get("image-url");
    let categoryId = formData.get("category");
    let description = formData.get("description");

    discount = discount / 100;

    if (isNaN(discount) || discount < 0 || discount > 1) {
        discount = 0;
    }

    if (name === "") {
        return { ok: false, errorMessage: "Name cannot be empty." };
    } else if (price === "") {
        return { ok: false, errorMessage: "Price cannot be empty." };
    } else if (isNaN(price)) {
        return { ok: false, errorMessage: "Price must be a number." };
    } else if (categoryId === "") {
        return { ok: false, errorMessage: "Category must be selected." };
    }

    price = parseFloat(price);

    if(price < 0 || price > 1000000) {
        return { ok: false, errorMessage: "Price must be between 0 and 1000000." };
    }

    return {
        ok: true,
    };
}

export async function updateProductAction({ request, params }) {
    let formData = await request.formData();
    console.log("formData: ", formData);

    const name = formData.get("product-name");
    const price = formData.get("price");
    let discount = formData.get("discount");
    const imageUrl = formData.get("image-url");
    const categoryId = formData.get("category");
    const description = formData.get("description");

    console.log("name: ", name);
    console.log("price: ", price);
    console.log("discount: ", discount);
    console.log("imageUrl: ", imageUrl);
    console.log("categoryId: ", categoryId);
    console.log("description: ", description);

    const errors = {};

    const santize = sanitizeFormData(formData);
    if (!santize.ok) {
        errors.errorMessage = santize.errorMessage;
        return errors;
    }

    discount = discount / 100;

    const response = await fetch(`http://localhost:3000/supplier/updateProduct/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: params.id,
            categoryId,
            name,
            price,
            description,
            imageUrl,
            discount,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Product updated successfully.");
        return redirect("/supplier");
    } else {
        console.error("Error updating product:", data.errorMessage);
        errors.isError = true;
        errors.errorMessage = data.errorMessage;
    }

    return errors;
}
