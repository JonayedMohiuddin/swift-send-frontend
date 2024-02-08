import { Outlet } from "react-router-dom";

import "./root.css";
import "./reset.css";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

export default function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
