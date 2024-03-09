import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function AdminCategoryManagement() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentEditingCategory, setCurrentEditingCategory] = useState({});

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:3000/catalog/categories");
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="font-ember-regular">
            <div className="flex flex-row mb-5">
                <button
                    className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                >
                    Add Category
                </button>

                <div className="ml-auto text-xl font-bold bg-white p-2 rounded-lg">Total Categories: {categories.length}</div>
            </div>

            <div className="flex flex-col gap-y-7 mb-10">
                {categories.map((category) => (
                    <CategoryItem key={category.ID} category={category} fetchCategories={fetchCategories} setShowEditModal={setShowEditModal} setCurrentEditingCategory={setCurrentEditingCategory} />
                ))}
            </div>

            {showEditModal && (
                <EditCategory
                    categoryId={currentEditingCategory.ID}
                    paramName={currentEditingCategory.NAME}
                    paramDescription={currentEditingCategory.DESCRIPTION}
                    paramImageUrl={currentEditingCategory.IMAGE_URL}
                    closeModal={() => setShowEditModal(false)}
                    fetchCategories={fetchCategories}
                />
            )}
            {showAddModal && <AddCategory closeModal={() => setShowAddModal(false)} fetchCategories={fetchCategories} />}
        </div>
    );
}

function CategoryItem({ category, fetchCategories, setShowEditModal, setCurrentEditingCategory }) {
    async function handleCategoryDelete() {
        try {
            const response = await fetch("http://localhost:3000/admin/removeCategory", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryId: category.ID }),
            });
            if (response.status === 401) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status === 403) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status !== 200) {
                return navigate("/");
            }
            const data = await response.json();
            console.log(data);

            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    return (
        <div className="bg-white p-3 rounded-lg">
            <div className="flex flex-row">
                <img
                    src={category.IMAGE_URL}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/150.png";
                    }}
                    alt={category.name}
                    className="w-56 h-56 object-cover rounded-2xl"
                />

                <div className="flex flex-col ml-4 gap-y-3 w-full">
                    <div className="flex flex-row">
                        <h2 className="font-ember-regular text-3xl font-bold">{category.NAME}</h2>
                        <div className="ml-auto"></div>
                        <button
                            className="mr-5 text-primary ring-2 ring-red-300 rounded-lg p-2 bg-red-200 hover:bg-red-300"
                            onClick={() => {
                                handleCategoryDelete();
                            }}
                        >
                            <TrashIcon className="w-5" />
                        </button>
                        <button
                            className="text-primary hover:text-primary-dark ring-2 rounded-lg p-2 bg-blue-200 hover:bg-blue-300"
                            onClick={() => {
                                setCurrentEditingCategory(category);
                                setShowEditModal(true);
                            }}
                        >
                            <PencilIcon className="w-5" />
                        </button>
                    </div>
                    <p className="font-ember-regular text-gray-600 line-clamp-[7]">{category.DESCRIPTION}</p>
                </div>
            </div>
        </div>
    );
}

function EditCategory({ fetchCategories, categoryId, paramName = "", paramDescription = "", paramImageUrl = "", closeModal }) {
    async function handleCategoryEditSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const description = formData.get("description");
        const imageUrl = formData.get("imageUrl");

        try {
            const response = await fetch("http://localhost:3000/admin/updateCategory", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryId, name, description, imageUrl }),
            });
            if (response.status === 401) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status === 403) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status !== 200) {
                return navigate("/");
            }
            const data = await response.json();
            console.log(data);
            closeModal();
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="font-ember-regular fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-1/2 max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-4 py-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Category</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-5 flex flex-col" onSubmit={handleCategoryEditSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter category name"
                                        defaultValue={paramName}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Image URL
                                    </label>
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your imageUrl"
                                        defaultValue={paramImageUrl}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={6}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your profile picture url"
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

function AddCategory({ fetchCategories, closeModal }) {
    async function handleCategoryAddSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const description = formData.get("description");
        const imageUrl = formData.get("imageUrl");

        try {
            const response = await fetch("http://localhost:3000/admin/addCategory", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, imageUrl }),
            });
            if (response.status === 401) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status === 403) {
                return navigate("/admin/login?errorMessage=" + encodeURIComponent(data.errorMessage));
            } else if (response.status !== 200) {
                return navigate("/");
            }
            const data = await response.json();
            console.log(data);
            closeModal();
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="font-ember-regular fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-1/2 max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-4 py-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Category</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-5 flex flex-col" onSubmit={handleCategoryAddSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter category name"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Image URL
                                    </label>
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your imageUrl"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={6}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your profile picture url"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ml-auto text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
