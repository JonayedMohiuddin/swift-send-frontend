import { useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card";

export default function UsersWishlist() {
    const [wishlist, setWishlist] = useState([]);
    async function fetchWishlist() {
        const response = await fetch("http://localhost:3000/users/wishlist", { credentials: "include" });
        const data = await response.json();
        setWishlist(data);
    }

    useEffect(() => {
        fetchWishlist();
        console.log(wishlist);
    }, []);

    return (
        <div>
            {wishlist.length === 0 && <div className="text-3xl text-center mt-20 font-ember-regular opacity-50">Your wishlist is empty</div>}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
                    gap: "40px 15px",
                    margin: "30px auto 60px auto",
                    minWidth: "700px",
                }}
            >
                {wishlist.length > 0 &&
                    wishlist.map((product) => (
                        <ProductCard
                            key={product.ID}
                            product={product}
                            productName={product.NAME}
                            productPrice={product.PRICE}
                            productImageUrl={product.IMAGE_URL}
                            productDiscount={product.DISCOUNT}
                            productRatingCount={product.RATING_COUNT}
                            productTotalRating={product.RATING}
                            redirectionUrl={`/catalog/${product.ID}`}
                            includeCategory={false}
                        />
                    ))}
            </div>
        </div>
    );
}
