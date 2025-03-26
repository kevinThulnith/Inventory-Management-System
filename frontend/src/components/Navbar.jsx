import { FaBarsStaggered } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import viteLogo from "../assets/vite.png";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // !State to manage menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // !Function to toggle menu visibility

  return (
    <div className="fixed top-0 left-0 z-50 bg-white shadow-md w-full py-4">
      <div className="md:container md:mx-auto mx-4 flex justify-between items-center">
        <div className="flex">
          <img className="h-9 mr-2" src={viteLogo} alt="Logo" />
          <NavLink
            to="/"
            style={{
              fontWeight: 700,
              color: "#3172c4",
              fontSize: "24px",
              letterSpacing: "0.5px",
            }}
          >
            Inventory Management System
          </NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 outline-none border-none text-2xl"
        >
          {isMenuOpen ? <FaChevronUp /> : <FaBarsStaggered />}
        </button>

        {/* !Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 absolute md:static bg-white w-full md:w-auto left-0 top-16 py-4 md:py-0 shadow-md md:shadow-none`}
          style={{ color: "#999", fontWeight: 500, fontSize: "17px" }}
        >
          <NavLink
            to="/Customer"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Customers
          </NavLink>
          <NavLink
            to="/Supplier"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Suppliers
          </NavLink>
          <NavLink
            to="/Category"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Categories
          </NavLink>
          <NavLink
            to="/Product"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Products
          </NavLink>
          <NavLink
            to="/Sales"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Sales
          </NavLink>
          <NavLink
            to="/Purchase"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Purchase
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Logout
            <FiLogOut className="inline-block ml-2" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
