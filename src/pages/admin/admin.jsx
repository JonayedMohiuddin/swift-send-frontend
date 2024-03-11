import { useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

export default function Supplier() {
    const navigate = useNavigate();

    async function getLogin() {}

    useEffect(() => {
        navigate("/admin/orders");
    }, []);

    return (
        <>
            
        </>
    );
}
