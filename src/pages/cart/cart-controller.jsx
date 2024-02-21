import { redirect } from "react-router-dom";

export async function cartLoader({ request }) {
    const response = await fetch("http://localhost:3000/cart/", { credentials: "include" });
    const data = await response.json();

    if (response.status === 401) {
        return redirect("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
    } else if (response.status === 403) {
        return redirect("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
    } else if (response.status !== 200) {
        return redirect("/");
    }

    return { cartItems: data.cartItems };
}

export async function cartAction({ request }) {
    let formData = await request.formData();

    const addToWishlist = formData.get("addToWishlist");
    const remove = formData.get("remove");

    const cart_item_id = formData.get("cartId");
    const product_id = formData.get("productId");

    console.log("addToWishlist: " + addToWishlist);

    if (addToWishlist) {
    } else if (remove) {
        console.log("remove");
        const response = await fetch("http://localhost:3000/cart/remove/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart_item_id }),
        });
    }

    return null;
}
