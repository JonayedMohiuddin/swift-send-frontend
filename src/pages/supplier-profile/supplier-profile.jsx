import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthContext/authContext";

export default function SupplierProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setSuppliername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const { logout } = useContext(AuthContext);

    async function fetchSupplierProfile() {
        try {
            const response = await fetch("http://localhost:3000/supplier/about", { credentials: "include" });
            const data = await response.json();

            setSuppliername(data[0].NAME);
            setEmail(data[0].EMAIL);
            setAddress(data[0].ADDRESS);
            setImageUrl(data[0].IMAGE_URL);
            setDescription(data[0].DESCRIPTION);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        fetchSupplierProfile();
    }, []);

    async function handleSupplierDelete() {
        if (!window.confirm("Are you sure you want to delete this seller account?")) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/supplier/remove", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            localStorage.clear();
            localStorage.setItem("isLoggedIn", false);
            logout();

            if (response.ok) {
                window.location.href = "/catalog";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
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
                    <h3 className="text-2xl leading-6 font-bold text-gray-900 ">Supplier Profile</h3>
                    <button
                        className="ml-auto mr-10 text-primary ring-2 ring-red-300 rounded-lg p-2 bg-red-200 hover:bg-red-300"
                        onClick={() => {
                            handleSupplierDelete();
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
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{name}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{email}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                {address && address != "" ? address : <div className="text-xs text-writing-unimportant">No address provided</div>}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900 col-span-3 h-[5lh] overflow-y-scroll w-full">
                                {description && description != "" ? description : <div className="text-xs text-writing-unimportant">No description provided</div>}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {isModalOpen && (
                <EditProfile
                    closeModal={() => setIsModalOpen(false)}
                    paramSuppliername={name}
                    paramEmail={email}
                    paramAddress={address}
                    paramDescription={description}
                    paramProfilePicture={imageUrl}
                />
            )}
        </div>
    );
}

function EditProfile({ paramSuppliername = "", paramEmail, paramAddress = "", paramProfilePicture = "", paramDescription = "", closeModal }) {
    async function handleProfileEditSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("http://localhost:3000/supplier/update", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.get("name").trim().replace(/\s+/g, "-"),
                    email: paramEmail,
                    description: formData.get("description").trim(),
                    address: formData.get("address").trim(),
                    imageUrl: formData.get("profilePicture").trim(),
                }),
            });

            if (response.ok) {
                closeModal();
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="font-ember-regular fixed top-5 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-2/3 max-h-full">
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
                            <div className="flex flex-row gap-x-5">
                                <div className="grid gap-4 mb-4 grid-cols-2 w-1/2">
                                    <div className="col-span-2 flex flex-col gap-x-5">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter seller name"
                                            required
                                            defaultValue={paramSuppliername && paramSuppliername.split(" ")[0]}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Address
                                        </label>
                                        <input
                                            id="address"
                                            name="address"
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
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your profile picture url"
                                            defaultValue={paramProfilePicture}
                                            required=""
                                        />
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={9}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Description of your business"
                                        defaultValue={paramDescription}
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
