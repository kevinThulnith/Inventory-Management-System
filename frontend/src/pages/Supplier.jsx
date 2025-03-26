import LoadingIndicator from "../components/LoadingIndicator";
import { FaAnglesRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import api from "../api";

function Supplier() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentSupplierId, setCurrentSupplierId] = useState(null);

  const getSuppliers = () => {
    setLoading(true);
    api
      .get("api/suppliers/")
      .then((res) => setSuppliers(res.data))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const supplierData = { name, phone, email, address };

    if (isUpdating) {
      api
        .put(`api/suppliers/${currentSupplierId}/`, supplierData)
        .then(() => {
          alert("Supplier updated successfully!");
          getSuppliers();
          handleCancel();
        })
        .catch(() => alert("Failed to update supplier!"))
        .finally(() => setLoading(false));
    } else {
      api
        .post("api/suppliers/", supplierData)
        .then(() => {
          alert("Supplier added successfully!");
          getSuppliers();
          handleCancel();
        })
        .catch(() => alert("Failed to add supplier!"))
        .finally(() => setLoading(false));
    }
  };

  const handleUpdate = (id) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    if (supplier) {
      setName(supplier.name);
      setPhone(supplier.phone);
      setEmail(supplier.email);
      setAddress(supplier.address);
      setCurrentSupplierId(id);
      setIsUpdating(true);
    }
  };

  const handleCancel = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCurrentSupplierId(null);
    setIsUpdating(false);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-mg flex columns-2 gap-6">
        <div className="md:w-[550px] h-[600px]">
          <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
            {isUpdating ? "Update Supplier" : "Add New Supplier"}
            {isUpdating ? <RxUpdate /> : <FaTruck />}
          </h2>
          <span className="text-sm text-gray-600 ml-3">
            Fill the form and submit.
          </span>
          <form className="mt-6 space-y-6 p-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Supplier Name
              </label>
              <input
                required
                id="name"
                type="text"
                placeholder="Enter supplier name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Supplier Mobile No
              </label>
              <input
                required
                id="phone"
                type="text"
                placeholder="Enter supplier mobile no"
                pattern="\d{10}"
                title="Please enter exactly 10 digits"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Supplier Email
              </label>
              <input
                required
                id="email"
                type="email"
                placeholder="Enter supplier email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Supplier Address
              </label>
              <input
                required
                id="address"
                type="text"
                placeholder="Enter supplier address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                {isUpdating ? "Update Supplier" : "Add Supplier"}
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
            View Suppliers
            <IoMdList />
          </h2>
          <div className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[500px]">
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
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className={`${
                    supplier.id !== 1 ? "border-t-2 border-gray-300" : ""
                  } flex columns-4 h-[45px] w-full`}
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
                  <div className="flex-1 text-gray-700 text-center pt-2">
                    {supplier.phone}
                    <button onClick={() => handleUpdate(supplier.id)}>
                      <FaAnglesRight className="ml-3 text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
}

export default Supplier;
