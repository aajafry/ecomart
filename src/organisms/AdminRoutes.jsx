import NavItem from "../molecules/NavItem";

function AdminRoutes() {
  return (
    <ul className="h-[calc(100%-68px)] flex flex-col justify-between gap-2 font-medium">
      <div className="flex flex-col">
        <NavItem to="/admin/dashboard" icon="MdDashboard" label="Dashboard" />
        <NavItem
          to="/admin/categories"
          icon="MdCategory"
          label="Categories"
        />
        <NavItem to="/admin/products" icon="AiFillProduct" label="Products" />
        <NavItem to="/admin/orders" icon="MdBorderColor" label="Orders" />
        <NavItem to="/admin/coupons" icon="FaUsers" label="coupons" />
        <NavItem to="/admin/shops" icon="FaShop" label="Shops" />
        <NavItem to="/admin/users" icon="FaUsers" label="Customers" />
        <NavItem
          to="/admin/employees"
          icon="GrUserWorker"
          label="Employees"
        />
      </div>
      <div>
        <NavItem to="/admin/user/profile" icon="FaUser" label="Profile" />
      </div>
    </ul>
  );
}

export default AdminRoutes;
