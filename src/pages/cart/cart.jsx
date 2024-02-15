import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Cart() {
    // const { } = useLoaderData();

    return (
        <>
            <div className="flex flex-row font-[amazon-ember-lt]">
                <div className="w-3/4">
                    <div className="flex flex-col gap-y-6 mx-3 mb-10">
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>
                </div>
                <div className="w-1/4 bg-red-500">b</div>
            </div>
        </>
    );
}

function CartItem() {
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <div className="flex flex-row">
                <img src="https://via.placeholder.com/120" alt="product" className="w-[180px] h-[180px]" />
                <div className="flex flex-col ml-3 mr-5 mt-2">
                    <div className="font-bold h-[2lh]">Product Name Product NameProduct NameProduct adasNameProduct NameProduct NameProduct NameProduct NameProduct NameProduct </div>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="text-xl font-[amazon-ember-rg] mx-auto mb-6">{1000 * quantity}</div>
                    <div className="text-sm font-[amazon-ember-rg] mx-auto mb-6 line-through">{1200 * quantity}</div>
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
            <button className="w-7 h-7 rounded-full cursor-pointer  bg-[#df8254] hover:bg-[#f85606]" disabled={quantity === 1} onClick={onDecrementQuantity}>
                <MinusIcon className="text-black w-6 h-6 mx-auto" />
            </button>
            <input className="h-7 w-14 px-2 text-center mx-2 rounded-md" type="number" value={quantity} onChange={onHandleInputChange} onBlur={onHandleInputBlur} />
            <button className="w-7 h-7 rounded-full cursor-pointer  bg-[#df8254] hover:bg-[#f85606]" onClick={onIncrementQuantity}>
                <PlusIcon className="text-black w-6 h-6 mx-auto" />
            </button>
        </div>
    );
}

