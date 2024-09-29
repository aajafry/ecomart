import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  AdminCategories, 
  AdminCoupons, 
  AdminDashboard, // not done yet
  AdminEmployees, 
  AdminLogin, 
  AdminOrders, 
  AdminProducts, 
  AdminShops, 
  AdminUserProfile, 
  AdminUsers, 
  Carts, 
  Checkout, 
  CustomerProfile, 
  Home, 
  NotFound, 
  Product, 
  ShopCoupons, 
  ShopDashboard, // not done yet
  ShopEmployees, 
  ShopLogin, 
  ShopOrders, 
  ShopProducts, 
  ShopSignup, 
  ShopUserProfile, 
  ShopUsers, 
  UserLogin, 
  UserOrder, 
  UserOrders,
  UserSignup, 
  Wishlist, 
} from "./pages/index";

import Layout from "./templates/Layout";
import UserProtectedRoute from './templates/UserProtectedRoute';
import withAdminProtected from "./templates/withAdminProtected";
import withLayout from "./templates/withLayout";
import withShopProtected from "./templates/withShopProtected";
import withUserProtected from "./templates/withUserProtected";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* all admin route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={withAdminProtected(AdminDashboard)}
        />
        <Route
          path="/admin/categories"
          element={withAdminProtected(AdminCategories)}
        />
        <Route
          path="/admin/products"
          element={withAdminProtected(AdminProducts)}
        />
        <Route path="/admin/orders" element={withAdminProtected(AdminOrders)} />
        <Route path="/admin/shops" element={withAdminProtected(AdminShops)} />
        <Route
          path="/admin/coupons"
          element={withAdminProtected(AdminCoupons)}
        />
        <Route path="/admin/users" element={withAdminProtected(AdminUsers)} />
        <Route
          path="/admin/employees"
          element={withAdminProtected(AdminEmployees)}
        />
        <Route
          path="/admin/user/profile"
          element={withAdminProtected(AdminUserProfile)}
        />
        {/* all shop route */}
        <Route path="/shop/signup" element={<ShopSignup />} />
        <Route path="/shop/login" element={<ShopLogin />} />
        <Route
          path="/shop/dashboard"
          element={withShopProtected(ShopDashboard)}
        />
        <Route
          path="/shop/products"
          element={withShopProtected(ShopProducts)}
        />
        <Route path="/shop/orders" element={withShopProtected(ShopOrders)} />
        <Route path="/shop/coupons" element={withShopProtected(ShopCoupons)} />
        <Route path="/shop/users" element={withShopProtected(ShopUsers)} />
        <Route
          path="/shop/employees"
          element={withShopProtected(ShopEmployees)}
        />
        <Route
          path="/shop/user/profile"
          element={withShopProtected(ShopUserProfile)}
        />
        {/* all user route */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/user/profile"
          element={withUserProtected(CustomerProfile)}
        />
        <Route path="/user/orders" element={withUserProtected(UserOrders)} />
        <Route path="/user/order/:id" element={withUserProtected(UserOrder)} />
        {/* common route */}
        <Route path="/" element={withLayout(Home)} />
        <Route path="carts" element={withLayout(Carts)} />
        <Route path="wishlist" element={withLayout(Wishlist)} />
        <Route path="product/:id" element={withLayout(Product)} />
        <Route
          path="checkout"
          element={
            <UserProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </UserProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export { AppRoutes };

