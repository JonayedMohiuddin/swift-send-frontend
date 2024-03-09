import { Link } from "react-router-dom";

import "./product-card.css";

export default function ProductCard({ product, productName, productPrice, productImageUrl, productDiscount, productRatingCount, productTotalRating, redirectionUrl, includeCategory = false }) {
    let rating = 0;
    rating = productTotalRating.toFixed(1);
    let ratingBar = Math.ceil(rating);

    return (
        <div className="product-card">
            <Link to={redirectionUrl} className="product-card__link">
                <img
                    src={productImageUrl}
                    alt={productName}
                    className="product-card__image"
                    onError={(e) => {
                        e.target.src = "/images/no-product-image.jpg";
                    }}
                />
                <div className="product-card__content">
                    <div className="product-card__name h-[2lh] line-clamp-2 mb-2">{productName}</div>
                    {/* <div className="product-card__rating product-card__rating--star-icon">
                        {rating} ({productRatingCount})
                    </div> */}
                    <div>
                        <div className="flex items-center mb-2">
                            <SmallRatingBar rating={ratingBar} />

                            <div className="text-gray-500 text-xs ml-2 font-ember-regular">
                                {rating} ({productRatingCount})
                            </div>
                        </div>
                    </div>

                    {includeCategory && <div className="text-xs text-gray-500 font-ember-regular mb-1">{product.CATEGORY_NAME}</div>}

                    {/* <div className="product-card__extras-container">
                        <div className="product-card__free-delivery">Free Delivery</div>
                        <div className="product-card__voucher">Voucher: 7</div>
                    </div> */}

                    {productDiscount > 0 ? (
                        <div className="flex flex-row gap-x-2 items-center">
                            <div className="product-card__price text-writing-important">&#x9F3; {Math.ceil(productPrice - productDiscount * productPrice)}</div>
                            <div className="ml-0.5 text-writing-unimportant font-bold line-through">&#x9F3; {Math.ceil(productPrice)}</div>
                        </div>
                    ) : (
                        <div className="product-card__price text-writing-important">&#x9F3; {Math.ceil(productPrice)}</div>
                    )}
                </div>
            </Link>
        </div>
    );
}

function SmallRatingBar({ rating }) {
    return (
        <>
            {Array(rating)
                .fill()
                .map((_, i) => (
                    <svg key={i} className="w-3 h-3 ms-0.5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
            {Array(5 - rating)
                .fill()
                .map((_, i) => (
                    <svg key={i} className="w-3 h-3 ms-0.5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
        </>
    );
}
