import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ShopProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const { role } = jwtDecode(token);

      if (
        [
          "shop-admin",
          "shop-administrator",
          "shop-moderator",
          "shop-supervisor",
        ].includes(role)
      ) {
        return children;
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return <Navigate to="/shop/login" replace />;
}

ShopProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopProtectedRoute;
