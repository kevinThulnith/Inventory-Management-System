import LoadingIndicator from "../components/LoadingIndicator";
import animations from "../components/animation";
import { FaAnglesRight } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { motion } from "framer-motion";
import api from "../api";

function Product() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [costPrice, setCostPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);

  const getProducts = () => {
    setLoading(true);
    api
      .get("api/products/all/")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to fetch products!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to fetch categories!"))
      .finally(() => setLoading(false));

    getProducts();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const productData = {
      name,
      costPrice,
      sellingPrice,
      description,
      stockQuantity,
      productCategory: category,
      is_active: isActive,
    };

    if (isUpdating) {
      api
        .put(`api/products/${currentProductId}/`, productData)
        .then(() => {
          alert("Product updated successfully!");
          getProducts();
          handleCancel();
        })
        .catch(() => alert("Failed to update product!"))
        .finally(() => setLoading(false));
    } else {
      api
        .post("api/products/", productData)
        .then(() => {
          alert("Product added successfully!");
          getProducts();
          handleCancel();
        })
        .catch(() => alert("Failed to add product!"))
        .finally(() => setLoading(false));
    }
  };

  const handleUpdate = (id) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setName(product.name);
      setCostPrice(product.costPrice);
      setSellingPrice(product.sellingPrice);
      setDescription(product.description);
      setStockQuantity(product.stockQuantity);
      setCategory(product.productCategory);
      setIsActive(product.is_active);
      setCurrentProductId(id);
      setIsUpdating(true);
    }
    // Scroll to top
    const containerElement = document.querySelector(".form-container");
    containerElement?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setName("");
    setCostPrice("");
    setSellingPrice("");
    setDescription("");
    setStockQuantity("");
    setCategory("");
    setIsActive(true);
    setCurrentProductId(null);
    setIsUpdating(false);
  };

  const handleChange = (e) => {
    setIsActive(e.target.value === "true");
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md sm:p-6 p-4 flex ms:flex-row flex-col ms:gap-6 gap-2 ms:w-[1150px] ss:w-[600px] form-container w-[380px] mx-auto overflow-y-auto ss:h-[740px] h-[650px]"
      initial="hidden"
      animate="visible"
      variants={animations.container}
    >
      <motion.div className="flex-1" variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3"
          variants={animations.item}
        >
          {" "}
          {isUpdating ? "Update Product" : "Add New Product"}
          {isUpdating ? <RxUpdate /> : <AiFillProduct />}
        </motion.h2>
        <motion.span
          className="text-sm text-gray-600 ml-3"
          variants={animations.item}
        >
          Fill the form and submit.
        </motion.span>
        <motion.form
          className="xs:mt-6 mt-2 space-y-6 xs:p-4 p-2"
          onSubmit={handleSubmit}
          variants={animations.item}
        >
          <motion.div variants={animations.item}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              required
              id="name"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </motion.div>
          <div className="ss:flex ss:col-span-2 ss:gap-4">
            <motion.div variants={animations.item}>
              <label
                htmlFor="costPrice"
                className="block text-sm font-medium text-gray-600"
              >
                Cost Price
              </label>
              <input
                required
                id="costPrice"
                type="text"
                placeholder="Enter cost price"
                pattern="[0-9]+(\.[0-9][0-9]?)?"
                title="Enter numbers only (e.g., 123 or 123.45)"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </motion.div>
            <motion.div variants={animations.item}>
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-medium text-gray-600 ss:mt-0 mt-5"
              >
                Selling Price
              </label>
              <input
                required
                id="sellingPrice"
                type="text"
                placeholder="Enter selling price"
                pattern="[0-9]+(\.[0-9][0-9]?)?"
                title="Enter numbers only (e.g., 123 or 123.45)"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </motion.div>
          </div>
          <motion.div variants={animations.item}>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              required
              rows="2"
              id="description"
              className="resize-none mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </motion.div>
          <motion.div variants={animations.item}>
            <label
              htmlFor="stockQuantity"
              className="block text-sm font-medium text-gray-600"
            >
              Stock Quantity
            </label>
            <input
              required
              id="stockQuantity"
              type="text"
              pattern="[0-9]+"
              title="Enter numbers only (e.g., 123)"
              placeholder="Enter stock quantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </motion.div>
          <div
            className={`${
              isUpdating ? "flex columns-2 gap-4 justify-between" : ""
            }`}
          >
            <motion.div variants={animations.item}>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Product Category
              </label>
              <div className="relative">
                <select
                  required
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none appearance-none pr-8 cursor-pointer"
                  style={{ backgroundPosition: "right 12px center" }}
                >
                  <option value="" className="text-gray-500">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="text-gray-700 hover:bg-gray-100"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <FaChevronDown />
                </div>
              </div>
            </motion.div>
            {isUpdating && (
              <motion.div variants={animations.item}>
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="is_active"
                      value="true"
                      checked={isActive === true}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="is_active"
                      value="false"
                      checked={isActive === false}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Discontinued</span>
                  </label>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {isUpdating ? "Update Product" : "Add Product"}
            </button>
            {isUpdating && (
              <button
                type="button"
                onClick={handleCancel}
                className="font-medium mt-2 px-4 py-2 text-slate-100 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>
      </motion.div>
      <motion.div className="flex-1" variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3"
          variants={animations.item}
        >
          View Products
          <IoMdList className="ss:text-4xl text-3xl" />
        </motion.h2>
        <motion.div style={{ overflowX: "auto" }} variants={animations.item}>
          <div className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[600px]">
            <div className="bg-blue-600 w-full h-[45px] rounded-t-xl flex columns-4">
              <div className="flex-[0.5] text-white text-center pt-3 border-r-2 border-white font-semibold">
                Id
              </div>
              <div className="flex-[0.8] text-white text-center pt-3 border-r-2 border-white font-semibold">
                Name
              </div>
              <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
                Pricing C/S
              </div>
              <div className="flex-[0.8] text-white text-center pt-3 font-semibold">
                Stock Quantity
              </div>
            </div>
            <div className="w-full h-[555px] rounded-b-xl overflow-x-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`${
                    product.id !== 1 ? "border-t-2 border-gray-300" : ""
                  } flex columns-4 h-[45px] w-full`}
                >
                  <div className="flex-[0.5] text-gray-700 text-center pt-2 border-r-2 border-gray-300">
                    {product.id}
                  </div>
                  <div className="flex-[0.8] text-gray-700 indent-3 pt-2 border-r-2 border-gray-300">
                    {product.name}
                  </div>
                  <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300 truncate">
                    {product.costPrice}/{product.sellingPrice}
                  </div>
                  <div className="flex-[0.8] text-gray-700 text-center pt-2 flex items-center indent-4">
                    {product.stockQuantity}
                    <button onClick={() => handleUpdate(product.id)}>
                      <FaAnglesRight className="ml-3 text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      {loading && <LoadingIndicator />}
    </motion.div>
  );
}

export default Product;
