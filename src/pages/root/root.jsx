import { Outlet } from "react-router-dom";

import "./root.css";

import Navbar from "./../../components/navbar/navbar";
import Footer from "./../../components/footer/footer";

export default function Root() {
    return (
        <>
            <Navbar />
            <div className="mt-3">
                <Outlet />
                <Footer />
            </div>
        </>
    );
}
