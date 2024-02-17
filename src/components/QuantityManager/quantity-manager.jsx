import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function QuantityManager({ quantity, setQuantity }) {
    function onDecrementQuantity(event) {
        console.log("Decrementing quantity");

        if (quantity > 1) {
            setQuantity(parseInt(quantity) - 1);
        }
    }

    function onIncrementQuantity(event) {
        setQuantity(parseInt(quantity) + 1);
    }

    function onHandleInputChange(event) {
        event.preventDefault();

        const inputValue = event.target.value.trim(); // Remove leading/trailing whitespaces
        let newQuantity;

        if (inputValue === "") {
            newQuantity = 0; // Set to 0 for an empty input
        } else {
            const parsedValue = parseInt(inputValue, 10);
            newQuantity = isNaN(parsedValue) ? quantity : String(parsedValue);
        }

        setQuantity(newQuantity);
    }

    async function onHandleInputBlur(event) {
        event.preventDefault();

        const newQuantity = parseInt(event.target.value, 10);

        if (isNaN(newQuantity) || newQuantity < 1) {
            setQuantity(1);
        }
    }

    function onInputKeyDown(event) {
        if (event.keyCode === 13) {
        }
    }

    return (
        <div className="flex flex-row items-center">
            <button
                className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95"
                disabled={quantity === 1}
                onClick={onDecrementQuantity}
                name="decrementQuantity"
            >
                <MinusIcon className="text-white w-6 h-6 mx-auto" />
            </button>

            <input
                className="h-7 w-14 px-2 text-center mx-2 rounded-md bg-slate-200"
                type="number"
                value={quantity}
                onChange={onHandleInputChange}
                onBlur={onHandleInputBlur}
                onKeyDown={onInputKeyDown}
                name="quantity"
            />

            <button className="w-7 h-7 rounded-xl cursor-pointer  bg-zinc-400 hover:bg-[#cc4705] hover:scale-105 active:scale-95" onClick={onIncrementQuantity} name="incrementQuantity">
                <PlusIcon className="text-white w-6 h-6 mx-auto" />
            </button>
        </div>
    );
}
