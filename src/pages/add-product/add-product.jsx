import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import InputField from "../../components/form-components/InputField";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddProduct() {
    const { categories } = useLoaderData();
    const errors = useActionData();

    const navigate = useNavigate();

    function onCancelButonClick(event) {
        event.preventDefault();
        console.log("Cancel button clicked");
        navigate("/supplier");
    }

    return (
        <>
            {errors?.errorMessage && (
                <div className="flex flex-row mx-auto mb-5 w-full lg:w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ExclamationTriangleIcon className="mr-4 h-6 w-6 text-red-400" />
                    {errors?.errorMessage ? errors.errorMessage : "Failed to add product."}
                </div>
            )}

            <div className="pb-10">
                <div className="container mx-auto">
                    <div className="w-12/12 lg:w-3/4  rounded-xl mx-auto shadow-lg overflow-hidden bg-slate-300 bg-opacity-90">
                        <div className="flex flex-col w-full py-8 px-10">
                            <h2 className="text-3xl mb-4 text-center">Add Product</h2>
                            <Form id="add-product-form" method="post" role="form">
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="col-span-1">
                                        <p className="text-gray-500">Product Name</p>
                                    </div>
                                    <div className="col-span-2">
                                        <InputField id="product-name-input" name="product-name" type="text" autoComplete="product-name" required />
                                    </div>

                                    <div className="col-span-1">
                                        <p className="text-gray-500">Price</p>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex flex-row items-center">
                                            <InputField id="price-input" name="price" type="number" autoComplete="price" required />
                                            <p className="text-gray-600 ml-2 font-bold text-xl px-5">৳</p>
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <p className="text-gray-500">Discount</p>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex flex-row items-center">
                                            <InputField id="discount-input" name="discount" type="number" autoComplete="discount" />
                                            <p className="text-gray-600 ml-2 font-bold text-xl px-5 font-ember-bold">%</p>
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <p className="text-gray-500">Image Url</p>
                                    </div>
                                    <div className="col-span-2">
                                        <InputField id="image-url-input" name="image-url" type="text" autoComplete="image-url" />
                                    </div>

                                    <div className="col-span-1">
                                        <p className="text-gray-500">Category</p>
                                    </div>
                                    <div className="col-span-2">
                                        <select
                                            id="category-select"
                                            name="category"
                                            className="block pl-3 pr-2 w-full h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">Not Selected</option>
                                            {categories.map((category) => (
                                                <option key={category.ID} value={category.ID}>
                                                    {category.NAME}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-3">
                                        <p className="text-gray-500 text-center mt-5">Description</p>
                                    </div>
                                    <div className="col-span-3">
                                        <textarea
                                            id="description-input"
                                            name="description"
                                            className="block pl-3 pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 min-h-24"
                                        />
                                    </div>

                                    <div className="col-span-1 mt-5">
                                        <button onClick={onCancelButonClick} className="rounded-md w-full  bg-red-600  py-2  text-center  text-white  hover:bg-red-500">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="col-span-1 mt-5"></div>
                                    <div className="col-span-1  mt-5">
                                        <button type="submit" className="rounded-md w-full bg-purple-600 py-2 text-center text-white hover:bg-purple-500">
                                            Add Product
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
