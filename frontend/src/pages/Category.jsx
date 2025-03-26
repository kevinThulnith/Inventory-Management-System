import LoadingIndicator from "../components/LoadingIndicator";
import { TbCategoryFilled } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import api from "../api";

function Category() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // TODO: Fetch categories from the backend
  const getCategories = () => {
    setLoading(true);
    api
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to fetch categories!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const categoryData = { name };

    // ! If updating, send a PUT request to the backend
    if (isUpdating) {
      api
        .put(`api/categories/${currentCategoryId}/`, categoryData)
        .then(() => {
          alert("Category updated successfully!");
          getCategories();
          handleCancel();
        })
        .catch(() => alert("Failed to update category!"))
        .finally(() => setLoading(false));
    } else {
      // ! If not updating, send a POST request to the backend
      api
        .post("api/categories/", categoryData)
        .then(() => {
          alert("Category added successfully!");
          getCategories();
          handleCancel();
        })
        .catch(() => alert("Failed to add category!"))
        .finally(() => setLoading(false));
    }
  };

  const handleUpdate = (id) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      setName(category.name);
      setCurrentCategoryId(id);
      setIsUpdating(true);
    }
  };

  const handleCancel = () => {
    setName("");
    setCurrentCategoryId(null);
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[700px]">
      <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3">
        {isUpdating ? "Update Category" : "New Category"}
        {isUpdating ? <RxUpdate /> : <TbCategoryFilled />}
      </h2>
      <form className="flex col-span-2 justify-between" onSubmit={handleSubmit}>
        <input
          required
          id="name"
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none w-[300px]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="font-medium mt-3 px-4 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center gap-1"
          >
            {isUpdating ? "Update Category" : "Add Category"}{" "}
            {isUpdating ? "" : <FaPlus />}
          </button>
          {isUpdating && (
            <button
              type="button"
              onClick={handleCancel}
              className="font-medium mt-3 px-4 text-slate-100 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h2 className="text-3xl font-semibold text-gray-500 p-3 flex items-center gap-3 mt-7 mb-7">
        View Categories
        <IoMdList />
      </h2>
      <div className="bg-slate-100 mt-3 rounded-xl mx-auto w-[600px] h-[500px]">
        <div className="bg-blue-600 w-full h-[45px] rounded-t-xl flex columns-4">
          <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
            Id
          </div>
          <div className="flex-1 text-white text-center pt-3 border-r-2 border-white font-semibold">
            Name
          </div>
          <div className="flex-1 text-white text-center pt-3 font-semibold">
            Products
          </div>
        </div>
        <div className="w-full h-[455px] rounded-b-xl overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex columns-4 h-[45px] border-b-2 border-gray-300"
            >
              <div className="text-gray-700 text-center flex-1 pt-2 pl-2 border-r-2 border-gray-300">
                {category.id}
              </div>
              <div className="text-gray-700 text-center flex-1 pt-2 pl-2 border-r-2 border-gray-300">
                {category.name}
              </div>
              <div className="text-gray-700 flex-1 pt-1 pl-2 flex items-center justify-center">
                {category.product_count}
                <button onClick={() => handleUpdate(category.id)}>
                  <FaAnglesRight className="ml-3 text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
}

export default Category;
