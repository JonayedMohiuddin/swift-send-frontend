import { Form, Link, useActionData, useLoaderData } from "react-router-dom";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import InputField from "../../components/form-components/inputField";

export default function UsersLogin() {
    const { errorMessage } = useLoaderData();
    const errors = useActionData();

    return (
        <>
            {errors?.isError && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errors?.errorMessage ? errors.errorMessage : "Error in signin. Please try again."}
                </div>
            )}

            {errorMessage && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errorMessage ? errorMessage : "Please login to access the item."}
                </div>
            )}

            {/* <div className="container flex flex-row justify-center min-h-full min-w-full h-[100vh] p-0 m-0"> */}
            <div className="flex flex-row justify-center min-w-full pb-8 m-0 ">
                <div className="flex flex-col justify-center px-10 pt-4 pb-8 bg-slate-300 rounded-md rounded-r-none bg-opacity-90 shadow-lg overflow-hidden">
                    {" "}
                    {/* border border-slate-800 */}
                    {/* <div className="flex flex-col justify-center my-4 px-10"> */}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2> */}
                        <h2 className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4 ">Sign in to your account</h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm min-w-40 md:min-w-72 lg:min-w-80 ">
                        <Form className="space-y-5" action="#" method="POST">
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
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
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
                        </Form>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign Up Now
                            </Link>
                        </p>
                    </div>
                </div>
                <img src="/images/login-bg.jpg" alt="login" className="hidden sm:block w-80 h-auto rounded-md rounded-l-none shadow-lg" /> {/*border-slate-800 border-l-0*/}
            </div>

            <div className="flex flex-row justify-end mt-5 mb-5 gap-8">
                <Link to="/supplier/login" className="font-semibold leading-6 hover:text-indigo-500 hover:underline">
                    Are you a Seller?
                </Link>
                <Link to="/supplier/signup" className="font-semibold leading-6 hover:text-indigo-500 hover:underline">
                    Become a Seller
                </Link>
            </div>
        </>
    );
}
