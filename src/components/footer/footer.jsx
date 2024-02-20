import FooterLinks from "./footerLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fff] py-2 pb-4">
      <div className="w-[85%] mx-auto flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-14 text-center md:justify-between">
        <img src="\images\logo-dark.svg" alt="logo-ct" className="w-15s hidden md:block cursor-not-allowed" />
        <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-black">
            <FooterLinks name="Home" url="/" />
            <FooterLinks name="About" url="/about" />
            <FooterLinks name="Contact" url="/contact" />
        </div>
      </div>
      <hr className="my-3 border-blue-gray-50" />
      <p color="blue-gray" className="text-center font-normal text-black">
        &copy; 2023 Jonayed Mohiuddin and Elias Hasbi
      </p>
    </footer>
  );
}