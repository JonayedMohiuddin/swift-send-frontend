import { Form, Link, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import "./navbar.css";
import { useEffect } from "react";

export default function Navbar() {
    const { categories, currentSelectedCategory, currentSearch } = useLoaderData();
    const submit = useSubmit();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentSelectedCategory !== undefined && currentSelectedCategory !== "" && currentSelectedCategory !== null) {
            document.getElementById("category").value = currentSelectedCategory;
        } else {
            document.getElementById("category").value = "all";
        }
    }, [currentSelectedCategory]);

    async function handleLogout() {
        try {
            const response = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({}), // include a request body if required
            });

            if (response.ok) {
                console.log("Logout successful");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }

        navigate("/catalog");
    }

    return (
        <>
            <div className="pb-[68px]"></div>

            <div className="navbar-container">
                <div className="navbar">
                    <Link className="navbar__logo" to="/">
                        <img src="/images/logo.svg" alt="logo" />
                    </Link>
                    <Form className="navbar__search-container" id="search-category-form" method="get" role="search" action="/catalog">
                        <select
                            className="navbar__category"
                            name="category"
                            id="category"
                            defaultValue={currentSelectedCategory}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        >
                            <option value="all">All</option>
                            {categories.map((category) => (
                                <option key={category.ID} value={category.NAME}>
                                    {category.NAME}
                                </option>
                            ))}
                        </select>

                        <input
                            className="navbar__search"
                            name="search"
                            type="text"
                            placeholder="Search"
                            defaultValue={currentSearch}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                        <button className="navbar__search-btn"></button>
                    </Form>

                    <Link to="/users/login" className="navbar__link mr-3">
                        <UserCircleIcon className="w-5" />
                        Sign in
                    </Link>

                    <div className="p-0 m-0 mr-3 w-[2px] h-[30px] bg-white"></div>

                    <Link to="/users/signup" className="navbar__link mr-3">
                        Sign Up
                    </Link>

                    <div className="p-0 m-0 mr-3 w-[2px] h-[30px] bg-white"></div>

                    <button className="navbar__link mr-5" onClick={handleLogout}>
                        Logout
                    </button>

                    <Link className="navbar__btn-image" to="/cart">
                        <ShoppingCartIcon className="w-7 mt-0.5" />
                    </Link>
                </div>
            </div>
        </>
    );
}
