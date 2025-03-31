import LoadingIndicator from "../components/LoadingIndicator";
import { useState, useEffect, useCallback } from "react";
import animations from "../components/animation";
import { FaAnglesRight } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { motion } from "framer-motion";
import api from "../api";

// !Form field configuration
const formFields = [
  { id: "name", label: "Customer Name", type: "text", pattern: null },
  {
    id: "phone",
    label: "Customer Mobile No",
    type: "text",
    pattern: "\\d{10}",
  },
  { id: "email", label: "Customer Email", type: "email", pattern: null },
  { id: "address", label: "Customer Address", type: "text", pattern: null },
];

function Customer() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const initialFormState = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  const getCustomers = useCallback(async () => {
    setLoading(true);
    api
      .get("api/customers/")
      .then((res) => setCustomers(res.data))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isUpdating) {
        await api.put(`api/customers/${currentCustomerId}/`, formData);
        alert("Customer updated successfully!");
      } else {
        await api.post("api/customers/", formData);
        alert("Customer added successfully!");
      }
      await getCustomers();
      handleCancel();
    } catch {
      alert(`Failed to ${isUpdating ? "update" : "add"} customer!`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = useCallback(
    (id) => {
      const customer = customers.find((c) => c.id === id);
      if (customer) {
        setFormData(customer);
        setCurrentCustomerId(id);
        setIsUpdating(true);

        const containerElement = document.getElementById("container");
        containerElement?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [customers]
  );

  const handleCancel = useCallback(() => {
    setFormData(initialFormState);
    setCurrentCustomerId(null);
    setIsUpdating(false);
  }, []);

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
          {isUpdating ? "Update Customer" : "Add New Customer"}
          {isUpdating ? (
            <RxUpdate className="ss:text-4xl text-3xl" />
          ) : (
            <BsPeopleFill className="ss:text-4xl text-3xl" />
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUpdating ? "Update Customer" : "Add Customer"}
            </motion.button>
            {isUpdating && (
              <motion.button
                type="button"
                onClick={handleCancel}
                className="font-medium mt-2 px-4 py-2 text-slate-100 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          View Customers
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
              {customers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  className={`${
                    customer.id !== 1 ? "border-t-2 border-gray-300" : ""
                  } flex columns-4 h-[45px] w-full`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <div className="flex-[0.5] text-gray-700 text-center pt-2 border-r-2 border-gray-300">
                    {customer.id}
                  </div>
                  <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300">
                    {customer.name}
                  </div>
                  <div className="flex-1 text-gray-700 indent-3 pt-2 border-r-2 border-gray-300 truncate">
                    {customer.email}
                  </div>
                  <div className="flex-1 text-gray-700 text-center pt-2 flex items-center justify-center">
                    {customer.phone}
                    <motion.button
                      onClick={() => handleUpdate(customer.id)}
                      whileHover={{ scale: 1.2 }}
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

export default Customer;
