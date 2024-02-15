import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import InputField from "../../components/form-components/inputField";

import { MinusIcon, PlusIcon, TrashIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function Cart() {
    const { } = useLoaderData();

    return (
        <>
            <div className="flex flex-row font-[amazon-ember-lt] mb-10 gap-x-2">
                <div className="w-3/4 flex flex-col gap-y-7">
                    {/* START */}
                    <div className="flex flex-col bg-white pt-2 rounded-lg ">
                        <div className="flex flex-row justify-between items-center sticky top-16">
                            <div className="text-xl font-bold font-[amazon-ember-rg] text-[#f85606] mx-3 mb-5 bg-slate-100 rounded-lg px-5">Electronics Mart</div>
                            <div className="text-xl font-bold font-[amazon-ember-rg] text-[#f85606] mx-3 mb-5 bg-slate-100 rounded-lg px-5">Items {3}</div>
                        </div>
                        <div className="flex flex-col gap-y-7 mx-3 mb-3">
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </div>
                    </div>
                    {/* END */}
                    
                </div>
                <div className="w-1/4">
                    <div className="flex flex-col bg-white p-3 sticky top-20 rounded-lg">
                        <div className="text-lg font-bold text-[#f85606] mb-5 font-ember-light">Order Summary</div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Subtotal ({4} items)</div>
                            <div className="text-base font-ember-light">৳ 4000</div>
                        </div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Savings</div>
                            <div className="text-base font-ember-light">৳ 4000</div>
                        </div>
                        <div className="flex flex-row justify-between mb-3">
                            <div className="text-base font-ember-light">Total</div>
                            <div className="font-bold font-ember-light text-[#f85606]">৳ 4000</div>
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

function CartItem() {
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <div className="flex flex-row">
                <img src="https://via.placeholder.com/140" alt="product" className="w-[140px] h-[140px]" />

                <div className="flex flex-col ml-3 mr-5 mt-2">
                    <div className="font-bold h-[2lh] overflow-ellipsis-2">
                        Product Name Product NameProduct NameProduct adasNameProduct NameProduct NameProduct NameProduct NameProduct NameProduct{" "}
                    </div>
                    <div className="flex flex-row gap-x-2 mt-4">
                        <button className="flex flex-row bg-slate-200 hover:text-[#f85606] text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                            <HeartIcon className="w-4 h-4 mr-2" />
                            Add to wishlist
                        </button>
                        <button className="flex flex-row bg-slate-200 hover:text-[#f85606] text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Remove
                        </button>
                        <button className="flex flex-row bg-slate-200 hover:text-[#f85606] text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                            <ShareIcon className="w-4 h-4 mr-2" />
                            Share
                        </button>
                        {/* <button className="text-[#f85606] p-2 hover:underline">Save for later</button> */}
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="text-lg font-bold font-[amazon-ember-rg] text-[#f85606] mx-auto mb-2">৳ {1000 * quantity}</div>
                    <div className="text-xs font-[amazon-ember-lt] mx-auto mb-3 line-through text-zinc-500">৳ {1200 * quantity}</div>
                    <QuantityManager quantity={quantity} setQuantity={setQuantity} />
                </div>
            </div>
        </>
    );
}

function QuantityManager({ quantity, setQuantity }) {
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
        <div className="flex flex-row items-center">
            <button className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95" disabled={quantity === 1} onClick={onDecrementQuantity}>
                <MinusIcon className="text-white w-6 h-6 mx-auto" />
            </button>
            <input className="h-7 w-14 px-2 text-center mx-2 rounded-md bg-slate-200" type="number" value={quantity} onChange={onHandleInputChange} onBlur={onHandleInputBlur} />
            <button className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95" onClick={onIncrementQuantity}>
                <PlusIcon className="text-white w-6 h-6 mx-auto" />
            </button>
        </div>
    );
}
