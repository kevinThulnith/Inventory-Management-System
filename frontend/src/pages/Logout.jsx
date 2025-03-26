import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/api/token/blacklist/", {
          refresh: localStorage.getItem("refresh"),
        });
        localStorage.clear();
        window.location.reload();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return null;
}

export default Logout;
