import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" border-t border-t-tertiary py-3 px-5">
      <div className="flex flex-col sm:flex-row justify-center text-center  sm:justify-between  gy-3  flex-wrap">
        <Link to="/" className="text-primary text-shadow-primary">
          Cine<span className="text-secondary">Tech</span>Nuru
        </Link>
        <p className="text-white text-center py-1">
          &copy; <span id="current-year">{new Date().getFullYear()} </span>
          Developed by{" "}
          <Link to="" className="text-primary">
            Techienuru
          </Link>
        </p>
        <div className="flex justify-center align-center gap-x-5">
          <Link
            to="https://www.linkedin.com/in/ibrahim-nurudeen-375b55267/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link to="https://twitter.com/techienuru" target="_blank">
            <FaTwitter />
          </Link>
          <Link to="https://www.instagram.com/techienuru/" target="_blank">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
