import { Form, useActionData } from "react-router-dom";

import InputField from "../../components/form-components/inputField";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function SupplierSignup() {
    const errors = useActionData();

    return (
        <>
            {errors?.isError && (
                <div className="flex flex-row mx-auto mb-5 w-12/12 lg:w-10/12 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errors?.errorMessage ? errors.errorMessage : "Error in signup. Please try again."}
                </div>
            )}

            <div className="pb-10">
                <div className="container mx-auto">
                    <div className="flex flex-row lg:flex-row w-12/12 lg:w-10/12  rounded-xl mx-auto shadow-lg overflow-hidden bg-slate-300 bg-opacity-90">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("images/login-bg-2.jpg")' }}>
                            <h1 className="text-white text-3xl mb-3">Welcome</h1>
                            <div>
                                <p className="text-white">
                                    Swiftly unlock a world of exclusive deals! Sign up for Swift Send Ecommerce now and enjoy personalized shopping, secure transactions, and unbeatable promotions.{" "}
                                    <a href="#" className="text-purple-500 font-semibold">
                                        Learn more
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 py-8 px-10">
                            <h2 className="text-3xl mb-4">Register Seller Account</h2>
                            {/* <p className="mb-4">Create your account. It's free and only takes a minute</p> */}
                            <Form id="signup-form" method="post" role="signup">
                                {/* <div className="grid grid-cols-2 gap-5">
                                    <InputField id="firstname-input" name="firstname" type="text" placeholder="Firstname" autocomplete="given-name" required />
                                    <InputField id="lastname-input" name="lastname" type="text" placeholder="Lastname" autocomplete="family-name" required />
                                </div> */}
                                <div className="mt-5">
                                    <InputField id="name-input" name="name" type="text" placeholder="Name" autocomplete="organization" required />
                                </div>
                                <div className="mt-5">
                                    <InputField id="email-input" name="email" type="email" placeholder="Email" autocomplete="email" required />
                                </div>
                                <div className="mt-5">
                                    <InputField id="new-password-input" name="password" type="password" placeholder="Password" autocomplete="new-password" required />
                                </div>
                                <div className="mt-5">
                                    <InputField id="confirmation-password-input" name="password" type="password" placeholder="Confirm Password" autocomplete="new-password" required />
                                </div>
                                <div className="flex flex-row justify-start items-center mt-5">
                                    <input id="agreement-checkbox" type="checkbox" className="border border-gray-400 mr-2 w-4 h-4" required />
                                    <span>
                                        I accept the{" "}
                                        <a href="#" className="text-purple-600 font-semibold hover:text-purple-500">
                                            Terms of Use
                                        </a>{" "}
                                        &amp;{" "}
                                        <a href="#" className="text-purple-600 font-semibold hover:text-purple-500">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button className="w-full bg-purple-600 py-3 text-center text-white hover:bg-purple-500">Register Now</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
