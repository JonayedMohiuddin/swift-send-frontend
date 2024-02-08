import { Link } from "react-router-dom";

import "./navbar.css";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <Link className="navbar__logo" to="/">
                    <img src="./images/logo.svg" alt="logo" />
                </Link>
                <div className="navbar__search-container">
                    <div className="navbar__category-container">
                        <select className="navbar__category">
                            <option value="all">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="toys">Toys</option>
                        </select>
                    </div>
                    <input className="navbar__search" type="text" placeholder="Search" />
                    <button className="navbar__search-btn js-search-btn"></button>
                </div>
                <button className="navbar__btn js-login-btn">Log In</button>
                <button className="navbar__btn js-signup-btn">Sign Up</button>
                <button className="navbar__btn-image js-cart-btn">
                    <img className="navbar__image-btn" src="./images/icons-cart.png" alt="cart" />
                </button>
            </div>
        </div>
    );
}
