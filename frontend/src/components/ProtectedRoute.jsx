import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

// !This component is used to protect routes that require authentication.
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      setIsAuthorized(false); // No refresh token available
      return;
    }

    api
      .post("/api/token/refresh/", { refresh: refreshToken })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access); // !Update access token
          setIsAuthorized(true);
        } else setIsAuthorized(false);
      })
      .catch((error) => {
        console.log("Error refreshing token ", error); // !Error refreshing token
        setIsAuthorized(false);
      });
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Convert milliseconds to seconds

    if (tokenExpiration < now) await refreshToken(); // !Refresh token
    else setIsAuthorized(true); // !User is authorized
  };

  if (isAuthorized === null) return <div>Loading...</div>; // !Show loading state

  return isAuthorized ? children : <Navigate to="/login" />; // !Redirect to login page if not authorized
}

export default ProtectedRoute;
