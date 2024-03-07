import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        loadBreadcrumbs();
    }, [location.pathname]); // Adding location.pathname to the dependency array

    async function loadBreadcrumbs() {
        let currentPath = location.pathname;
        if (currentPath === "/") {
            currentPath = "/catalog";
        }
        if (currentPath.endsWith("/")) {
            currentPath = currentPath.slice(0, -1);
        }

        let newItems = currentPath.split("/");

        let newLinks = newItems.map((item, index) => {
            return `/${newItems.slice(1, index + 1).join("/")}`;
        });

        if (!isNaN(newItems[newItems.length - 1])) {
            let productId = parseInt(newItems[newItems.length - 1]); 
            newItems.pop();
            newLinks.pop();

            const response = await fetch(`http://localhost:3000/catalog/product/${productId}`);
            const data = await response.json();

            newItems.push(data.CATEGORY_NAME || "!! CATEGORY-NOT-SET !!");
            newLinks.push(`/${newItems.slice(1, newItems.length-1).join("/")}?category=${data.CATEGORY_NAME}`);
            
            newItems.push(data.NAME);
            newLinks.push(`/${newItems.slice(1, newItems.length).join("/")}`);

            console.log("newItems:", newItems);
            console.log("newLinks:", newLinks);
        }

        setItems(newItems);
        setLinks(newLinks);
    }

    return (
        <div>
            <ol className="flex items-center whitespace-nowrap dark:border-gray-700 my-6" aria-label="Breadcrumb">
                <BreadcrumbsLinks
                    name="Home"
                    link="/"
                    svg={
                        <svg
                            className="flex-shrink-0 me-3 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    }
                />

                {items.map((item, index) => {
                    if (item === "") {
                        return null;
                    }

                    const link = links[index];
                    const isCurrent = index === items.length - 1;
                    return (
                        <BreadcrumbsLinks
                            key={index}
                            name={item.charAt(0).toUpperCase() + item.slice(1)}
                            link={link}
                            isCurrent={isCurrent}
                            // svg={
                            //     <svg
                            //         className="flex-shrink-0 me-3 h-4 w-4"
                            //         xmlns="http://www.w3.org/2000/svg"
                            //         width={24}
                            //         height={24}
                            //         viewBox="0 0 24 24"
                            //         fill="none"
                            //         stroke="currentColor"
                            //         strokeWidth={2}
                            //         strokeLinecap="round"
                            //         strokeLinejoin="round"
                            //     >
                            //         <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            //         <polyline points="9 22 9 12 15 12 15 22" />
                            //     </svg>
                            // }
                        />
                    );
                })}

                {/* <BreadcrumbsLinks name="Application" link="/application" />
                <BreadcrumbsLinks name="Calendar" link="/calendar" />
                <BreadcrumbsLinks name="Today" link="/today" isCurrent /> */}
            </ol>
        </div>
    );
}

export function BreadcrumbsLinks({ name, link, isCurrent, svg }) {
    return (
        <>
            {isCurrent ? (
                <li className="inline-flex items-center text-sm font-semibold truncate dark:text-blue-800" aria-current="page">
                    {name}
                </li>
            ) : (
                <li className="inline-flex items-center">
                    <Link to={link} className="flex items-center text-sm text-gray-500 hover:text-blue-600 hover:font-bold focus:outline-none focus:text-blue-600 dark:focus:text-blue-500">
                        {svg}
                        {name}
                    </Link>

                    <svg
                        className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600 "
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </li>
            )}
        </>
    );
}
