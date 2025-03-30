import { FaBarsStaggered, FaAnglesRight } from "react-icons/fa6";
import { useState, useCallback, memo } from "react";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import viteLogo from "../assets/vite.png";

// !Navigation items configuration
const navItems = [
  { path: "/Customer", label: "Customers" },
  { path: "/Supplier", label: "Suppliers" },
  { path: "/Category", label: "Categories" },
  { path: "/Product", label: "Products" },
  { path: "/Sales", label: "Sales" },
  { path: "/Purchase", label: "Purchase" },
];

// !Memoized NavLink component for better performance
const NavItem = memo(({ to, label, onClick, className, icon }) => (
  <NavLink to={to} className={className} onClick={onClick}>
    {label}
    {icon && icon}
  </NavLink>
));

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const getNavLinkClass = useCallback(
    ({ isActive }) => `
    block py-2 ${
      isActive ? "text-black" : "hover:text-gray-700 duration-200 ease-in-out"
    }
  `,
    []
  );

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
            <span className="hidden xs:inline">
              Inventory Management System
            </span>
            <span className="xs:hidden">IMS 3.0</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="ls:hidden text-gray-700 outline-none border-none text-2xl"
        >
          {isMenuOpen ? <FaAnglesRight /> : <FaBarsStaggered />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`
            fixed top-16 right-0 h-[calc(100vh-4rem)] xs:w-[450px] w-[80%] bg-white shadow-lg 
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            ls:hidden flex flex-col p-4
          `}
          style={{ color: "#999", fontWeight: 500, fontSize: "17px" }}
        >
          {navItems.map(({ path, label }) => (
            <NavItem
              key={path}
              to={path}
              label={label}
              className={getNavLinkClass}
              onClick={closeMenu}
            />
          ))}
          <NavItem
            to="/logout"
            label="Logout"
            className={getNavLinkClass}
            onClick={closeMenu}
            icon={<FiLogOut className="inline-block ml-2" />}
          />
        </div>

        {/* Desktop Menu */}
        <div
          className="ls:flex ls:space-x-4 hidden"
          style={{ color: "#999", fontWeight: 500, fontSize: "17px" }}
        >
          {navItems.map(({ path, label }) => (
            <NavItem
              key={path}
              to={path}
              label={label}
              className={getNavLinkClass}
            />
          ))}
          <NavItem
            to="/logout"
            label="Logout"
            className={getNavLinkClass}
            icon={<FiLogOut className="inline-block ml-2" />}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
