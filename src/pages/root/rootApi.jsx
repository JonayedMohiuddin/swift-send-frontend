export async function rootLoader({ request }) {
    const url = new URL(request.url);
    const currentSelectedCategory = url.searchParams.get("category");
    const currentSearch = url.searchParams.get("search");

    let categories = [];
    try {
        const response = await fetch("http://localhost:3000/catalog/categories");
        categories = await response.json();

        if (!response.ok) throw new Error("Fetch failed");
    } catch (error) {
        console.error("Error fetching categories:", error);
    }

    return { categories, currentSelectedCategory, currentSearch};
}