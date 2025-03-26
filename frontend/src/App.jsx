import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Customer from "./pages/Customer";
import Supplier from "./pages/Supplier";
import Category from "./pages/Category";
import Purchase from "./pages/Purchase";
import Product from "./pages/Product";
import Logout from "./pages/Logout";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Home from "./pages/Home";
import api from "./api";

// !App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get("api/user/")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => console.log("Checked authentication status"));
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Supplier"
          element={
            <ProtectedRoute>
              <Supplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Purchase"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
