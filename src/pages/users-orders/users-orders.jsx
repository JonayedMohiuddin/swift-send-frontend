import { useNavigate, Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";

/*
{
    "ID": 1,
    "QUANTITY": 2,
    "ORDER_ID": 1,
    "PRODUCT_ID": 1,
    "STATUS": "PENDING",
    "ID_1": 1,
    "SUPPLIER_ID": 1,
    "CATEGORY_ID": 1,
    "NAME": "Bulb",
    "PRICE": 219,
    "DESCRIPTION": null,
    "IMAGE_URL": "/images/no-product-image.jpg",
    "DISCOUNT": 0,
    "RATING_COUNT": 0,
    "TOTAL_RATING": 0,
    "CREATED_ON": "2024-02-29T10:30:10.000Z",
    "LAST_UPDATED_ON": null
  },
*/

export default function UsersOrders() {
    /*
    orders = [
        {
            orderId : ...,
            createdOn : ...,
            orderItems : [
                {
                    ...
                },
                ...
            ]
        },
        ...
    ]
    */

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    async function fetchOrders() {
        const response = await fetch("http://localhost:3000/users/orders/", { credentials: "include" });
        const data = await response.json();

        if (response.status === 401) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status === 403) {
            return navigate("/users/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status !== 200) {
            return navigate("/");
        }

        let currentOrderId = -1;
        let structuredOrder = [];

        for (let i = 0; i < data.length; i++) {
            if (currentOrderId !== data[i].ORDER_ID) {
                currentOrderId = data[i].ORDER_ID;
                structuredOrder.push({
                    orderId: "#" + data[i].ID + data[i].ID_1 + data[i].ORDER_ID,
                    createdOn: data[i].CREATED_AT,
                    orderItems: [],
                });
            }

            structuredOrder[structuredOrder.length - 1].orderItems.push(data[i]);
        }

        setOrders(structuredOrder);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            {orders.length <= 0 && (
                <div className="font-ember-regular">
                    <div className="flex flex-col gap-4 items-center min-h-52">
                        <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No orders found</div>
                        <Link to="/catalog" className="text-daraz-orange text-2xl font-ember-bold hover:underline">
                            Start shopping
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 mb-8 w-3/4 mx-auto">
                {orders.map((order) => (
                    <div key={order.orderId} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-ember-bold text-gray-600 ml-3">Order {order.orderId}</div>
                            <div className="text-lg font-ember-regular text-gray-600 mr-3">Placed on {new Date(order.createdOn).toLocaleDateString()}</div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            {order.orderItems.map((orderItem) => (
                                <OrderItem key={orderItem.ID} orderItem={orderItem} refreshOrdersList={fetchOrders} />
                                // <div key={orderItem.ID} className="flex gap-4 items-center">
                                //     <img src={orderItem.IMAGE_URL} alt={orderItem.NAME} className="w-20 h-20 object-cover rounded-lg" />
                                //     <div className="flex flex-col gap-2">
                                //         <div className="text-xl font-ember-bold text-gray-600">{orderItem.NAME}</div>
                                //         <div className="text-lg font-ember-regular text-gray-600">Quantity: {orderItem.QUANTITY}</div>
                                //         <div className="text-lg font-ember-regular text-gray-600">Price: ₹{orderItem.PRICE}</div>
                                //     </div>
                                // </div>
                            ))}
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
                    {orderItem.STATUS === "PENDING" && <div className="text-xs font-[amazon-ember-lt] text-black bg-blue-600 bg-opacity-30 py-1 px-2 rounded-lg items-center">Pending...</div>}
                    {orderItem.STATUS === "CANCELED" && (
                        <>
                            <div className="flex flex-col bg-red-600 bg-opacity-30 py-1 px-2 rounded-lg items-center">
                                <div className="text-xs font-[amazon-ember-lt]">Canceled</div>
                                <div className="text-xs font-[amazon-ember-lt]">{new Date(orderItem.LAST_UPDATED_ON).toLocaleDateString()}</div>
                            </div>
                        </>
                    )}
                    {orderItem.STATUS === "SHIPPED" && <div className="text-xs font-[amazon-ember-lt] text-black bg-yellow-600 bg-opacity-30 py-1 px-2 rounded-lg items-center">Shipped...</div>}
                    {orderItem.STATUS === "DELIVERED" && <div className="text-xs font-[amazon-ember-lt] text-black bg-green-600 bg-opacity-30 py-1 px-2 rounded-lg items-center">Delivered</div>}

                    <div className="text-lg font-bold font-[amazon-ember-rg] text-daraz-orange mx-auto mb-2">৳ {Math.ceil(orderItem.PRICE * (1 - orderItem.DISCOUNT) * orderItem.QUANTITY)}</div>
                    {/* <div className="text-xs font-[amazon-ember-lt] mx-auto mb-3 line-through text-zinc-500">৳ {Math.ceil(orderItem.PRICE * orderItem.QUANTITY)}</div> */}
                </div>
            </div>
        </>
    );
}
