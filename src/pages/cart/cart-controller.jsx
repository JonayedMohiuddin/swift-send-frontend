import { redirect } from "react-router-dom";

export async function cartLoader({ request }) {
    const response = await fetch("http://localhost:3000/cart/", { credentials: "include" });
    const data = await response.json();

    if(response.ok) {
        return { cart: data };
    } else {
        return redirect("/login?errorMessage=" + encodeURIComponent("Please login to view your cart."));
    }

    return null;
}
