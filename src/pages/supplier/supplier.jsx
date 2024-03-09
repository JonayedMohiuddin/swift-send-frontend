import { useLoaderData, Link } from "react-router-dom";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import ProductCard from "../../components/product-card/product-card";

export default function Supplier() {
    const { products } = useLoaderData();

    const nonNullCategoryProducts = products.filter((product) => product.CATEGORY_ID != null && product.IS_DELETED == 0);
    const nullCategoryProducts = products.filter((product) => product.CATEGORY_ID == null && product.IS_DELETED == 0);

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold font-ember-bold text-gray-600">Your Products</h1>
            </div>

            {nonNullCategoryProducts.length == 0 && (
                <div className="flex flex-col gap-4 items-center">
                    <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No products found</div>
                    <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">Add new products</div>
                    <Link to="/supplier/addProduct" className="flex flex-row bg-primary text-white text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-primary-light hover:underline">
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Add Product
                    </Link>
                </div>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
                    gap: "40px 15px",
                    margin: "30px auto 60px auto",
                    minWidth: "700px",
                }}
            >
                {/* {products.map((product) => (
                    <ProductCard
                        key={product.PRODUCT_ID}
                        product={product}
                        productName={product.PRODUCT_NAME}
                        productPrice={product.PRODUCT_PRICE}
                        productImageUrl={product.PRODUCT_IMAGE_URL}
                        productDiscount={product.PRODUCT_DISCOUNT}
                        productRatingCount={product.RATING_COUNT}
                        productTotalRating={product.RATING}
                        redirectionUrl={`/supplier/${product.PRODUCT_ID}`}
                        includeCategory={true}
                    />
                ))} */}
                {nonNullCategoryProducts.map((product) => (
                    <ProductCard
                        key={product.PRODUCT_ID}
                        product={product}
                        productName={product.PRODUCT_NAME}
                        productPrice={product.PRODUCT_PRICE}
                        productImageUrl={product.PRODUCT_IMAGE_URL}
                        productDiscount={product.PRODUCT_DISCOUNT}
                        productRatingCount={product.RATING_COUNT}
                        productTotalRating={product.RATING}
                        redirectionUrl={`/supplier/${product.PRODUCT_ID}`}
                        includeCategory={true}
                    />
                ))}
            </div>

            {nullCategoryProducts.length > 0 && (
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-xl font-bold font-ember-bold text-red-600">Categorize (Customers wont see these unless)</h1>
                </div>
            )}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
                    gap: "40px 15px",
                    margin: "30px auto 60px auto",
                    minWidth: "700px",
                }}
            >
                {nullCategoryProducts.map((product) => (
                    <ProductCard
                        key={product.PRODUCT_ID}
                        product={product}
                        productName={product.PRODUCT_NAME}
                        productPrice={product.PRODUCT_PRICE}
                        productImageUrl={product.PRODUCT_IMAGE_URL}
                        productDiscount={product.PRODUCT_DISCOUNT}
                        productRatingCount={product.RATING_COUNT}
                        productTotalRating={product.RATING}
                        redirectionUrl={`/supplier/${product.PRODUCT_ID}`}
                        includeCategory={true}
                    />
                ))}
            </div>
        </>
    );
}

// function ProductItem({ item }) {
//     return (
//         <>
//             <div className="flex flex-row  bg-slate-300 p-4 rounded-lg">
//                 <img src={item.PRODUCT_IMAGE_URL} alt="product" className="w-[170px] h-[170px]" />

//                 <div className="flex flex-col ml-3 mt-2 mr-auto">
//                     <div className="font-bold h-[2lh] line-clamp-2">{item.PRODUCT_NAME} </div>
//                     <div className="flex flex-row gap-x-2 mt-4">
//                         <button
//                             name="addToWishlist"
//                             className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
//                         >
//                             <HeartIcon className="w-4 h-4 mr-2" />
//                             Update
//                         </button>
//                         <button
//                             name="remove"
//                             className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
//                             onClick={() => console.log("remove")}
//                         >
//                             <TrashIcon className="w-4 h-4 mr-2" />
//                             Remove
//                         </button>
//                         {/* <button className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
//                             <ShareIcon className="w-4 h-4 mr-2" />
//                             Share
//                         </button> */}
//                     </div>
//                 </div>

//                 <div className="flex flex-col mt-2">
//                     <div className="text-lg font-bold font-[amazon-ember-rg] text-daraz-orange mx-auto mb-2">৳ {item.PRODUCT_PRICE}</div>
//                     <div className="text-xs font-[amazon-ember-lt] mx-auto mb-3 line-through text-zinc-500">৳ {item.PRODUCT_PRICE * (1 - item.DISCOUNT)}</div>
//                 </div>
//             </div>
//         </>
//     );
// }

/*
"PRODUCT_ID": 21,
    "PRODUCT_NAME": "Product 1",
    "PRODUCT_PRICE": 100,
    "PRODUCT_DESCRIPTION": "Product 1 description",
    "PRODUCT_IMAGE_URL": "images/no-product-image.jpg",
    "PRODUCT_DISCOUNT": 0.1,
    "PRODUCT_RATING_COUNT": null,
    "PRODUCT_TOTAL_RATING": null,
    "CATEGORY_ID": 1,
    "CATEGORY_NAME": "CAT1",
    "CATEGORY_DESCRIPTION": null,
    "CATEGORY_IMAGE_URL": "c/images/no-category-image.jpg"
    */
