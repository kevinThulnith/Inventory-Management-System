import LoadingIndicator from "../components/LoadingIndicator";
import { useState, useEffect, useCallback } from "react";
import animations from "../components/animation";
import { FaAnglesRight } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { motion } from "framer-motion";
import api from "../api";

const initialFormState = {
  name: "",
  costPrice: "",
  sellingPrice: "",
  description: "",
  stockQuantity: "",
  productCategory: "",
  is_active: true,
};

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [currentProductId, setCurrentProductId] = useState(null);

  const getProducts = useCallback(async () => {
    setLoading(true);
    api
      .get("api/products/all/")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to fetch products!"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to fetch categories!"))
      .finally(() => setLoading(false));
    getProducts();
  }, [getProducts]);

  const handleCancel = useCallback(() => {
    setFormData(initialFormState);
    setCurrentProductId(null);
    setIsUpdating(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const method = isUpdating ? "put" : "post";
        const url = isUpdating
          ? `api/products/${currentProductId}/`
          : "api/products/";
        await api[method](url, formData);
        alert(`Product ${isUpdating ? "updated" : "added"} successfully!`);
        await getProducts();
        handleCancel();
      } catch {
        alert(`Failed to ${isUpdating ? "update" : "add"} product!`);
      } finally {
        setLoading(false);
      }
    },
    [formData, isUpdating, currentProductId, getProducts, handleCancel]
  );

  const handleUpdate = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        setFormData(product);
        setCurrentProductId(id);
        setIsUpdating(true);

        const containerElement = document.getElementById("container");
        containerElement?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [products]
  );

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md sm:p-6 p-4 flex ms:flex-row flex-col ms:gap-6 gap-2 ms:w-[1150px] ss:w-[600px] w-[360px] mx-auto overflow-y-auto ss:h-[740px] h-[650px]"
      id="container"
      initial="hidden"
      animate="visible"
      variants={animations.container}
    >
      {/* Page form */}
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
              value={formData.name}
              onChange={handleChange}
              className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={formData.costPrice}
                onChange={handleChange}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={formData.sellingPrice}
                onChange={handleChange}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.stockQuantity}
              onChange={handleChange}
              className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  id="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
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
                      checked={formData.is_active === true}
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
                      checked={formData.is_active === false}
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

      {/* Products list */}
      <motion.div className="flex-1" variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3"
          variants={animations.item}
        >
          View Products
          <IoMdList className="ss:text-4xl text-3xl" />
        </motion.h2>
        <motion.div style={{ overflowX: "auto" }} variants={animations.item}>
          <motion.div
            className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[600px]"
            variants={animations.item}
          >
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
              {products.map((product, index) => (
                <motion.div
                  className={`${
                    index !== 0 ? "border-t-2 border-gray-300" : ""
                  } flex columns-4 h-[45px] w-full`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                    <motion.button
                      onClick={() => handleUpdate(product.id)}
                      whileTap={{ scale: 0.9 }}
                      className="ml-2"
                    >
                      <FaAnglesRight className="ml-3 text-xl" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      {loading && <LoadingIndicator />}
    </motion.div>
  );
}

export default Product;
