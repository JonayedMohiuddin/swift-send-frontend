import { useLoaderData, Form } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card";
import Pagination from "../../components/pagination/pagination";
import "./catalog.css";

export default function Catalog() {
    const { products, page, totalPages, category, search, totalProducts } = useLoaderData();

    return (
        <>
            <div className="product-card-container">
                {products.map((product) => (
                    <ProductCard key={product.ID} product={product} />
                ))}
            </div>

            <Form action="/catalog" method="get" className="mt-5 mb-7">
                <input onChange={() => {}} className="hidden" name="search" value={search} ></input>
                <input onChange={() => {}} className="hidden" name="category" value={category} ></input>
                <Pagination currentPage={page} lastPage={totalPages} totalProducts={totalProducts}/>
            </Form>
        </>
    );
}
