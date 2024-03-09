import { useLoaderData, useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import InputField from "../../components/form-components/InputField";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/authContext";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const { errorMessage } = useLoaderData();
    // const errors = useActionData();

    const [errors, setErrors] = useState({ isError: false, errorMessage: "" });

    async function handleAdminLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginInfo = Object.fromEntries(formData);
        loginInfo.userType = "admin";
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

            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userType", "admin");
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("imageUrl", data.imageUrl);

            login("admin", data.userId, data.userName, data.imageUrl);

            navigate("/admin")
            // return redirect("/catalog");
        } else {
            console.log("Error in login. Please try again.");

            errors.isError = true;
            if (data.errorMessage && data.errorMessage.length > 0) errors.errorMessage = data.errorMessage;
            setErrors(errors);
        }
    }
    return (
        <>
            {errors?.isError && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errors?.errorMessage ? errors.errorMessage : "Error in login. Try again."}
                </div>
            )}

            {errors.isError == false && errorMessage && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errorMessage ? errorMessage : "You are not authorised to access. [ADMIN]"}
                </div>
            )}

            <div className="flex flex-row justify-center min-w-full pb-8 m-0">
                <div className="flex flex-col justify-center px-10 pt-4 pb-8 bg-slate-300 rounded-md rounded-r-none bg-opacity-90 shadow-lg overflow-hidden">
                    {" "}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4 ">Admin Login</h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm min-w-40 md:min-w-72 lg:min-w-80 ">
                        <form className="space-y-5" action="#" method="POST" onSubmit={handleAdminLogin}>
                            <div>
                                <label htmlFor="email-input-field" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <InputField id="email-input-field" name="email" type="email" autocomplete="email" required />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password-input-field" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <InputField name="password" id="password-input-field" type="password" autocomplete="current-password" required />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src="/images/admin-login-bg.jpeg" alt="login" className="hidden sm:block w-80 h-auto rounded-md rounded-l-none shadow-lg" /> {/*border-slate-800 border-l-0*/}
            </div>
        </>
    );
}
