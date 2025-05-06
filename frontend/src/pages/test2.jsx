import LoadingIndicator from "../components/LoadingIndicator";
import animations from "../components/animation";
import { FaAnglesRight } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useCallback, useMemo } from "react";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { motion } from "framer-motion";
import api from "../api";

// Initial form state
const initialFormState = {
  name: "",
  costPrice: "",
  sellingPrice: "",
  description: "",
  stockQuantity: "",
  productCategory: "",
  is_active: true,
};

// Form fields configuration
const formFields = [
  { id: "name", label: "Product Name", type: "text" },
  {
    id: "costPrice",
    label: "Cost Price",
    type: "text",
    pattern: "[0-9]+(\\.[0-9][0-9]?)?",
  },
  {
    id: "sellingPrice",
    label: "Selling Price",
    type: "text",
    pattern: "[0-9]+(\\.[0-9][0-9]?)?",
  },
  { id: "description", label: "Description", type: "textarea" },
  {
    id: "stockQuantity",
    label: "Stock Quantity",
    type: "text",
    pattern: "[0-9]+",
  },
];

function Product() {
  const [formData, setFormData] = useState(initialFormState);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("api/products/all/");
      setProducts(res.data);
    } catch (error) {
      alert("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("api/categories/"),
          api.get("api/products/all/"),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        alert("Failed to fetch data!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (isUpdating) {
          await api.put(`api/products/${currentProductId}/`, formData);
          alert("Product updated successfully!");
        } else {
          await api.post("api/products/", formData);
          alert("Product added successfully!");
        }
        await getProducts();
        handleCancel();
      } catch (error) {
        alert(`Failed to ${isUpdating ? "update" : "add"} product!`);
      } finally {
        setLoading(false);
      }
    },
    [formData, isUpdating, currentProductId, getProducts]
  );

  const handleUpdate = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          costPrice: product.costPrice,
          sellingPrice: product.sellingPrice,
          description: product.description,
          stockQuantity: product.stockQuantity,
          productCategory: product.productCategory,
          is_active: product.is_active,
        });
        setCurrentProductId(id);
        setIsUpdating(true);

        const containerElement = document.getElementById("container");
        containerElement?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [products]
  );

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

  const renderFormFields = useMemo(
    () =>
      formFields.map(({ id, label, type, pattern }) => (
        <motion.div key={id} variants={animations.item}>
          <label className="block text-sm font-medium text-gray-600">
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              required
              id={id}
              rows="2"
              value={formData[id]}
              onChange={handleChange}
              className="resize-none mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          ) : (
            <input
              required
              id={id}
              type={type}
              pattern={pattern}
              value={formData[id]}
              onChange={handleChange}
              className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          )}
        </motion.div>
      )),
    [formData, handleChange]
  );

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md sm:p-6 p-4 flex ms:flex-row flex-col ms:gap-6 gap-2 ms:w-[1150px] ss:w-[600px] w-[360px] mx-auto overflow-y-auto ss:h-[740px] h-[650px]"
      id="container"
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
          {renderFormFields}
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
