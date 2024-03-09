import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

import "./supplier-product-detail.css";
import QuantityManager from "../../components/QuantityManager/quantity-manager";

import { HeartIcon as HeartIconOutline, ShareIcon, StarIcon as OutlineStarIcon, TruckIcon, ArrowPathIcon, TrashIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function SupplierProductDetail() {
    const { product, reviews } = useLoaderData();

    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasResponsed, setHasResponsed] = useState(false);

    console.log(product);
    console.log(reviews);

    let rating = parseFloat(product.RATING);
    let ratingBarWidth = (rating / 5) * 100;

    async function handleRemoveProduct() {
        console.log("Removing product");
        const response = await fetch("http://localhost:3000/supplier/removeProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product.ID }),
            credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "/supplier/login?errorMessage=" + encodeURIComponent("Please login to remove product.");
        } else if (response.status === 403) {
            alert("Sign in using supplier account to access this page.");
            window.location.href = "/supplier/login?errorMessage=" + encodeURIComponent("Please login using supplier account to remove product.");
        } else if (response.status !== 200) {
            alert("Error in removing product. Please try again.");
        } else {
            window.location.href = "/supplier";
        }
    }

    async function handleRestoreProduct() {
        const response = await fetch("http://localhost:3000/supplier/restoreProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product.ID }),
            credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "/supplier/login?errorMessage=" + encodeURIComponent("Please login to restore product.");
        } else if (response.status === 403) {
            alert("Sign in using supplier account to access this page.");
            window.location.href = "/supplier/login?errorMessage=" + encodeURIComponent("Please login using supplier account to restore product.");
        } else if (response.status !== 200) {
            alert("Error in restoring product. Please try again.");
        } else {
            window.location.href = "/supplier";
        }
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
                        {/* <div className="w-[1px] h-4 bg-black ml-2 mr-2"></div> */}
                        <TruckIcon className="ml-3 mr-1 w-4 h-4 text-black-300" />
                        <div className="text-xs">{product.TOTAL_SOLD} Sold</div>
                    </div>
                    <div className="product-detail__split"></div>
                    <div className="flex flex-row gap-4 items-center mb-4">
                        <div className="font-ember-bold text-writing-important" style={{ fontSize: "30px", padding: "10px 0px", height: "45px" }}>
                            &#x9F3; {(product.PRICE - product.PRICE * product.DISCOUNT).toFixed(2)}
                        </div>
                        {product.DISCOUNT > 0 && <div className="product-detail__discount-price">&#x9F3; {product.PRICE.toFixed(2)}</div>}
                    </div>
                    <QuantityManager quantity={quantity} setQuantity={setQuantity} />
                    <div className="product-detail__button-grp">
                        <Link
                            to={`/supplier/updateProduct/${product.ID}`}
                            className="pl-3 flex flex-row gap-2 font-ember-regular text-sm p-2 bg-green-700 text-white rounded-md w-40 hover:bg-green-600 hover:underline"
                        >
                            <ArrowPathIcon className="h-5 w-5" /> Update Product
                        </Link>
                        {product.IS_DELETED === 1 ? (
                            <button
                                onClick={handleRestoreProduct}
                                className="pl-3 flex flex-row gap-2 font-ember-regular text-sm p-2 bg-primary text-white rounded-md w-40 hover:bg-primary-dark hover:underline"
                            >
                                <ArrowPathIcon className="h-5 w-5" /> Restore Product
                            </button>
                        ) : (
                            <button
                                onClick={handleRemoveProduct}
                                className="pl-3 flex flex-row gap-2 font-ember-regular text-sm p-2 bg-red-700 text-white rounded-md w-40 hover:bg-red-600 hover:underline"
                            >
                                <TrashIcon className="h-5 w-5" /> Remove Product
                            </button>
                        )}
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
                            <button className="flex flex-row bg-slate-200 hover:text-writing-important text-xs font-ember-regular rounded-md py-1 px-2 hover:bg-primary hover:bg-opacity-15 hover:underline">
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

                <Reviews reviews={reviews} productId={product.ID} hasResponsed={hasResponsed} setIsModalOpen={setIsModalOpen} />

                {isModalOpen && <AddEditReviews closeModal={() => setIsModalOpen(false)} hasResponsed={hasReviewed} productId={product.ID} paramReview={userReview} paramRating={userRating} />}
            </div>
        </div>
    );
}

// Reviews Component
function Reviews({ reviews, productId, setIsModalOpen }) {
    async function handleReviewEdit() {
        setIsModalOpen(true);
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
                                <SolidStarIcon key={i} className="w-3 h-3 text-black-300" />
                            ))}
                            {Array.from({ length: 5 - review.RATING }, (_, i) => (
                                <OutlineStarIcon key={5 + i} className="w-3 h-3 text-black-300" />
                            ))}
                        </p>

                        <p className="font-semibold text-xs text-blue-600 mr-auto">{review.NAME === null || review.NAME === "" ? "Anonymous" : review.NAME}</p>
                        <p className="text-gray-500 text-xs">{new Date(review.LAST_UPDATED_ON).toLocaleString()}</p>
                    </div>
                    <p className="text-sm">{review.REVIEW}</p>
                </div>
            ))}
        </div>
    );
}

function AddEditReviews({ productId, paramRating, paramReview, closeModal, hasResponsed }) {
    const [rating, setRating] = useState(paramRating || 0);

    async function handleReviewSubmit(event) {
        event.preventDefault();

        let newReview = document.getElementById("description").value;
        let newRating = parseInt(rating) || 0;

        console.log(newReview, newRating);

        newRating = parseInt(newRating);

        if (!newReview) {
            newReview = "";
        }

        if (!newRating) {
            alert("Please enter both review and rating.");
            return;
        }

        if (newRating < 1 || newRating > 5) {
            alert("Rating should be between 1 and 5.");
            return;
        }

        let mode = "add"; // add or edit
        if (hasResponsed) mode = "edit";

        let response = await fetch(`http://localhost:3000/users/review/${mode}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, rating: newRating, review: newReview }),
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
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed top-5 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{hasResponsed ? "Edit Review" : "Add Review"}</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5 flex flex-col">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <div className="flex items-center">
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setRating(1);
                                            }}
                                            className="text-gray-300 hover:text-yellow-300 focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ms-3 ${rating >= 1 ? "text-yellow-300" : "text-gray-300"}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setRating(2);
                                            }}
                                            className="text-gray-300 hover:text-yellow-300 focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ms-3 ${rating >= 2 ? "text-yellow-300" : "text-gray-300"}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setRating(3);
                                            }}
                                            className="text-gray-300 hover:text-yellow-300 focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ms-3 ${rating >= 3 ? "text-yellow-300" : "text-gray-300"}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setRating(4);
                                            }}
                                            className="text-gray-300 hover:text-yellow-300 focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ms-3 ${rating >= 4 ? "text-yellow-300" : "text-gray-300"}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setRating(5);
                                            }}
                                            className="text-gray-300 hover:text-yellow-300 focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ms-3 ${rating >= 5 ? "text-yellow-300" : "text-gray-300"}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Review
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write a review..."
                                        defaultValue={paramReview}
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
        </>
    );
}
