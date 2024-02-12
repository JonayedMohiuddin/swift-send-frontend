import FooterLinks from "./footerLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2d6074] py-2 pb-4">
      <div className="w-[85%] mx-auto flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-14 text-center md:justify-between">
        <img src="\images\logo.svg" alt="logo-ct" className="w-15 hidden md:block cursor-not-allowed" />
        <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-white">
            <FooterLinks name="Home" url="/" />
            <FooterLinks name="About" url="/about" />
            <FooterLinks name="Contact" url="/contact" />
        </div>
      </div>
      <hr className="my-3 border-blue-gray-50" />
      <p color="blue-gray" className="text-center font-normal text-white">
        &copy; 2023 Jonayed Mohiuddin
      </p>
    </footer>
  );
}