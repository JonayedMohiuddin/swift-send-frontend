import ProductCard from "../../components/product-card/product-card";

import "./catalog.css";

export default function Catalog() {
    return (
        <div className="product-card-container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
}
