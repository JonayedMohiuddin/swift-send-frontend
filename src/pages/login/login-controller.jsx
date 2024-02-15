import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function loginAction({ request, params }) {
    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData);

    console.log(loginInfo);

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies, authorization headers)
        body: JSON.stringify(loginInfo),
    });

    const errors = {};

    const data = await response.json();

    if (response.ok) {
        console.log("Login successful.");

        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        return redirect("/catalog");
    } else {
        console.log("Error in login. Please try again.");

        errors.isError = true;
        if (data.errorMessage && data.errorMessage.length > 0) errors.errorMessage = data.errorMessage;
    }

    return errors;
}

export function loginLoader({ request }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const errorMessage = searchParams.get("errorMessage");

    return { errorMessage };
}
