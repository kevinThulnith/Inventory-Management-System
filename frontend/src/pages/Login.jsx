import LoadingIndicator from "../components/LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import api from "../api";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    api
      .post("api/token/", { username, password })
      .then((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="form-container w-[380px] bg-white rounded-lg shadow-md p-6 mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <h2 className="text-5xl font-semibold text-center text-gray-700 pt-3">
        Login
      </h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <motion.div className="mb-4" variants={sectionVariants}>
          <label
            htmlFor="username"
            className="block text-1xl font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </motion.div>
        <motion.div className="mb-4" variants={sectionVariants}>
          <label
            htmlFor="password"
            className="block text-1xl font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </motion.div>
        {loading && <LoadingIndicator />}
        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
      <p className="mt-5 text-1xl text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-blue-500 font-medium hover:text-blue-800"
        >
          Signup
        </a>
      </p>
    </motion.div>
  );
}

export default Login;
