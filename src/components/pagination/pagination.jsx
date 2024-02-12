import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ totalProducts, currentPage, lastPage }) {
    let paginationLinksFirstPart = [];
    let paginationLinksSecondPart = [];

    currentPage = parseInt(currentPage);
    lastPage = parseInt(lastPage);

    if (lastPage <= 8) {
        for (let i = 1; i <= lastPage; i++) {
            paginationLinksFirstPart.push(<PaginationLinks key={i} pageNumber={i} isSelected={i === currentPage} />);
        }
    } else if (lastPage - currentPage <= 4) {
        for (let i = Math.max(lastPage - 5, 1); i <= lastPage; i++) {
            paginationLinksFirstPart.push(<PaginationLinks key={i} pageNumber={i} isSelected={i === currentPage} />);
        }
    } else {
        let startPage = currentPage - 1;
        if (startPage < 1) startPage = 1;

        for (let i = startPage; i <= lastPage && i < startPage + 4; i++) {
            paginationLinksFirstPart.push(<PaginationLinks key={startPage + i} pageNumber={i} isSelected={i === currentPage} />);
        }

        let secondPartStart = lastPage - 1;
        if (secondPartStart < startPage + 4) secondPartStart = startPage + 4;

        for (let i = secondPartStart; i <= lastPage; i++) {
            paginationLinksSecondPart.push(<PaginationLinks key={secondPartStart + i} pageNumber={i} isSelected={i === currentPage} />);
        }
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 hidden lg:block">
                        Showing <span className="font-medium">{(currentPage - 1) * 30 + ((totalProducts > 0)? 1 : 0)}</span> to <span className="font-medium">{Math.min(currentPage * 30, totalProducts)}</span> of{" "}
                        <span className="font-medium">{totalProducts}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            name="page"
                            value={currentPage - 1}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:ring-indigo-700 hover:bg-gray-50 hover:z-20 focus:z-20 focus:outline-offset-0 ${
                                currentPage === 1 && "cursor-not-allowed hover:ring-current"
                            }`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {paginationLinksFirstPart}
                        {paginationLinksSecondPart.length > 0 && <PaginationDot />}
                        {paginationLinksSecondPart}
                        <button
                            name="page"
                            value={currentPage + 1}
                            disabled={currentPage === lastPage}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  hover:ring-indigo-700 hover:bg-gray-50 hover:z-20 focus:z-20 focus:outline-offset-0 ${
                                currentPage === lastPage && "cursor-not-allowed hover:ring-current"
                            }`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

function PaginationLinks({ pageNumber, isSelected = false }) {
    return (
        <>
            {isSelected ? (
                <button
                    name="page"
                    value={pageNumber}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {pageNumber}
                </button>
            ) : (
                <button
                    name="page"
                    value={pageNumber}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-indigo-700 hover:z-20 focus:z-20 focus:outline-offset-0"
                >
                    {pageNumber}
                </button>
            )}
        </>
    );
}

function PaginationDot() {
    return <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>;
}
