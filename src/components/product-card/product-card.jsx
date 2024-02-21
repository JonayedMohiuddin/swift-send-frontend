import { Link } from "react-router-dom";

import "./product-card.css";

export default function ProductCard({ product, productName, productPrice, productImageUrl, productDiscount, productRatingCount, productTotalRating, redirectionUrl}) {
    let rating = 0;
    if (productRatingCount > 0) {
        rating = (productTotalRating/productRatingCount).toFixed(1)
    }
    
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
                    <div className="product-card__name">{productName}</div>
                    <div className="product-card__rating product-card__rating--star-icon">{rating} ({productRatingCount})</div>
                    <div className="product-card__extras-container">
                        <div className="product-card__free-delivery">Free Delivery</div>
                        <div className="product-card__voucher">Voucher: 7</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="product-card__price">&#x9F3; {Math.ceil(productPrice)}</div>
                        <div className="ml-1 text-gray-500 font-bold line-through">&#x9F3; {Math.ceil(productPrice - productDiscount * productPrice)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
