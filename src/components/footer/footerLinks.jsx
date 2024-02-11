export default function FooterLinks({ name, url }) {
    return (
        <div as="a" href={url} color="blue-gray" className="cursor-pointer font-normal transition-colors hover:bg-[#264754] focus:bg-blue-50 py-1 px-2 rounded-md">
            {name}
        </div>
    );
}
