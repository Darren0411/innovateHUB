// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, roles = [] }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:9000/auth/me", { withCredentials: true })
      .then(res => {
        const user = res.data.user;
        if (roles.length === 0 || roles.includes(user.role)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      })
      .catch(() => setIsAllowed(false))
      .finally(() => setLoading(false));
  }, [roles]);

  if (loading) return <div>Loading...</div>;
  if (!isAllowed) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
