import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const { role } = jwtDecode(token);

      if (
        ["admin", "administrator", "moderator", "supervisor"].includes(role)
      ) {
        return children;
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return <Navigate to="/admin/login" replace />;
}

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtectedRoute;
