import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Spinner from "../../ui/Spinner";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  if (isAuthenticated === null) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
