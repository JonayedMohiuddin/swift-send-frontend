import { useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card";

export default function SupplierDeletedProduct() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchProducts() {
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
                setErrorMessage(data.errorMessage);
            } else if (response.status === 403) {
                setErrorMessage(data.errorMessage);
            } else if (response.status !== 200) {
                console.error("Error fetching products:", data.errorMessage);
                throw new Error(data.errorMessage);
            }

            setProducts(data.filter((product) => product.IS_DELETED === 1));
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {errorMessage && (
                <div className="flex flex-col gap-4 items-center min-h-52">
                    <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">{errorMessage}</div>
                </div>
            )}
            {products.length === 0 && !errorMessage && (
                <div className="flex flex-col gap-4 items-center min-h-52">
                    <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No products deleted</div>
                </div>
            )}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
                    gap: "40px 15px",
                    margin: "30px auto 60px auto",
                    minWidth: "700px",
                }}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.PRODUCT_ID}
                        product={product}
                        productName={product.PRODUCT_NAME}
                        productPrice={product.PRODUCT_PRICE}
                        productImageUrl={product.PRODUCT_IMAGE_URL}
                        productDiscount={product.PRODUCT_DISCOUNT}
                        productRatingCount={product.RATING_COUNT}
                        productTotalRating={product.RATING}
                        redirectionUrl={`/supplier/${product.PRODUCT_ID}`}
                        includeCategory={true}
                    />
                ))}
            </div>
        </>
    );
}
