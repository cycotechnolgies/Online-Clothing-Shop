import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
