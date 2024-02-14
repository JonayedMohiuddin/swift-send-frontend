import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function loginAction({ request, params }) {
    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData);

    console.log(loginInfo);

    // Send the signupInfo to the server
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
    });

    const errors = {};

    const data = await response.json();

    if (response.ok) {
        console.log("Login successful.");
        return redirect("/catalog");
    } else {
        console.log("Error in login. Please try again.");

        errors.isError = true;
        if (data.errorMessage && data.errorMessage.length > 0) errors.errorMessage = data.errorMessage;
    }

    return errors;
}
