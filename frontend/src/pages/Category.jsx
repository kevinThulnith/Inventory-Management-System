import LoadingIndicator from "../components/LoadingIndicator";
import { useState, useEffect, useCallback } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import animations from "../components/animation";
import { FaAnglesRight } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import api from "../api";

function Category() {
  const [formData, setFormData] = useState({ name: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const getCategories = useCallback(async () => {
    setLoading(true);
    api
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to fetch categories!"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setFormData({ name: value });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isUpdating) {
        await api.put(`api/categories/${currentCategoryId}/`, formData);
        alert("Category updated successfully!");
      } else {
        await api.post("api/categories/", formData);
        alert("Category added successfully!");
      }
      await getCategories();
      handleCancel();
    } catch {
      alert(`Failed to ${isUpdating ? "update" : "add"} category!`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = useCallback(
    (id) => {
      const category = categories.find((c) => c.id === id);
      if (category) {
        setFormData({ name: category.name });
        setCurrentCategoryId(id);
        setIsUpdating(true);
      }
    },
    [categories]
  );

  const handleCancel = useCallback(() => {
    setFormData({ name: "" });
    setCurrentCategoryId(null);
    setIsUpdating(false);
  }, []);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md sm:p-6 p-4 ss:w-[600px] w-[360px] mx-auto overflow-y-auto ms:h-[720px] h-[650px]"
      initial="hidden"
      animate="visible"
      variants={animations.container}
    >
      <motion.div variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3"
          variants={animations.item}
        >
          {isUpdating ? "Update Category" : "New Category"}
          {isUpdating ? (
            <RxUpdate className="ss:text-4xl text-3xl" />
          ) : (
            <TbCategoryFilled className="ss:text-3xl text-2xl" />
          )}
        </motion.h2>

        <motion.form
          className="ss:flex ss:col-span-2 ss:justify-between ss:mt-0 mt-3"
          onSubmit={handleSubmit}
          variants={animations.item}
        >
          <motion.input
            required
            id="name"
            type="text"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            className="mt-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ss:w-[300px] w-full"
            variants={animations.item}
          />
          <motion.div
            className="flex gap-2 ss:mt-0 mt-3"
            variants={animations.item}
          >
            <motion.button
              type="submit"
              className="font-medium mt-3 ss:px-4 py-2 px-4 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUpdating ? "Update" : "Add Category"}
              {isUpdating ? "" : <FaPlus className="ml-2" />}
            </motion.button>
            {isUpdating && (
              <motion.button
                type="button"
                onClick={handleCancel}
                className="font-medium mt-3 px-4 text-slate-100 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            )}
          </motion.div>
        </motion.form>
      </motion.div>

      <motion.div variants={animations.item}>
        <motion.h2
          className="ss:text-3xl text-2xl font-semibold text-gray-500 ms:p-3 flex items-center gap-3 mt-4"
          variants={animations.item}
        >
          View Categories
          <IoMdList className="ss:text-4xl text-3xl" />
        </motion.h2>

        <motion.div style={{ overflowX: "auto" }} variants={animations.item}>
          <motion.div
            className="bg-slate-100 mt-3 rounded-xl mx-auto w-[540px] h-[500px]"
            variants={animations.item}
          >
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
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="flex columns-4 h-[45px] border-b-2 border-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <div className="text-gray-700 text-center flex-1 pt-2 pl-2 border-r-2 border-gray-300">
                    {category.id}
                  </div>
                  <div className="text-gray-700 text-center flex-1 pt-2 pl-2 border-r-2 border-gray-300">
                    {category.name}
                  </div>
                  <div className="text-gray-700 flex-1 pt-1 pl-2 flex items-center justify-center">
                    {category.product_count}
                    <motion.button
                      onClick={() => handleUpdate(category.id)}
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

export default Category;
