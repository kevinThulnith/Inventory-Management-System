import LoadingIndicator from "../components/LoadingIndicator";
import { useState, useEffect, useCallback } from "react";
import { FaAnglesRight, FaTruck } from "react-icons/fa6";
import animations from "../components/animation";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { motion } from "framer-motion";
import api from "../api";

// !Form field configuration
const formFields = [
  { id: "name", label: "Supplier Name", type: "text", pattern: null },
  {
    id: "phone",
    label: "Supplier Mobile No",
    type: "text",
    pattern: "\\d{10}",
  },
  { id: "email", label: "Supplier Email", type: "email", pattern: null },
  { id: "address", label: "Supplier Address", type: "text", pattern: null },
];

function Supplier() {
  const initialFormState = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [currentSupplierId, setCurrentSupplierId] = useState(null);

  const getSuppliers = useCallback(async () => {
    setLoading(true);
    api
      .get("api/suppliers/")
      .then((res) => setSuppliers(res.data))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = isUpdating ? "put" : "post";
      const url = isUpdating
        ? `api/suppliers/${currentSupplierId}/`
        : "api/suppliers/";
      await api[method](url, formData);
      alert(`Supplier ${isUpdating ? "updated" : "added"} successfully!`);
      getSuppliers();
      handleCancel();
    } catch {
      alert(`Failed to ${isUpdating ? "update" : "add"} supplier!`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = useCallback(
    (id) => {
      const supplier = suppliers.find((s) => s.id === id);
      if (supplier) {
        setFormData(supplier);
        setCurrentSupplierId(id);
        setIsUpdating(true);

        const containerElement = document.getElementById("container");
        containerElement?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [suppliers]
  );

  const handleCancel = () => {
    setFormData(initialFormState);
    setCurrentSupplierId(null);
    setIsUpdating(false);
  };

  const renderFormFields = () =>
    formFields.map(({ id, label, type, pattern }) => (
      <motion.div key={id} variants={animations.item}>
        <label className="block text-sm font-medium text-gray-600">
          {label}
        </label>
        <input
          required
          id={id}
          type={type}
          pattern={pattern}
          title={pattern ? "Please enter exactly 10 digits" : undefined}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={formData[id]}
          onChange={handleChange}
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>
    ));

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md sm:p-6 p-4 flex ms:flex-row flex-col ms:gap-6 gap-2 ms:w-[1150px] ss:w-[600px] w-[360px] mx-auto overflow-y-auto ms:h-[620px] h-[650px]"
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
          {isUpdating ? "Update Supplier" : "Add New Supplier"}
          {isUpdating ? (
            <RxUpdate className="ss:text-4xl text-3xl" />
          ) : (
            <FaTruck className="ss:text-4xl text-3xl" />
          )}
        </motion.h2>
        <motion.span
          className="text-sm text-gray-600 ms:ml-3"
          variants={animations.item}
        >
          Fill the form and submit.
        </motion.span>
        <motion.form
          className="xs:mt-6 mt-2 space-y-6 xs:p-4 p-2"
          onSubmit={handleSubmit}
          variants={animations.item}
        >
          {renderFormFields()}
          <motion.div className="flex gap-4" variants={animations.item}>
            <motion.button
              type="submit"
              className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {isUpdating ? "Update Supplier" : "Add Supplier"}
            </motion.button>
            {isUpdating && (
              <motion.button
                type="button"
                onClick={handleCancel}
                className="font-medium mt-2 px-4 py-2 text-slate-100 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </motion.button>
            )}
          </motion.div>
        </motion.form>
      </motion.div>

      <motion.div className="flex-1" variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3"
          variants={animations.item}
        >
          View Suppliers
          <IoMdList className="ss:text-4xl text-3xl" />
        </motion.h2>
        <motion.div style={{ overflowX: "auto" }} variants={animations.item}>
          <motion.div
            className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[500px]"
            variants={animations.item}
          >
            <div className="bg-blue-600 w-full h-[45px] rounded-t-xl flex columns-4">
              <div className="flex-[0.5] text-white text-center pt-3 border-r-2 border-white font-semibold">
                Id
              </div>
              <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
                Name
              </div>
              <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
                Email
              </div>
              <div className="flex-1 text-white text-center pt-3 font-semibold">
                Mobile
              </div>
            </div>
            <div className="w-full h-[455px] rounded-b-xl overflow-x-auto">
              {suppliers.map((supplier, index) => (
                <motion.div
                  className={`${
                    index !== 0 ? "border-t-2 border-gray-300" : ""
                  } flex columns-4 h-[45px] w-full`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-[0.5] text-gray-700 text-center pt-2 border-r-2 border-gray-300">
                    {supplier.id}
                  </div>
                  <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300">
                    {supplier.name}
                  </div>
                  <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300 truncate">
                    {supplier.email}
                  </div>
                  <div className="flex-1 text-gray-700 text-center pt-2 flex items-center justify-center">
                    {supplier.phone}
                    <motion.button
                      onClick={() => handleUpdate(supplier.id)}
                      whileTap={{ scale: 0.9 }}
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

export default Supplier;
