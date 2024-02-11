export async function productLoader({ request }) {
    const params = new URLSearchParams();

    const url = new URL(request.url);
    let category = url.searchParams.get("category");
    let search = url.searchParams.get("search");
    let page = url.searchParams.get("page");

    if (!category) category = "all";
    if (!page) page = 1;

    console.log("productLoader category:", category);
    console.log("productLoader search:", search);

    let products = [];
    let totalProducts = 0;
    let totalPages = 1;

    try {
        // FETCH PRODUCTS BASED ON CATEGORY, SEARCH, AND PAGE
        let url = "http://localhost:3000/catalog/products";

        url += "/" + encodeURIComponent(category);
        params.append("page", page);
        if (search) params.append("search", search);

        url += "?" + params.toString();

        console.log("productLoader url:", url);

        let response = await fetch(url);
        products = await response.json();

        // FETCH TOTAL NUMBER OF PRODUCTS TO CALCULATE NUMBER OF PAGES
        url = "http://localhost:3000/catalog/products/pages";

        url += "/" + encodeURIComponent(category);
        url += "?" + params.toString();

        response = await fetch(url);
        const result = await response.json();

        totalProducts = parseInt(result.PRODUCT_COUNT);
        totalPages = parseInt(result.COUNT);

        console.log("current page:", page);
        console.log("totalPages:", totalPages);
        console.log("totalProducts:", totalProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return { products, page, totalPages, category, search, totalProducts };
}
