import LoadingIndicator from "../components/LoadingIndicator";
import { FaAnglesRight } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { IoMdList } from "react-icons/io";
import api from "../api";

function Product() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
    <div className="bg-white p-6 rounded-lg shadow-mg flex columns-2 gap-6">
      <div className="md:w-[550px] h-[700px]">
        <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
          {isUpdating ? "Update Product" : "Add New Product"}
          {isUpdating ? <RxUpdate /> : <AiFillProduct />}
        </h2>
        <span className="text-sm text-gray-600 ml-3">
          Fill the form and submit.
        </span>
        <form className="mt-6 space-y-6 p-4" onSubmit={handleSubmit}>
          <div>
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
          </div>
          <div className="flex col-span-2 gap-4">
            <div>
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
            </div>
            <div>
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-medium text-gray-600"
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
            </div>
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div
            className={`${
              isUpdating ? "flex columns-2 gap-4 justify-between" : ""
            }`}
          >
            <div>
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
            </div>
            {isUpdating && (
              <div>
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
              </div>
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
        </form>
      </div>
      <div className="md:w-[550px]">
        <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
          View Products
          <IoMdList />
        </h2>
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
                <div className="flex-[0.8] text-gray-700 text-center pt-2">
                  {product.stockQuantity}
                  <button onClick={() => handleUpdate(product.id)}>
                    <FaAnglesRight className="ml-3 text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
}

export default Product;
