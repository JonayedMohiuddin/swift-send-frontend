export default function InputField({ name, type, placeholder, autocomplete, required }) {
    return (
        <>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={autocomplete}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </>
    );
}

// <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />