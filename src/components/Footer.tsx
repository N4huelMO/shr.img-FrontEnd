import Link from "next/link";
import { BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";

const socials = [
  { icon: <BiLogoGithub size={30} />, href: "https://github.com/N4huelMO" },
  {
    icon: <BiLogoLinkedinSquare size={30} />,
    href: "https://www.linkedin.com/in/nahuelmesa97/",
  },
];

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center gap-5 pb-4 mt-5 md:mt-0">
      <p className="text-sm">Developed by n4huelMO</p>

      {socials.map((social, i) => (
        <Link
          key={i}
          href={social.href}
          className="hover:text-neutral-600 cursor-pointer transition-all"
          target="_blank"
        >
          {social.icon}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
