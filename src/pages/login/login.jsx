export default function Login() {
    return (
        <>
            {/* <div className="container flex flex-row justify-center min-h-full min-w-full h-[100vh] p-0 m-0"> */}
            <div className="flex flex-row justify-center min-w-full pt-2 pb-8 m-0">
                <div className="flex flex-col justify-center px-10 pt-4 pb-8 bg-slate-300 rounded-md rounded-r-none bg-opacity-90 border border-slate-800 border-r-0">
                    {/* <div className="flex flex-col justify-center my-4 px-10"> */}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm min-w-40 md:min-w-72 lg:min-w-80 ">
                        <form className="space-y-5" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign Up Now
                            </a>
                        </p>
                    </div>
                </div>
                <img src="/images/login-bg.jpg" alt="login" className="hidden sm:block w-80 h-auto rounded-md rounded-l-none border border-slate-800 border-l-0" />
            </div>
        </>
    );
}
