import { useLoaderData } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card";
import "./catalog.css";
 
export default function Catalog() {
    const { products } = useLoaderData();

    return (
        <div className="product-card-container">
            {products.map((product) => (
                <ProductCard key={product.ID} product={product} />
            ))}
        </div>
    );
}
