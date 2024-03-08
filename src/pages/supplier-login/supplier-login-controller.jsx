import { redirect } from "react-router-dom";

export function supplierLoginLoader({ request }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const errorMessage = searchParams.get("errorMessage");

    return { errorMessage };
}

export async function supplierLoginAction({ request, params }) {
    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData);
    loginInfo.userType = "supplier";
    
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

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userType", "supplier");
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);

        return redirect("/supplier");
    } else {
        console.log("Error in login. Please try again.");

        errors.isError = true;
        if (data.errorMessage && data.errorMessage.length > 0) errors.errorMessage = data.errorMessage;
    }

    return errors;
}
