import { Link } from "react-router-dom";

export default function UsersOrders() {
    // const { orders } = useLoaderData();

    return (
        <>
            <div className="font-ember-regular">
                <div className="flex flex-col gap-4 items-center min-h-52">
                    <div className="font-ember-light text-center text-3xl font-bold text-gray-600 opacity-35">No orders found</div>
                    <Link to="/catalog" className="text-daraz-orange text-2xl font-ember-bold hover:underline">
                        Start shopping
                    </Link>
                </div>
            </div>
        </>
    );
}
