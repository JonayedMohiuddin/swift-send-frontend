import { Link } from "react-router-dom";

import "./product-card.css";

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <Link to={`/catalog/${product.ID}`} className="product-card__link">
                <img
                    src="/images/no-product-image.jpg"
                    // ***********************
                    // src={product.IMAGE_URL}
                    // ***********************
                    alt={product.NAME}
                    className="product-card__image"
                    onError={(e) => {
                        e.target.src = "/images/no-product-image.jpg"; 
                    }}
                />
                <div className="product-card__content">
                    <div className="product-card__name">{product.NAME}</div>
                    <div className="product-card__rating product-card__rating--star-icon">3.4 ({122})</div>
                    <div className="product-card__extras-container">
                        <div className="product-card__free-delivery">Free Delivery</div>
                        <div className="product-card__voucher">Voucher: 7</div>
                    </div>
                    <div className="product-card__price">&#x9F3; {product.PRICE}</div>
                </div>
            </Link>
        </div>
    );
}
