import { Link } from "react-router-dom";

import "./product-card.css";

export default function ProductCard() {
    return (
        <div className="product-card">
            <Link to="/catalog/product/1" className="product-card__link">
                <img src="./public/images/no-product-image.jpg" alt="product" className="product-card__image" />
                <div className="product-card__content">
                    <div className="product-card__name">Test test test test test test </div>
                    <div className="product-card__rating product-card__rating--star-icon">0 (20)</div>
                    <div className="product-card__extras-container">
                        <div className="product-card__free-delivery">Free Delivery</div>
                        <div className="product-card__voucher">Voucher: 7</div>
                    </div>
                    <div className="product-card__price">&#x9F3; 0.00</div>
                </div>
            </Link>
        </div>
    );
}
