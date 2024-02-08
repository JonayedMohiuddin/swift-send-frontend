export default function ProductDetail() {
    return (
        <div className="detail-container">
            <div className="gallery">
                <img className="gallery__image" src="/public/images/no-product-image.jpg" alt="product" />
            </div>
            <div className="product-detail">
                <div className="product-detail__name js-product-name">Product Name</div>
                <div className="product-detail__rating-container">
                    <div className="product-detail__ratings">
                        <div className="product-detail__empty-stars"></div>
                        <div className="product-detail__full-stars js-rating-bar"></div>
                    </div>
                    <a className="product-detail__rating-count js-rating-count" href="">
                        0 Ratings
                    </a>
                </div>
                <div className="product-detail__split"></div>
                <div className="product-detail__price js-product-price">&#x9F3; 0.00</div>
                <div className="product-detail__quantity-manager">
                    <div className="product-detail__quantity-label">Quantity</div>
                    <button className="product-detail__quantity-btn js-decrement-quantity-btn">-</button>
                    <input className="product-detail__quantity-input js-quantity-input" type="text" value="1" />
                    <button className="product-detail__quantity-btn js-increment-quantity-btn">+</button>
                </div>
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
