import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
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

function Home() {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  // TODO: Refresh the page when the page is loaded for the first time
  if (!localStorage.getItem("refreshed")) {
    localStorage.setItem("refreshed", "true");
    window.location.reload();
  }

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

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
    <motion.div
      className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 shadow-xl rounded-2xl h-full md:w-[900px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {sectionData.map((section) => (
        <motion.div
          key={section.title}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          variants={sectionVariants}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                {section.title}
                <span className="ml-2">
                  <section.icon className="text-gray-500" />
                </span>
              </h3>
            </div>
            <ul>
              {section.data.map((item, index) => (
                <motion.li
                  id={index}
                  key={item.id}
                  className="text-gray-700 py-2 px-3 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  {section.title === "Sales" || section.title === "Purchases"
                    ? `Total: ${item[section.displayKey]}`
                    : item[section.displayKey] || `ID: ${item.id}`}
                </motion.li>
              ))}
              {section.data.length === 0 && (
                <li className="text-gray-500 py-2 px-3">No data available.</li>
              )}
            </ul>
            {section.data.length > 0 && (
              <div className="mt-4">
                <Link
                  to={section.link}
                  className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                >
                  View All <FaAnglesRight className="inline" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Home;
