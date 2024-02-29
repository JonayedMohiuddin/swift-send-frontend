import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";

/*
  {
    "ID": 1,
    "ORDER_ITEM_ID": 1,
    "USER_ID": 1,
    "SUPPLIER_ID": 1,
    "ADDRESS": "Kathmandu",
    "CREATED_AT": "2024-02-29T17:35:29.000Z",
    "ID_1": 1,
    "QUANTITY": 2,
    "ORDER_ID": 1,
    "PRODUCT_ID": 1,
    "STATUS": "PENDING",
    "LAST_UPDATED_ON": "2024-02-29T17:35:29.000Z",
    "ID_2": 1,
    "SUPPLIER_ID_1": 1,
    "CATEGORY_ID": 1,
    "NAME": "Bulb",
    "PRICE": 219,
    "DESCRIPTION": null,
    "IMAGE_URL": "/images/no-product-image.jpg",
    "DISCOUNT": 0,
    "RATING_COUNT": 0,
    "TOTAL_RATING": 0,
    "CREATED_ON": "2024-02-29T17:35:28.000Z",
    "LAST_UPDATED_ON_1": null
  },
  */

export default function SupplierPendingOrders() {
    const [pendingOrders, setPendingOrders] = useState([]);

    const navigate = useNavigate();

    async function fetchOrders() {
        const response = await fetch("http://localhost:3000/supplier/orders/", { credentials: "include" });
        const data = await response.json();

        if (response.status === 401) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status === 403) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status !== 200) {
            return navigate("/"); 
        }

        setPendingOrders(data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            {pendingOrders.length <= 0 && (
                <div className="font-ember-regular">
                    <div className="flex flex-col gap-4 items-center min-h-52">
                        <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No pending order found</div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 mb-8 w-3/4 mx-auto">
                {pendingOrders.map((order) => (
                    <div key={order.ORDER_ITEM_ID} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            {/* <div className="text-xl font-ember-bold text-gray-600 ml-3">Order {order.orderId}</div> */}
                            <div className="text-lg font-ember-regular text-gray-600 mr-3">Placed on {new Date(order.LAST_UPDATED_ON).toLocaleDateString()}</div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <OrderItem orderItem={order} refreshOrdersList={fetchOrders} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function OrderItem({ orderItem, refreshOrdersList }) {
    async function cancelOrder() {
        const response = await fetch("http://localhost:3000/users/orders/cancel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ orderItemId: orderItem.ID }),
        });

        const data = await response.json();

        if (response.status === 401) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status === 403) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status !== 200) {
            return navigate("/");
        }

        refreshOrdersList();
    }

    return (
        <>
            <div className="flex flex-row gap-x-1 bg-white p-2 rounded-md">
                <img src={orderItem.IMAGE_URL} alt="product" className="w-[120px] h-[120px]" />

                <div className="flex flex-col ml-3 mt-2 mr-auto">
                    <div className="text-sm font-ember-light h-[2lh] line-clamp-2">{orderItem.NAME}</div>
                    <div className="flex flex-row gap-x-2 mt-2">
                        {orderItem.STATUS === "PENDING" && (
                            <button
                                name="cancel"
                                className="flex flex-row bg-slate-200 hover:text-red-500 text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-red-400 hover:bg-opacity-50 hover:underline"
                                onClick={() => cancelOrder()}
                            >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Cancel
                            </button>
                        )}
                        {/*<button
                            name="addToWishlist"
                            className="flex flex-row bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
                        >
                            Add to wishlist
                        </button>
                        
                        { /* <button className="md:flex md:flex-row hidden bg-slate-200 hover:text-daraz-orange text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline">
                            Share
                        </button> */}
                    </div>
                </div>

                <div className="flex flex-col mt-2 gap-y-2 items-center justify-center mx-4">
                    <div className="font-[amazon-ember-lt] text-xs font-bold">Quantity</div>
                    <div className="font-[amazon-ember-lt] text-lg font-bold">{orderItem.QUANTITY}</div>
                </div>

                <div className="flex flex-col mt-2 gap-y-2 items-center justify-center mx-4 min-w-24">
                    <button 
                        name="ship"
                        className="flex flex-row bg-daraz-orange text-white text-xs font-[amazon-ember-rg] rounded-md py-1 px-2 hover:bg-[#f85606] hover:bg-opacity-15 hover:underline"
                    >
                        Ship
                    </button>
                    <div className="text-lg font-bold font-[amazon-ember-rg] text-daraz-orange mx-auto mb-2">৳ {Math.ceil(orderItem.PRICE * (1 - orderItem.DISCOUNT) * orderItem.QUANTITY)}</div>
                </div>
            </div>
        </>
    );
}
