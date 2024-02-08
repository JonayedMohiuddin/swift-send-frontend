export async function productLoader() {
    let products;
    try {
        const response = await fetch("http://localhost:3000/catalog/products");
        products = await response.json();

        if (!response.ok) {
            throw new Error("Fetch failed");
        }

        return { products };
    } catch (error) {
        console.error("Error fetching products:", error);

        products = [
            {
                ID: 0,
                NAME: "FETCH FAILED",
                PRICE: -100,
                IMAGE_URL: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                RATING: 0.0,
            },
            {
                ID: 1,
                NAME: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                PRICE: 109.95,
                IMAGE_URL: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                RATING: 3.9,
            },
            {
                ID: 2,
                NAME: "Mens Casual Premium Slim Fit T-Shirts ",
                PRICE: 22.3,
                IMAGE_URL: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                RATING: 4.1,
            },
            {
                ID: 3,
                NAME: "Mens Cotton Jacket",
                PRICE: 55.99,
                IMAGE_URL: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                RATING: 4.7,
            },
            {
                ID: 4,
                NAME: "Mens Casual Slim Fit",
                PRICE: 15.99,
                IMAGE_URL: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                RATING: 2.3,
            },
            {
                ID: 5,
                NAME: "Women's High Waist Yoga Pants",
                PRICE: 19.99,
                IMAGE_URL: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
                RATING: 4.6,
            },
            {
                ID: 6,
                NAME: "Men's Slim Fit Jeans",
                PRICE: 39.99,
                IMAGE_URL: "https://fakestoreapi.com/img/71BoPCjbwN_._AC_UX679_.jpg",
                RATING: 3.8,
            },
        ];
    }

    return { products };
}
