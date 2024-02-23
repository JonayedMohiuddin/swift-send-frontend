import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import "./product-detail.css";
import QuantityManager from "../../components/QuantityManager/quantity-manager";

import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function ProductDetail() {
    const { product } = useLoaderData();
    const [quantity, setQuantity] = useState(1);

    console.log(product);

    let rating = 0;
    if (product.RATING_COUNT > 0) {
        rating = product.TOTAL_RATING / product.RATING_COUNT;
    }

    let ratingBarWidth = (rating / 5) * 100;

    async function handleAddToCart() {
        const response = await fetch("http://localhost:3000/cart/add/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: product.ID, quantity: quantity }),
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login to add to cart.");
        } else if (response.status === 403) {
            alert("Sign in using user account to access this page.");
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login using user account to add to cart.");
        } else if (response.status !== 200) {
            alert("Error in adding to cart. Please try again.");
        } else {
            alert("Added to cart successfully.");
        }

        setQuantity(1);
    }

    return (
        <div className="font-ember-regular">
            <div className="detail-container">
                <div className="gallery">
                    <img
                        className="gallery__image"
                        src={product.IMAGE_URL}
                        alt="product"
                        onError={(e) => {
                            e.target.src = "/images/no-product-image.jpg";
                        }}
                    />
                </div>
                <div className="product-detail">
                    <div className="product-detail__name line-clamp-3">{product.NAME}</div>
                    <div className="product-detail__rating-container">
                        <div className="product-detail__ratings">
                            <div className="product-detail__empty-stars"></div>
                            <div className="product-detail__full-stars" style={{ width: `${ratingBarWidth}%` }}></div>
                        </div>
                        <div className="ml-1 product-detail__rating-count">{rating.toFixed(1)}</div>
                        <div className="ml-1 product-detail__rating-count">
                            ({product.RATING_COUNT} {product.RATING_COUNT > 1 ? "ratings" : "rating"})
                        </div>
                        <div className="w-[2px] h-4 bg-black ml-2 mr-2"></div>
                        <div className="text-xs">{123} Sold</div>
                    </div>
                    <div className="product-detail__split"></div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                        <div className="product-detail__price font-ember-bold">&#x9F3; {(product.PRICE - product.PRICE * product.DISCOUNT).toFixed(2)}</div>
                        <div className="product-detail__discount-price">&#x9F3; {(product.PRICE).toFixed(2)}</div>
                    </div>

                    <QuantityManager quantity={quantity} setQuantity={setQuantity} />

                    <div className="product-detail__button-grp">
                        <button className="product-detail__buy-now-btn">Buy Now</button>
                        <button className="product-detail__add-to-cart-btn " onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="other-detail">
                    <div className="flex flex-col gap-2">
                        {/* <div className="flex flex-row items-center justify-between">
                            <div className="other-detail__header">Cateogry</div>
                        <div className="font-ember-regular text-sm mr-5">{product.CATEGORY_NAME}</div>
                        </div> */}
                        <div className="other-detail__header">Sold by</div>
                        <div className="font-ember-regular text-lg">{product.SUPPLIER_NAME}</div>
                        <div className="flex flex-row items-center justify-start gap-3 mt-2">
                            <button
                                name="addToWishlist"
                                className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
                            >
                                <HeartIcon className="w-4 h-4 mr-2" />
                                Add to wishlist
                            </button>
                            <button className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                                <ShareIcon className="w-4 h-4 mr-2" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex flex-col gap-2 mt-5 ml-5 p-5 mr-10  text-slate-800 ">
                    <div className="font-ember-bold text-lg">About this item</div>
                    <div className="font-ember-light text-sm">{product.DESCRIPTION}</div>
                </div>
            </div>
        </div>
    );
}
