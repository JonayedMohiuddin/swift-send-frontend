import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../../components/form-components/inputField";

import QuantityManager from "../../components/QuantityManager/quantity-manager";

import { TrashIcon, HeartIcon, ShareIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

/*
"cartItems": [
    {
      "CART_ITEM_ID": 1,
      "USER_ID": 1,
      "PRODUCT_ID": 1,
      "QUANTITY": 2,
      "PRODUCT_ID_1": 1,
      "SUPPLIER_ID": 1,
      "CATEGORY_ID": 1,
      "PRODUCT_NAME": "Bulb",
      "PRICE": 219,
      "IMAGE_URL": "/public/images/no-product-image.jpg",
      "DISCOUNT": 0,
      "RATING": null,
      "TOTAL_RATING": null,
      "SUPPLIER_NAME": "TEST"
    },
*/

export default function Cart() {
    const { cartItems } = useLoaderData();

    // group cart items by supplier
    const shopProducts = [];
    let lastSupplierName = "";
    let currentSupplierProducts = [];
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].SUPPLIER_NAME !== lastSupplierName) {
            if (currentSupplierProducts.length > 0) {
                shopProducts.push({ supplierName: lastSupplierName, products: currentSupplierProducts });
            }
            currentSupplierProducts = [];
            lastSupplierName = cartItems[i].SUPPLIER_NAME;
        }

        currentSupplierProducts.push(cartItems[i]);
    }
    if (currentSupplierProducts.length > 0) {
        shopProducts.push({ supplierName: lastSupplierName, products: currentSupplierProducts });
    }

    // calculate total price and savings
    let initTotalPrice = 0,
        initSavings = 0;

    for (let i = 0; i < cartItems.length; i++) {
        // console.log(cartItems[i].PRICE, cartItems[i].QUANTITY);
        initTotalPrice += cartItems[i].PRICE * cartItems[i].QUANTITY;
        initSavings += cartItems[i].PRICE * cartItems[i].DISCOUNT * cartItems[i].QUANTITY;
    }
    const [totalPrice, setTotalPrice] = useState(initTotalPrice);
    const [savings, setSavings] = useState(initSavings);

    return (
        <>
            <div className="flex flex-row font-[amazon-ember-lt] mb-10 gap-x-2">
                <div className="w-3/4 flex flex-col gap-y-7">
                    {cartItems.length === 0 && (
                        <div className="flex flex-col bg-white p-3 rounded-lg shadow">
                            <div className="flex flex-row text-lg font-bold text-daraz-orange mb-5 font-ember-light"><ShoppingCartIcon className="w-8 pr-2"/> Your cart is empty</div>
                            <div className="text-base font-ember-light">You have no items in your cart. Start adding items to your cart.</div>
                            <Link to="/catalog" className="text-lg font-ember-regular text-center h-9 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md py-1 px-2 mt-5">Continue shopping</Link>
                        </div>
                    )}
                    {/* START */}
                    {shopProducts.map((shop) => (
                        <div key={shop.supplierName} className="flex flex-col bg-white pt-2 rounded-lg shadow">
                            <div className="flex flex-row justify-between items-center sticky top-16">
                                <div className="font-bold font-[amazon-ember-rg] mx-3 mb-3 bg-slate-100 rounded-lg px-5">{shop.supplierName}</div>
                                <div className="font-bold font-[amazon-ember-rg] mx-3 mb-3 bg-slate-100 rounded-lg px-5">{shop.products.length} Items</div>
                            </div>
                            <div className="flex flex-col gap-y-6 mx-3 mb-3">
                                {shop.products.map((item) => (
                                    <CartItem key={item.CART_ITEM_ID} cartItem={item} totalPrice={totalPrice} saving={savings} setTotalPrice={setTotalPrice} setSavings={setSavings} />
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* <div className="flex flex-col bg-white pt-2 rounded-lg ">
                        <div className="flex flex-row justify-between items-center sticky top-16">
                            <div className="text-xl font-bold font-[amazon-ember-rg] text-daraz-orange mx-3 mb-5 bg-slate-100 rounded-lg px-5">Electronics Mart</div>
                            <div className="text-xl font-bold font-[amazon-ember-rg] text-daraz-orange mx-3 mb-5 bg-slate-100 rounded-lg px-5">Items {3}</div>
                        </div>
                        <div className="flex flex-col gap-y-7 mx-3 mb-3">
                            {cartItems.map((item) => (
                                <CartItem key={item.ID} cartItem={item} />
                            ))}
                        </div>
                    </div> */}
                    {/* END */}
                </div>
                <div className="w-1/4">
                    <div className="flex flex-col bg-white p-3 sticky top-20 rounded-lg">
                        <div className="text-lg font-bold text-daraz-orange mb-5 font-ember-light">Order Summary</div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Subtotal {cartItems.length} items</div>
                            <div className="text-base font-ember-light">৳ {totalPrice - savings}</div>
                        </div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Savings</div>
                            <div className="text-base font-ember-light">৳ {savings}</div>
                        </div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Total</div>
                            <div className="font-bold font-ember-light text-daraz-orange">৳ {totalPrice}</div>
                        </div>
                        <div className="flex flex-row justify-between mb-3 gap-x-2">
                            <InputField name="code" autocomplete="off" label="Promo code" placeholder="Enter code" />
                            <button className="text-xs font-ember-light bg-cyan-500 text-white rounded-md py-1 px-2 hover:bg-[#cc4705]">Apply</button>
                        </div>
                        <button className="text-lg font-ember-regular h-9 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md py-1 px-2">Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
}

function CartItem({ cartItem, totalPrice, saving, setTotalPrice, setSavings }) {
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(cartItem.QUANTITY);

    async function onQuantityChange(newQuantity) {
        console.log("Updating quantity to " + newQuantity);

        const response = await fetch("http://localhost:3000/cart/update/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart_item_id: cartItem.CART_ITEM_ID, quantity: newQuantity }),
        });

        if (response.status !== 200) {
            console.error("Error in updating cart item quantity");
            return;
        }

        setTotalPrice(totalPrice - cartItem.PRICE * quantity + cartItem.PRICE * newQuantity);
        setSavings(saving - cartItem.PRICE * cartItem.DISCOUNT * quantity + cartItem.PRICE * cartItem.DISCOUNT * newQuantity);
        setQuantity(newQuantity);
    }

    async function handleRemoveCartItem(cartItemId) {
        const response = await fetch(`http://localhost:3000/cart/remove/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart_item_id: cartItemId }),
        });

        if (response.status !== 200) {
            console.error("Error in removing cart item");
            return;
        }

        window.location.reload();
    }

    return (
        <>
            <div className="flex flex-row">
                <img src={cartItem.IMAGE_URL} alt="product" className="w-[140px] h-[140px]" />

                <div className="flex flex-col ml-3 mt-2 mr-auto">
                    <div className="font-bold h-[2lh] overflow-ellipsis-2">{cartItem.PRODUCT_NAME} </div>
                    <div className="flex flex-row gap-x-2 mt-4">
                        <button
                            name="addToWishlist"
                            className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
                        >
                            <HeartIcon className="w-4 h-4 mr-2" />
                            Add to wishlist
                        </button>
                        <button
                            name="remove"
                            className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
                            onClick={() => handleRemoveCartItem(cartItem.CART_ITEM_ID)}
                        >
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Remove
                        </button>
                        <button className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                            <ShareIcon className="w-4 h-4 mr-2" />
                            Share
                        </button>

                        {/* <button className="text-daraz-orange p-2 hover:underline">Save for later</button> */}
                    </div>{" "}
                </div>

                <div className="flex flex-col mt-2">
                    <div className="text-lg font-bold font-[amazon-ember-rg] text-daraz-orange mx-auto mb-2">৳ {cartItem.PRICE * quantity}</div>
                    <div className="text-xs font-[amazon-ember-lt] mx-auto mb-3 line-through text-zinc-500">৳ {cartItem.PRICE * (1 - cartItem.DISCOUNT) * quantity}</div>
                    <QuantityManager quantity={quantity} setQuantity={onQuantityChange} />
                </div>
            </div>{" "}
        </>
    );
}

// function QuantityManager({ quantity, setQuantity }) {
//     function onDecrementQuantity(event) {
//         console.log("Decrementing quantity");

//         if (quantity > 1) {
//             setQuantity(parseInt(quantity) - 1);
//         }
//     }

//     function onIncrementQuantity(event) {
//         setQuantity(parseInt(quantity) + 1);
//     }

//     function onHandleInputChange(event) {
//         event.preventDefault();

//         const inputValue = event.target.value.trim(); // Remove leading/trailing whitespaces
//         let newQuantity;

//         if (inputValue === "") {
//             newQuantity = 0; // Set to 0 for an empty input
//         } else {
//             const parsedValue = parseInt(inputValue, 10);
//             newQuantity = isNaN(parsedValue) ? quantity : String(parsedValue);
//         }

//         setQuantity(newQuantity);
//     }

//     async function onHandleInputBlur(event) {
//         event.preventDefault();

//         const newQuantity = parseInt(event.target.value, 10);

//         if (isNaN(newQuantity) || newQuantity < 1) {
//             setQuantity(1);
//         }
//     }

//     function onInputKeyDown(event) {
//         if (event.keyCode === 13) {
//         }
//     }

//     return (
//         <div className="flex flex-row items-center">
//             <button
//                 className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95"
//                 disabled={quantity === 1}
//                 onClick={onDecrementQuantity}
//                 name="decrementQuantity"
//             >
//                 <MinusIcon className="text-white w-6 h-6 mx-auto" />
//             </button>

//             <input
//                 className="h-7 w-14 px-2 text-center mx-2 rounded-md bg-slate-200"
//                 type="number"
//                 value={quantity}
//                 onChange={onHandleInputChange}
//                 onBlur={onHandleInputBlur}
//                 onKeyDown={onInputKeyDown}
//                 name="quantity"
//             />

//             <button className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95" onClick={onIncrementQuantity} name="incrementQuantity">
//                 <PlusIcon className="text-white w-6 h-6 mx-auto" />
//             </button>
//         </div>
//     );
// }
