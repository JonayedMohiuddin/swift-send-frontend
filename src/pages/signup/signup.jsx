import InputField from "../../components/form-components/inputField";

export default function Signup() {
    return (
        <>
            <div className="pt-2 pb-10">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row w-12/12 lg:w-10/12  rounded-xl mx-auto shadow-lg overflow-hidden bg-slate-300 bg-opacity-90">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("images/login-bg-2.jpg")' }}>
                            <h1 className="text-white text-3xl mb-3">Welcome</h1>
                            <div>
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                                    <a href="#" className="text-purple-500 font-semibold">
                                        Learn more
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 py-8 px-10">
                            <h2 className="text-3xl mb-4">Register</h2>
                            <p className="mb-4">Create your account. It's free and only takes a minute</p>
                            <form action="#">
                                <div className="grid grid-cols-2 gap-5">
                                    <InputField name="firstname" type="text" placeholder="Firstname" autocomplete="given-name" required />
                                    <InputField name="lastname" type="text" placeholder="Lastname" autocomplete="family-name" required />
                                </div>
                                <div className="mt-5">
                                    {/* <input
                                        type="text"
                                        placeholder="Email"
                                        required
                                        // className="border border-gray-400 py-1 px-2 w-full"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    /> */}
                                    <InputField name="email" type="email" placeholder="Email" autocomplete="email" required />
                                </div>
                                <div className="mt-5">
                                    <InputField name="password" type="password" placeholder="Password" autocomplete="new-password" required />
                                </div>
                                <div className="mt-5">
                                    <InputField name="password" type="password" placeholder="Confirm Password" autocomplete="new-password" required />
                                </div>
                                <div className="mt-5">
                                    <input type="checkbox" className="border border-gray-400 mr-2" required/>
                                    <span>
                                        I accept the{" "}
                                        <a href="#" className="text-purple-500 font-semibold">
                                            Terms of Use
                                        </a>{" "}
                                        &amp;{" "}
                                        <a href="#" className="text-purple-500 font-semibold">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button className="w-full bg-purple-500 py-3 text-center text-white">Register Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
