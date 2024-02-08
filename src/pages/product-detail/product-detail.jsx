import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import "./product-detail.css";
import QuantityManager from "./quantity-manager";

export default function ProductDetail() {
    const { product } = useLoaderData();

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="detail-container">
            <div className="gallery">
                <img className="gallery__image" src={product.IMAGE_URL} alt="product" />
            </div>
            <div className="product-detail">
                <div className="product-detail__name">{product.NAME}</div>
                <div className="product-detail__rating-container">
                    <div className="product-detail__ratings">
                        <div className="product-detail__empty-stars"></div>
                        <div className="product-detail__full-stars" style={{ width: "70%" }}></div>
                    </div>
                    <a className="product-detail__rating-count" href="">
                        0 Ratings
                    </a>
                </div>
                <div className="product-detail__split"></div>
                <div className="product-detail__price">&#x9F3; {product.PRICE}</div>
                <QuantityManager quantity={quantity} setQuantity={setQuantity} />
                <div className="product-detail__button-grp">
                    <button className="product-detail__buy-now-btn js-buy-now-btn">Buy Now</button>
                    <button className="product-detail__add-to-cart-btn js-add-to-cart-btn" onClick={() => {}}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="other-detail">
                <div className="other-detail__header">Other Details Implemented Later</div>
            </div>
        </div>
    );
}
