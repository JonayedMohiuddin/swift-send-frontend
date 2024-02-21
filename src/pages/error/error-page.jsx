import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-2">Oops!</h1>
        <p className="text-xl text-gray-800 mb-4">Something went wrong.</p>
        <p className="text-lg text-gray-700 mb-4">{error.message}</p>
        <p className="text-lg text-gray-700 mb-8">{error.status}</p>
      </div>
    </div>
  );
}
