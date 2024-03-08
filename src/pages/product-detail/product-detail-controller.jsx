export async function productDetailLoader({ params }) {
    try {
        let product, reviews, hasBought, hasReviewed, isWishListed;

        let isUserLoggedIn = false;

        if (localStorage.getItem("isLoggedIn") == "true" && localStorage.getItem("userType") == "users") {
            isUserLoggedIn = true;
        }
        console.log("Is user logged in:", isUserLoggedIn);

        let response = await fetch(`http://localhost:3000/catalog/product/${params.id}`);
        product = await response.json();
        console.log("productDetailLoader response:", product);
        if (!response.ok) throw new Error("Fetch failed");

        response = await fetch(`http://localhost:3000/catalog/product/reviews/${params.id}`);
        reviews = await response.json();
        console.log("productDetailLoader response:", reviews);
        if (!response.ok) throw new Error("Fetch failed");

        if (isUserLoggedIn) {
            response = await fetch(`http://localhost:3000/users/orders/product/DELIVERED/${params.id}`, { credentials: "include" });
            let userProductOrder = await response.json();
            if (userProductOrder.length > 0) {
                hasBought = true;
            } else {
                hasBought = false;
            }
        } else {
            hasBought = false;
        }
        console.log("Has bought:", hasBought);

        if (isUserLoggedIn) {
            response = await fetch(`http://localhost:3000/users/review/product/${params.id}`, { credentials: "include" });
            let userProductReview = await response.json();
            if (userProductReview.length > 0) {
                hasReviewed = true;
            } else {
                hasReviewed = false;
            }
        } else {
            hasReviewed = false;
        }
        console.log("Has reviewed:", hasReviewed);

        if (isUserLoggedIn) {
            response = await fetch(`http://localhost:3000/users/wishlist/${params.id}`, { credentials: "include" });
            let userProductWishlist = await response.json();
            if (userProductWishlist.length > 0) {
                isWishListed = true;
            } else {
                isWishListed = false;
            }
        } else {
            isWishListed = false;
        }
        console.log("Is wishlisted:", isWishListed);

        return { product, reviews, hasBought, hasReviewed, isWishListed };
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
}
