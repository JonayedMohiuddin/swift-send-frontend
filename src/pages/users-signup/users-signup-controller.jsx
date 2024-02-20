import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function usersSignupAction({ request, params }) {
    const formData = await request.formData();
    const signupInfo = Object.fromEntries(formData);
    signupInfo.userType = "users";
    signupInfo.name = signupInfo.firstName + " " + signupInfo.lastName;
    
    console.log(signupInfo);

    // Send the signupInfo to the server
    const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
    });

    const errors = {};

    if (response.status === 201) {
        return redirect("/users/login");
    } else {
        const data = await response.json();
        if(data.errorMessage && data.errorMessage.length > 0) errors.errorMessage = data.errorMessage;
        errors.isError = true;
    }

    return errors;
}

