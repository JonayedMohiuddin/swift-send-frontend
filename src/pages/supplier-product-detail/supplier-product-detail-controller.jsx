export async function supplierProductDetailLoader({ params }) {
    let product, reviews;
    try {
        let response = await fetch(`http://localhost:3000/catalog/product/${params.id}`);
        product = await response.json();
        console.log("productDetailLoader response:", product);
        if (!response.ok) throw new Error("Fetch failed");

        response = await fetch(`http://localhost:3000/catalog/product/reviews/${params.id}`);
        reviews = await response.json();
        console.log("productDetailLoader response:", reviews);
        if (!response.ok) throw new Error("Fetch failed");

        return { product, reviews };
    } catch (error) {
        console.error("supplierProductDetailLoader error:", error);
        return { product: [], reviews: [] };
    }
}
