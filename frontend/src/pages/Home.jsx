import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTruck,
  FiTag,
  FiPackage,
  FiTrendingUp,
  FiShoppingCart,
} from "react-icons/fi";
import { FaAnglesRight } from "react-icons/fa6";
import api from "../api";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const itemVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

function Home() {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await api.get("api/customers/");
        setCustomers(customersResponse.data.slice(0, 3));

        const suppliersResponse = await api.get("api/suppliers/");
        setSuppliers(suppliersResponse.data.slice(0, 3));

        const categoriesResponse = await api.get("api/categories/");
        setCategories(categoriesResponse.data.slice(0, 3));

        const productsResponse = await api.get("api/products/");
        setProducts(productsResponse.data.slice(0, 3));

        const salesResponse = await api.get("api/sales/");
        setSales(salesResponse.data.slice(0, 3));

        const purchasesResponse = await api.get("api/purchases/");
        setPurchases(purchasesResponse.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sectionData = [
    {
      title: "Customers",
      data: customers,
      link: "/Customer",
      displayKey: "name",
      icon: FiUsers,
    },
    {
      title: "Suppliers",
      data: suppliers,
      link: "/Supplier",
      displayKey: "name",
      icon: FiTruck,
    },
    {
      title: "Categories",
      data: categories,
      link: "/Category",
      displayKey: "name",
      icon: FiTag,
    },
    {
      title: "Products",
      data: products,
      link: "/Product",
      displayKey: "name",
      icon: FiPackage,
    },
    {
      title: "Sales",
      data: sales,
      link: "/Sales",
      displayKey: "total", // Changed to 'total'
      icon: FiTrendingUp,
    },
    {
      title: "Purchases",
      data: purchases,
      link: "/Purchase",
      displayKey: "total", // Changed to 'total'
      icon: FiShoppingCart,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Inventory Management System</title>
        <meta
          name="description"
          content="View and manage your inventory dashboard. Track customers, suppliers, categories, products, sales, and purchases in real-time."
        />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Dashboard - Inventory Management System"
        />
        <meta
          property="og:description"
          content="View and manage your inventory dashboard. Track customers, suppliers, categories, products, sales, and purchases in real-time."
        />
        <meta property="og:image" content="../assets/vite.png" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Dashboard - Inventory Management System"
        />
        <meta
          name="twitter:description"
          content="View and manage your inventory dashboard. Track customers, suppliers, categories, products, sales, and purchases in real-time."
        />
        <meta name="twitter:image" content="../assets/vite.png" />

        {/* Canonical Link */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <motion.div
        className="p-4 ss:p-6 grid grid-cols-1 ss:grid-cols-2 ms:grid-cols-3 gap-4 ss:gap-6 
                   bg-gray-100 shadow-xl rounded-2xl w-[360px] ps:w-[360px] xs:w-[500px] ss:w-[650px] 
                   ms:w-[900px] mx-auto overflow-y-auto ss:h-full h-[650px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {sectionData.map((section) => (
          <motion.div
            key={section.title}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg 
                       transition-shadow duration-300"
            variants={sectionVariants}
          >
            <div className="p-3 ss:p-5">
              <div className="flex items-center justify-between mb-2 ss:mb-4">
                <h3 className="text-base ss:text-lg font-semibold text-gray-800 flex items-center">
                  {section.title}
                  <span className="ml-2">
                    <section.icon className="text-gray-500" />
                  </span>
                </h3>
              </div>

              <ul className="space-y-1 ss:space-y-2">
                {section.data.map((item) => (
                  <motion.li
                    key={item.id}
                    className="text-sm ss:text-base text-gray-700 py-1.5 ss:py-2 px-2 ss:px-3 
                             hover:bg-gray-50 rounded-md transition-colors duration-200"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    {section.title === "Sales" || section.title === "Purchases"
                      ? `Total: ${item[section.displayKey]}`
                      : item[section.displayKey] || `ID: ${item.id}`}
                  </motion.li>
                ))}
                {section.data.length === 0 && (
                  <li className="text-sm ss:text-base text-gray-500 py-1.5 ss:py-2 px-2 ss:px-3">
                    No data available.
                  </li>
                )}
              </ul>

              {section.data.length > 0 && (
                <div className="mt-3 ss:mt-4">
                  <Link
                    to={section.link}
                    className="inline-flex items-center text-xs ss:text-sm text-blue-600 
                             hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    View All
                    <FaAnglesRight className="ml-1 text-xs ss:text-sm" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default Home;
