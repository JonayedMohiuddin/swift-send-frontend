import { useLoaderData, Form } from "react-router-dom";
import { useState } from "react";

import ProductCard from "../../components/product-card/product-card";
import Pagination from "../../components/pagination/pagination";
import "./catalog.css";

export default function Catalog() {
    let { products, page, totalPages, category, search, totalProducts } = useLoaderData();

    const [currentProducts, setCurrentProducts] = useState(products);

    const [minPriceFilter, setMinPriceFilter] = useState(0);
    const [maxPriceFilter, setMaxPriceFilter] = useState(0);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [discountFilter, setDiscountFilter] = useState(0);

    function filterProducts() {
        let temp = products.filter((product) => {
            let minPrice = parseInt(minPriceFilter);
            let maxPrice = parseInt(maxPriceFilter);
            let rating = parseInt(ratingFilter);
            let discount = parseInt(discountFilter);

            if(minPrice == 0) minPrice = -1;
            if(maxPrice == 0) maxPrice = -1;
            if(rating == 0) rating = -1;
            if(discount == 0) discount = -1;

            if (minPrice > 0 && product.PRICE < minPrice && minPrice != -1) return false;
            if (maxPrice > 0 && product.PRICE > maxPrice && maxPrice != -1) return false;
            if (rating > 0 && product.RATING < rating && rating != -1) return false;
            if (discount > 0 && product.DISCOUNT < discount && discount != -1) return false;

            return true;
        });

        setCurrentProducts(temp);
    }

    function resetFilters() {
        setMinPriceFilter(0);
        setMaxPriceFilter(0);
        setRatingFilter(0);
        setDiscountFilter(0);

        setCurrentProducts(products);
    }

    return (
        <>
            <div className="flex flex-col text-sm font-ember-regular text-ember-black mb-5">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row bg-slate-300 p-2 rounded-md rounded-r-none items-center">
                        <label className="mr-3">Min Price:</label>
                        <input type="number" className="border border-ember-black rounded-md  p-1 w-14 text-center" value={minPriceFilter} onChange={(e) => setMinPriceFilter(e.target.value)} />
                    </div>

                    <div className="flex flex-row bg-slate-300 p-2 rounded-md rounded-l-none items-center">
                        <label className="mr-3">Max Price:</label>
                        <input type="number" className="border border-ember-black rounded-md p-1 w-14 text-center" value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(e.target.value)} />
                    </div>

                    <div className="flex flex-row bg-slate-300 ml-4 p-2 rounded-md items-center">
                        <label className="mr-3">Rating:</label>
                        <input type="number" className="border border-ember-black rounded-md p-1 w-14 text-center" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} />
                    </div>

                    <div className="flex flex-row bg-slate-300 ml-4 p-2 rounded-md items-center">
                        <label className="mr-3">Discount:</label>
                        <input type="number" className="border border-ember-black rounded-md p-1 w-14 text-center" value={discountFilter} onChange={(e) => setDiscountFilter(e.target.value)} />
                        <div className="text-xs ml-2">%</div>
                    </div>

                    <div className="flex flex-row bg-ember-black text-white p-2 rounded-md ml-4 items-center">
                        <button className="text-xs bg-primary p-3 rounded-md hover:bg-primary-light" onClick={filterProducts}>Filter</button>
                        <button className="text-xs bg-primary p-3 rounded-md hover:bg-primary-light ml-4" onClick={resetFilters}>Reset</button>
                    </div>
                </div>
            </div>

            <div className="product-card-container">
                {currentProducts
                    .filter((product) => product.CATEGORY_ID !== null)
                    .map((product) => (
                        <ProductCard
                            key={product.ID}
                            product={product}
                            productName={product.NAME}
                            productPrice={product.PRICE}
                            productImageUrl={product.IMAGE_URL}
                            productDiscount={product.DISCOUNT}
                            productRatingCount={product.RATING_COUNT}
                            productTotalRating={product.RATING}
                            redirectionUrl={`/catalog/${product.ID}`}
                            includeCategory={true}
                        />
                    ))}
            </div>

            <Form action="/catalog" method="get" className="mt-5 mb-7">
                <input className="hidden" name="search" defaultValue={search || ""}></input>
                <input className="hidden" name="category" defaultValue={category || ""}></input>
                <Pagination currentPage={page} lastPage={totalPages} totalProducts={totalProducts} />
            </Form>
        </>
    );
}
