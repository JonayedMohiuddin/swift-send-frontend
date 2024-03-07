export async function productDetailLoader({ params }) {
    try {
        let product, reviews, hasBought, hasReviewed;

        let response = await fetch(`http://localhost:3000/catalog/product/${params.id}`);
        product = await response.json();
        console.log("productDetailLoader response:", product);
        if (!response.ok) throw new Error("Fetch failed");

        response = await fetch(`http://localhost:3000/catalog/product/reviews/${params.id}`);
        reviews = await response.json();
        console.log("productDetailLoader response:", reviews);
        if (!response.ok) throw new Error("Fetch failed");

        response = await fetch(`http://localhost:3000/users/orders/product/DELIVERED/${params.id}`, { credentials: "include" });
        let userProductOrder = await response.json();
        if (userProductOrder.length > 0) {
            hasBought = true;
        } else {
            hasBought = false;
        }
        console.log("Has bought:", hasBought);

        response = await fetch(`http://localhost:3000/users/review/product/${params.id}`, { credentials: "include" });
        let userProductReview = await response.json();
        if (userProductReview.length > 0) {
            hasReviewed = true;
        } else {
            hasReviewed = false;
        }
        console.log("Has reviewed:", hasReviewed);

        return { product, reviews, hasBought, hasReviewed };
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
}
