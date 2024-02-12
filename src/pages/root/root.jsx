import { Outlet } from "react-router-dom";

import "./root.css";

import Navbar from "./../../components/navbar/navbar";
import Footer from "./../../components/footer/footer";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { Carousel } from "../../components/carousel/carousel";

export default function Root() {
    return (
        <>
            <Navbar />
            <div className="w-[85%] mx-auto">
                <Breadcrumbs />
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
