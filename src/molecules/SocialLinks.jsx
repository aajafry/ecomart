import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

const IconNavLinkStyle =
  "hover:text-amber-500 focus:text-amber-500 active:text-amber-500 transition-colors duration-200 ease-linear";

function SocialLinks() {
  return (
    <>
      <li>
        <a
          href="#"
          className={IconNavLinkStyle}
          title="Facebook"
          aria-label="Facebook"
        >
          <IoLogoFacebook size="20" />
        </a>
      </li>
      <li>
        <a
          href="#"
          className={IconNavLinkStyle}
          title="Twitter"
          aria-label="Twitter"
        >
          <BsTwitterX size="20" />
        </a>
      </li>
      <li>
        <a
          href="#"
          className={IconNavLinkStyle}
          title="Instagram"
          aria-label="Instagram"
        >
          <FaInstagram size="20" />
        </a>
      </li>
      <li>
        <a
          href="#"
          className={IconNavLinkStyle}
          title="Pinterest"
          aria-label="Pinterest"
        >
          <FaPinterestP size="20" />
        </a>
      </li>
    </>
  );
}

export default SocialLinks;
