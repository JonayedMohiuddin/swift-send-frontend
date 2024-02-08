export default function FooterLinks({ name, url }) {
    return (
        <div as="a" href={url} color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 py-1 px-2 rounded-md">
            {name}
        </div>
    );
}
