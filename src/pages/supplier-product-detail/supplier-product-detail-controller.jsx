export async function supplierProductDetailLoader({ params }) {
    let product;
    try {
        const response = await fetch(`http://localhost:3000/catalog/product/${params.id}`);
        product = await response.json();

        console.log("productDetailLoader response:", product);

        if (!response.ok) {
            throw new Error("Fetch failed");
        }

        return { product };
    } catch (error) {
        console.error("Error fetching product:", error);

        product = {
            ID: 0,
            NAME: "FETCH FAILED",
            PRICE: -100,
            IMAGE_URL: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            RATING: 0.0,
        };

        return { product };
    }
}
