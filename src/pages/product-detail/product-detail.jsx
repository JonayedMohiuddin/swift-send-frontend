import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./product-detail.css";
import QuantityManager from "../../components/QuantityManager/quantity-manager";

import { HeartIcon, ShareIcon, StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";

export default function ProductDetail() {
    const { product, reviews, hasBought, hasReviewed } = useLoaderData();
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(product);
    console.log(reviews);

    let rating = parseFloat(product.RATING);
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
            alert("Sign in using user account to add to cart.");
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login using user account to add to cart.");
        } else if (response.status !== 200) {
            alert("Error in adding to cart. Please try again.");
        } else {
            alert("Added to cart successfully.");
        }

        setQuantity(1);
    }

    async function handleBuyNow() {
        const response = await fetch("http://localhost:3000/users/orders/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product.ID, quantity: quantity }),
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login to add to cart.");
        } else if (response.status === 403) {
            alert("Sign in using user account to buy products.");
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login using user account to add to cart.");
        } else if (response.status !== 200) {
            alert("Error in adding to orders. Please try again.");
        } else {
            alert("Added to orders successfully.");
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
                        <div className="text-xs">{product.TOTAL_SOLD} Sold</div>
                    </div>
                    <div className="product-detail__split"></div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                        <div className="product-detail__price font-ember-bold">&#x9F3; {(product.PRICE - product.PRICE * product.DISCOUNT).toFixed(2)}</div>
                        <div className="product-detail__discount-price">&#x9F3; {product.PRICE.toFixed(2)}</div>
                    </div>

                    <QuantityManager quantity={quantity} setQuantity={setQuantity} />

                    <div className="product-detail__button-grp">
                        <button className="product-detail__buy-now-btn" onClick={handleBuyNow}>
                            Buy Now
                        </button>
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

                {/* <Ratings /> */}

                <Reviews reviews={reviews} productId={product.ID} />

                {isModalOpen && <AddEditReviews closeModal={() => setIsModalOpen(false)} />}

                {hasBought && !hasReviewed && (
                    <>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add Review
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

// Reviews Component
function Reviews({ reviews, productId }) {
    async function handleReviewEdit() {
        console.log("Edit review: ");
    }

    async function handleReviewDelete() {
        let response = await fetch("http://localhost:3000/users/review/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });

        window.location.reload();
    }

    return (
        <div className="col-span-3 flex flex-col gap-2 mt-5 ml-5 p-5 mr-10 bg-white">
            <div className="font-semibold text-lg mb-4">Customer Reviews</div>

            {reviews.length === 0 && <div className="font-light text-sm">No reviews yet. Be the first to write a review!</div>}

            {reviews.map((review) => (
                <div key={review.USER_ID} className="border p-4 py-3 rounded-md shadow-md">
                    <div className="flex items-center gap-x-4 mb-2">
                        <p className="flex flex-row items-center text-gray-500">
                            {Array.from({ length: review.RATING }, (_, i) => (
                                <SolidStarIcon key={i} className="w-3 h-3 text-yellow-300" />
                            ))}
                            {Array.from({ length: 5 - review.RATING }, (_, i) => (
                                <OutlineStarIcon key={5 + i} className="w-3 h-3 text-yellow-300" />
                            ))}
                        </p>
                        <p className="font-semibold text-xs text-blue-600 mr-auto">{review.NAME}</p>
                        {localStorage.getItem("userId") == review.USER_ID && localStorage.getItem("userType") === "users" && (
                            <div className="flex items-center gap-2">
                                <button className="text-xs text-blue-600 hover:underline" onClick={() => handleReviewEdit()}>
                                    Edit
                                </button>
                                <button className="text-xs text-blue-600 hover:underline" onClick={() => handleReviewDelete()}>
                                    Delete
                                </button>
                            </div>
                        )}
                        <p className="text-gray-500 text-xs">{new Date(review.LAST_UPDATED_ON).toLocaleString()}</p>
                    </div>
                    <p className="text-sm">{review.REVIEW}</p>
                </div>
            ))}
        </div>
    );
}

function AddEditReviews({ title = "Add or Edit Review", productId = 1, rating = 0, review = "", closeModal }) {
    async function handleReviewSubmit(event) {
        event.preventDefault();

        let review = document.getElementById("description").value;
        let rating = document.getElementById("rating").value;

        rating = parseInt(rating);

        if (!review || !rating) {
            alert("Please enter both review and rating.");
            return;
        }

        if (rating < 1 || rating > 5) {
            alert("Rating should be between 1 and 5.");
            return;
        }

        let response = await fetch("http://localhost:3000/users/review/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: 1, rating, review }),
        });

        if (response.status === 401) {
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login to add a review.");
        } else if (response.status === 403) {
            alert("Sign in using user account to add reviews.");
            window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login using user account to add a review.");
        } else if (response.status !== 200) {
            alert("Error in adding review. Please try again.");
        } else {
            window.location.reload();
        }
    }

    return (
        <>
            {/*
            <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Toggle modal
            </button>
            {isModalOpen && ( */}
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed top-5 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5 flex flex-col">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Rating
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                        defaultValue={rating}
                                    />
                                </div>
                                {/* <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="$2999"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option selected="">Select category</option>
                                            <option value="TV">TV/Monitors</option>
                                            <option value="PC">PC</option>
                                            <option value="GA">Gaming/Console</option>
                                            <option value="PH">Phones</option>
                                        </select>
                                    </div> */}
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Review
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write product description here"
                                        defaultValue={review}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ml-auto text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleReviewSubmit}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    );
}

// function AddReviews() {
//     async function handleSubmitReview(event) {
//         event.preventDefault();

//         let review = document.getElementById("review").value;
//         let rating = document.getElementById("rating").value;

//         rating = parseInt(rating);

//         if (!review || !rating) {
//             alert("Please enter both review and rating.");
//             return;
//         }

//         if (rating < 1 || rating > 5) {
//             alert("Rating should be between 1 and 5.");
//             return;
//         }

//         let response = await fetch("http://localhost:3000/users/review/add", {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ productId: 1, rating, review }),
//         });

//         if (response.status === 401) {
//             window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login to add a review.");
//         } else if (response.status === 403) {
//             alert("Sign in using user account to add reviews.");
//             window.location.href = "/users/login?errorMessage=" + encodeURIComponent("Please login using user account to add a review.");
//         } else if (response.status !== 200) {
//             alert("Error in adding review. Please try again.");
//         } else {
//             window.location.reload();
//         }
//     }

//     return (
//         <div className="col-span-3 flex flex-col gap-2 mt-5 ml-5 p-5 mr-10 bg-white border py-3 rounded-md shadow-md mb-10">
//             <form>
//                 <div className="mb-4">
//                     <label htmlFor="review" className="block text-sm font-medium text-gray-700">
//                         Your Review
//                     </label>
//                     <textarea
//                         id="review"
//                         name="review"
//                         rows="4"
//                         className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Share your thoughts..."
//                     ></textarea>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//                         Rating (1-5)
//                     </label>
//                     <input
//                         type="number"
//                         id="rating"
//                         name="rating"
//                         min="1"
//                         max="5"
//                         className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         placeholder="Rate from 1 to 5"
//                     />
//                 </div>
//                 <div className="flex justify-end">
//                     <button
//                         type="submit"
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         onClick={handleSubmitReview}
//                     >
//                         Submit Review
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

function Ratings() {
    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-1 text-sm font-medium text-gray-500">4.95</p>
                        <p className="ms-1 text-sm font-medium text-gray-500">out of</p>
                        <p className="ms-1 text-sm font-medium text-gray-500">5</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500">1,745 global ratings</p>
                </div>
                <div className="flex flex-col min-w-[400px]">
                    <div className="flex items-center mt-4">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            5 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">70%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            4 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div className="h-5 bg-yellow-300 rounded" style={{ width: "17%" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">17%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            3 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div className="h-5 bg-yellow-300 rounded" style={{ width: "8%" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">8%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            2 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div className="h-5 bg-yellow-300 rounded" style={{ width: "4%" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">4%</span>
                    </div>
                    <div className="flex items-center mt-4">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                            1 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div className="h-5 bg-yellow-300 rounded" style={{ width: "1%" }} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">1%</span>
                    </div>
                </div>
            </div>
        </>
    );
}
