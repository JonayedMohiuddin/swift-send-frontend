import { PencilIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersProfile() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    async function fetchUserProfile() {
        try {
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            const errorMessage = searchParams.get("errorMessage");

            setErrorMessage(errorMessage);

            const response = await fetch("http://localhost:3000/users/about", { credentials: "include" });
            const data = await response.json();

            setUsername(data[0].NAME);
            setEmail(data[0].EMAIL);
            setAddress(data[0].ADDRESS);
            setPhone(data[0].PHONE);
            setImageUrl(data[0].IMAGE_URL);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    async function handleUserDelete() {
        if (!window.confirm("Are you sure you want to delete your account?")) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/users/delete", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            localStorage.clear();
            localStorage.setItem("isLoggedIn", false);

            if (response.ok) {
                window.location.href = "/users/login";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            {(errorMessage && errorMessage != "") && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 text-sm text-center items-center rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errorMessage ? errorMessage : "Please login to access the item."}
                </div>
            )}

            <div className="flex flex-row mx-auto gap-x-5">
                <img
                    src={`${imageUrl}`}
                    onError={(e) => {
                        e.target.src = "/images/no-profile-picture.jpg";
                    }}
                    alt="profile-picture"
                    className="w-36 h-36 rounded-full ml-auto"
                />

                <div className="flex flex-col bg-white overflow-hidden shadow rounded-lg border font-ember-regular w-2/3 mb-10 mr-auto">
                    <div className="flex flex-row px-4 py-5 sm:px-6 items-center">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 ">User Profile</h3>
                        <button
                            className="ml-auto mr-10 text-primary ring-2 ring-red-300 rounded-lg p-2 bg-red-200 hover:bg-red-300"
                            onClick={() => {
                                handleUserDelete();
                            }}
                        >
                            <TrashIcon className="w-5" />
                        </button>
                        <button
                            className="text-primary hover:text-primary-dark ring-2 rounded-lg p-2 bg-blue-200 hover:bg-blue-300"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            <PencilIcon className="w-5" />
                        </button>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{name}</dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{email}</dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {phone && phone != "" ? phone : <div className="text-xs text-writing-unimportant">No phone number provided</div>}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {address && address != "" ? address : <div className="text-xs text-writing-unimportant">No address provided</div>}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {isModalOpen && (
                    <EditProfile fetchUserProfile={fetchUserProfile} closeModal={() => setIsModalOpen(false)} paramUsername={name} paramEmail={email} paramAddress={address} paramPhone={phone} paramProfilePicture={imageUrl} setErrorMessage={setErrorMessage} />
                )}
            </div>
        </>
    );
}

function EditProfile({ fetchUserProfile, paramUsername = "", paramEmail, paramAddress = "", paramPhone = "", paramProfilePicture = "", closeModal, setErrorMessage }) {
    const navigate = useNavigate();

    async function handleProfileEditSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("http://localhost:3000/users/update", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.get("firstname").trim().replace(/\s+/g, "-") + " " + formData.get("lastname").trim().replace(/\s+/g, "-"),
                    email: paramEmail,
                    phone: formData.get("phone").trim(),
                    address: formData.get("address").trim(),
                    imageUrl: formData.get("profilePicture").trim(),
                }),
            });

            if (response.ok) {
                console.log("Profile updated successfully");
                closeModal();
                fetchUserProfile();
                if(address != "" && phone != "" && address != null && phone != null)
                {
                    setErrorMessage("");
                }
                // navigate("/users/profile");
            } else {
                console.error("Error:", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="font-ember-regular fixed top-5 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-1/2 max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-4 py-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-5 flex flex-col" onSubmit={handleProfileEditSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 flex flex-row gap-x-5">
                                    <div className="flex flex-col w-1/2">
                                        <label htmlFor="firstname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="First name"
                                            required
                                            defaultValue={paramUsername && paramUsername.split(" ")[0]}
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <label htmlFor="lastname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Last name"
                                            required
                                            defaultValue={paramUsername !== "" && paramUsername.split(" ")[1]}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your phone number"
                                        defaultValue={paramPhone}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your address"
                                        defaultValue={paramAddress}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Profile Picture
                                    </label>
                                    <input
                                        id="profilePicture"
                                        name="profilePicture"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your profile picture url"
                                        defaultValue={paramProfilePicture}
                                        required=""
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ml-auto text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
