import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const { role } = jwtDecode(token);

      if (role === "customer") {
        return children;
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return <Navigate to="/user/login" replace />;
}

UserProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtectedRoute;
