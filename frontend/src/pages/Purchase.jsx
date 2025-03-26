import LoadingIndicator from "../components/LoadingIndicator";
import { BiSolidPurchaseTag } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import api from "../api";

function Purchase() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [purchases, setPurchases] = useState([]);

  const getPurchases = async () => {
    setLoading(true);
    api
      .get("api/purchases/")
      .then((res) => setPurchases(res.data))
      .catch(() => alert("Failed to fetch purchases!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("api/suppliers/")
      .then((res) => setSuppliers(res.data))
      .catch(() => alert("Failed to fetch suppliers!"))
      .finally(() => setLoading(false));

    api
      .get("api/products/")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to fetch products!"))
      .finally(() => setLoading(false));

    getPurchases();
  }, []);

  const handleAddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productId: "", amount: "", price: 0 },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index][field] = value;

    if (field === "productId") {
      const product = products.find((prod) => prod.id === parseInt(value));
      updatedProducts[index].price = product ? product.costPrice : 0;
    }

    setSelectedProducts(updatedProducts);
    calculateSubtotal(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
    calculateSubtotal(updatedProducts);
  };

  const calculateSubtotal = (products) => {
    const total = products.reduce((sum, product) => {
      return sum + product.price * product.amount;
    }, 0);
    setSubtotal(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create purchase
      const {
        data: { id: purchaseId },
      } = await api.post("api/purchases/", { supplier: selectedSupplier });

      // Add products to purchase
      await Promise.all(
        selectedProducts.map(({ productId, amount }) =>
          api.post("api/purchases/items/", {
            purchase: purchaseId,
            product: productId,
            quantity: amount,
          })
        )
      );

      alert("Purchase created successfully!");
      setSelectedProducts([]);
      setSubtotal(0);
      setSelectedSupplier("");
      getPurchases();
    } catch {
      alert("Failed to create purchase!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex columns-2 gap-6">
      <div className="md:w-[550px] h-[670px]">
        <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
          Add Purchase
          <BiSolidPurchaseTag />
        </h2>
        <span className="text-sm text-gray-600 ml-3">
          Fill in the form to add a purchase
        </span>
        <form className="mt-6 space-y-6 p-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="supplier"
              className="block text-sm font-medium text-gray-600"
            >
              Select Supplier
            </label>
            <div className="relative">
              <select
                required
                id="supplier"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none appearance-none pr-8 cursor-pointer"
                style={{ backgroundPosition: "right 12px center" }}
              >
                <option value="" className="text-gray-500">
                  Select a supplier
                </option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.id}
                    value={supplier.id}
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    {supplier.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaChevronDown />
              </div>
            </div>
          </div>
          <h3 className="block text-sm font-medium text-gray-600">
            Selected Products
          </h3>
          <div className="bg-gray-100 w-[539px] h-[250px] overflow-x-auto rounded-lg p-3">
            {selectedProducts.map((product, index) => (
              <div key={index} className="flex gap-2 mb-4">
                <select
                  required
                  value={product.productId}
                  onChange={(e) =>
                    handleProductChange(index, "productId", e.target.value)
                  }
                  className="bg-slate-50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select a product
                  </option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="number"
                  placeholder="Amount"
                  value={product.amount}
                  onChange={(e) =>
                    handleProductChange(index, "amount", e.target.value)
                  }
                  className="block w-[100px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
                <span className="block w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                  {product.price}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  <FaTrashCan />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="mb-4">
              <span className="text-base">Subtotal: {subtotal}</span>
            </div>
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-700 text-white rounded-md mb-4 flex columns-2 items-center"
            >
              Add Product <FaPlus className="ml-2" />
            </button>
          </div>
          <button
            type="submit"
            className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Submit Purchase
          </button>
        </form>
      </div>
      <div className="md:w-[550px]">
        <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
          View Sales <IoMdList />
        </h2>
        <div className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[590px]">
          <div className="bg-blue-600 w-full h-[45px] rounded-t-xl flex columns-4">
            <div className="flex-[0.5] text-white text-center pt-3 border-r-2 border-white font-semibold">
              Id
            </div>
            <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
              Supplier
            </div>
            <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
              Date
            </div>
            <div className="flex-1 text-white text-center pt-3 font-semibold">
              Total (Rs)
            </div>
          </div>
          <div className="w-full h-[544px] rounded-b-xl overflow-x-auto">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className={`${
                  purchase.id !== 1 ? "border-t-2 border-gray-300" : ""
                } flex columns-4 h-[45px] w-full`}
              >
                <div className="flex-[0.5] text-gray-700 text-center pt-2 border-r-2 border-gray-300">
                  {purchase.id}
                </div>
                <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300">
                  {purchase.supplier_name}
                </div>
                <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300 truncate">
                  {new Date(purchase.created_at).toLocaleDateString()}
                </div>
                <div className="flex-1 text-gray-700 text-center pt-2">
                  {purchase.total}
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

export default Purchase;
