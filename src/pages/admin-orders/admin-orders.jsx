import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { CheckBadgeIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function AdminOrders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [currentTab, setCurrentTab] = useState("PENDING"); // PENDING, DELIVERED, CANCELED

    const navigate = useNavigate();

    async function fetchOrders() {
        const response = await fetch("http://localhost:3000/admin/orders/" + currentTab, { credentials: "include" });
        const data = await response.json();

        if (response.status === 401) {
            return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status === 403) {
            return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
        } else if (response.status !== 200) {
            return navigate("/");
        }

        // let ordersFiltered = data.filter((order) => order.STATUS === currentTab);

        console.log(data);

        setPendingOrders(data);
    }

    useEffect(() => {
        fetchOrders();
    }, [currentTab]);

    return (
        <>
            <div className="flex flex-row mx-auto">
                <div className="w-1/5 pr-5 mb-60">
                    <div className="flex flex-col sticky top-20">
                        <NavlinkItem currentTab={currentTab} setCurrentTab={setCurrentTab} tabName="PENDING" icon={<TruckIcon className="w-6 h-6" />} style="rounded-t-lg" />
                        <NavlinkItem currentTab={currentTab} setCurrentTab={setCurrentTab} tabName="DELIVERED" icon={<CheckBadgeIcon className="w-6 h-6" />} style="rounded-b-lg" />
                        {/* <NavlinkItem currentTab={currentTab} setCurrentTab={setCurrentTab} tabName="CANCELED" icon={<XMarkIcon className="w-6 h-6" />} style="rounded-b-lg" /> */}
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-8 w-4/5">
                    {pendingOrders.length <= 0 && (
                        <div className="font-ember-regular">
                            <div className="flex flex-col gap-4 items-center min-h-52">
                                <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No {currentTab.toLowerCase()} order found</div>
                            </div>
                        </div>
                    )}
                    {pendingOrders.map((order) => (
                        <div key={order.SSWI_ID} className="flex flex-col gap-1">
                            {/*<div className="flex justify-between items-center">
                                <div className="text-xl font-ember-bold text-gray-600 ml-3">Order {order.orderId}</div>
                                <div className="text-lg font-ember-regular text-gray-600 mr-3">Placed on {new Date(order.LAST_UPDATED_ON).toLocaleDateString()}</div>
                                </div> */}

                            <div className="flex flex-col gap-y-2">
                                <OrderItem orderItem={order} refreshOrdersList={fetchOrders} currentTab={currentTab} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function OrderItem({ orderItem, refreshOrdersList, currentTab }) {
    async function deliverOrder() {
        const response = await fetch("http://localhost:3000/admin/orders/delivered/" + orderItem.SSWI_ID, {
            method: "POST",
            credentials: "include",
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
                    <div className="text-sm font-ember-light h-[2lh] line-clamp-2">
                        {orderItem.NAME}
                    </div>
                    <div className="text-lg font-bold font-[amazon-ember-rg] text-gray-500 mb-2">৳ {Math.ceil(orderItem.PRICE * (1 - orderItem.DISCOUNT) * orderItem.QUANTITY)}</div>
                    <div className="flex flex-row gap-4">
                        <div className="text-xs font-ember-regular text-gray-600">SKU: {orderItem.SUPPLIER_ORDER_ID}</div>
                        <div className="text-xs font-ember-regular text-gray-600">User: {orderItem.USER_NAME}</div>
                    </div>
                </div>

                <div className="flex flex-col mt-2 gap-y-2 items-center justify-center mx-4">
                    <div className="font-[amazon-ember-lt] text-xs font-bold">Quantity</div>
                    <div className="font-[amazon-ember-lt] text-lg font-bold">{orderItem.QUANTITY}</div>
                </div>

                <div className="flex flex-col mt-1 gap-y-2 items-center justify-center mr-1 ml-2 min-w-24">
                    {currentTab === "PENDING" && (
                        <div className="flex flex-col items-center justify-center">
                            <button name="ship" onClick={deliverOrder} className="flex flex-row text-xl mb-2 p-2 bg-emerald-500 hover:bg-emerald-800 rounded-md font-ember-regular text-white">
                                Deliver
                            </button>
                            <div className="font-ember-light text-sm text-gray-600">Placed on</div>
                            <div className="text-xs font-ember-regular text-gray-600">{new Date(orderItem.LAST_UPDATED_ON).toLocaleDateString()}</div>
                        </div>
                    )}
                    {currentTab === "DELIVERED" && (
                        <div className="flex flex-col items-center py-1 px-2 bg-emerald-200 rounded-md">
                            <div className="font-ember-light text-sm text-gray-600">Delivered on</div>
                            <div className="text-xs font-ember-regular text-gray-600">{new Date(orderItem.LAST_UPDATED_ON).toLocaleDateString()}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function NavlinkItem({ currentTab, setCurrentTab, tabName, icon, style }) {
    return (
        <button
            className={`flex flex-row gap-2 justify-center text-base font-ember-light py-3 ${style} ${
                currentTab === tabName ? "bg-slate-300 disabled font-ember-regular" : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setCurrentTab(tabName)}
        >
            {icon}
            {tabName}
        </button>
    );
}
