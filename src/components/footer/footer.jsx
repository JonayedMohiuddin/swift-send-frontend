import FooterLinks from "./footerLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-white px-8 py-2 pt-4">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img src="\images\footer-logo.png" alt="logo-ct" className="w-6 hidden md:block" />
        <div className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <FooterLinks name="Home" url="/" />
            <FooterLinks name="About" url="/about" />
            <FooterLinks name="Contact" url="/contact" />
        </div>
      </div>
      <hr className="my-3 border-blue-gray-50" />
      <p color="blue-gray" className="text-center font-normal">
        &copy; 2023 Jonayed Mohiuddin
      </p>
    </footer>
  );
}