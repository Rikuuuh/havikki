import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Kunta.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 navbar">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/havikki">
              <img className="h-12 w-auto mr-2" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6 items-center">
            <Link to="/admin" className="text-md text-white">
              Lisää hävikkiruokamäärät
            </Link>
          </div>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="#" className="bg-gradient-to-r from-green-300 to-green-400 py-2 px-3 rounded-md">
              Kirjaudu sisään
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-green-400 to-green-300 py-2 px-3 rounded-md"
            >
              Luo uusi tili
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-50 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li>
                <Link to="/admin" className="block py-2">
                  Lisää hävikkiruokamäärät
                </Link>
              </li>
            </ul>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="py-2 px-3 border rounded-md">
                Kirjaudu sisään
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-green-400 to-green-300"
              >
                Luo uusi tili
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;