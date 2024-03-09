import { Form, Link, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import "./navbar.css";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../pages/AuthContext/authContext";

export default function Navbar() {
    const { categories, currentSelectedCategory, currentSearch } = useLoaderData();
    const submit = useSubmit();
    const navigate = useNavigate();

    const { isLoggedIn, userType, userId, userName, imageUrl, login, logout } = useContext(AuthContext);

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
                logout();
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

            <div className="navbar-container bg-primary">
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
                        <button
                            className="bg-secondary hover:bg-primary-dark min-w-[50px] h-[40px] rounded-r-[8px] mr-5"
                            style={{
                                backgroundImage: 'url("/images/icons-search.png")',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "24px 24px",
                            }}
                        ></button>
                    </Form>

                    {isLoggedIn ? (
                        <div className="group flex items-center justify-center min-w-48 max-w-48 mr-4 py-1 px-1 rounded-lg hover:bg-primary-light">
                            <div className="relative mr-3">
                                <img
                                    className="min-w-6 w-6 h-6 rounded-full"
                                    src={localStorage.getItem("imageUrl") ? localStorage.getItem("imageUrl") : "/images/no-profile-picture.jpg"}
                                    onError={(e) => {
                                        e.target.src = "/images/no-profile-picture.jpg";
                                    }}
                                    alt="User Profile"
                                />
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-xs font-semibold font-ember-light text-white overflow-hidden max-h-[1lh]">{localStorage.getItem("userName") || "Guest User"}</span>
                                <ProfileDropdown handleLogout={handleLogout} userType={userType} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row">
                            <Link to="/users/login" className="navbar__link mr-5 hover:bg-primary-dark">
                                <UserCircleIcon className="w-5 mr-1" />
                                Sign in
                            </Link>

                            <Link to="/users/signup" className="navbar__link mr-5 hover:bg-primary-dark">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <Link className="navbar__btn-image hover:bg-primary-dark" to="/users/cart">
                        <ShoppingCartIcon className="w-7 mt-0.5" />
                    </Link>
                </div>
            </div>
        </>
    );
}

function ProfileDropdown({ handleLogout, userType }) {
    return (
        <div className="invisible absolute top-12 -ml-8 text-xs font-ember-regular z-50 flex flex-col bg-gray-600 text-gray-800 shadow-xl rounded-lg group-hover:visible">
            {userType === "users" && <UserDropdownOptions handleLogout={handleLogout} />}
            {userType === "supplier" && <SupplierDropdownOptions handleLogout={handleLogout} />}
            {userType === "admin" && <AdminDropdownOptions handleLogout={handleLogout} />}
        </div>
    );
}

function UserDropdownOptions({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <>
            <ul className="text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800 rounded-t-lg"
                        onClick={() => {
                            navigate("/users/profile");
                        }}
                    >
                        Manage my account
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/users/orders");
                        }}
                    >
                        My orders
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/users/wishlist");
                        }}
                    >
                        My wishlist
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/catalog");
                        }}
                    >
                        Buy Products
                    </button>
                </li>
                <li>
                    <button className="w-full px-6 py-2 hover:bg-gray-800 rounded-b-lg" onClick={handleLogout}>
                        Log out
                    </button>
                </li>
            </ul>
        </>
    );
}

function SupplierDropdownOptions({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <>
            <ul className="text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800 rounded-t-lg"
                        onClick={() => {
                            navigate("/supplier/profile");
                        }}
                    >
                        Manage account
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/supplier/pendingOrders");
                        }}
                    >
                        My orders
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/supplier");
                        }}
                    >
                        My products
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/supplier/deletedProducts");
                        }}
                    >
                        Deleted products
                    </button>
                </li>
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/supplier/addProduct");
                        }}
                    >
                        Add new product
                    </button>
                </li>

                <li>
                    <button className="w-full px-6 py-2 hover:bg-gray-800 rounded-b-lg" onClick={handleLogout}>
                        Log out
                    </button>
                </li>
            </ul>
        </>
    );
}

function AdminDropdownOptions({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <>
            <ul className="text-gray-200" aria-labelledby="dropdownHoverButton">
                {/* <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800 rounded-t-lg"
                        onClick={() => {
                            navigate("/admin/profile");
                        }}
                    >
                        Manage account
                    </button>
                </li> */}
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800 rounded-t-lg"
                        onClick={() => {
                            navigate("/admin/orders");
                        }}
                    >
                        Manage orders
                    </button>
                </li>
                {/* <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/admin");
                        }}
                    >
                        Manage suppliers
                    </button>
                </li> */}
                <li>
                    <button
                        className="w-full block px-6 py-2 hover:bg-gray-800"
                        onClick={() => {
                            navigate("/admin/categoryManagement");
                        }}
                    >
                        Manage categories
                    </button>
                </li>

                <li>
                    <button className="w-full px-6 py-2 hover:bg-gray-800 rounded-b-lg" onClick={handleLogout}>
                        Log out
                    </button>
                </li>
            </ul>
        </>
    );
}
