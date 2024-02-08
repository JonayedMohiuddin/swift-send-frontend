export default function QuantityManager({ quantity, setQuantity }) {
    function onDecrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function onIncrementQuantity() {
        setQuantity(quantity + 1);
    }

    function onHandleInputChange(event) {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    }

    function onHandleInputBlur(event) {
        const newQuantity = parseInt(event.target.value, 10);
        if (isNaN(newQuantity) || newQuantity < 1) {
            setQuantity(1);
        }
    }

    return (
        <div className="product-detail__quantity-manager">
            <div className="product-detail__quantity-label">Quantity</div>
            
            <button className="product-detail__quantity-btn" disabled={quantity === 1} onClick={onDecrementQuantity}>
                -
            </button>
            <input className="product-detail__quantity-input" type="number" value={quantity} onChange={onHandleInputChange} onBlur={onHandleInputBlur} />
            <button className="product-detail__quantity-btn" onClick={onIncrementQuantity}>
                +
            </button>
        </div>
    );
}
