import NavItem from "../molecules/NavItem";

function ShopRoutes() {
  return (
    <ul className="h-[calc(100%-68px)] flex flex-col justify-between gap-2 font-medium">
      <div className="flex flex-col">
        <NavItem to="/shop/dashboard" icon="MdDashboard" label="Dashboard" />
        <NavItem to="/shop/products" icon="AiFillProduct" label="Products" />
        <NavItem to="/shop/orders" icon="MdBorderColor" label="Orders" />
        <NavItem to="/shop/coupons" icon="RiCoupon3Fill" label="coupons" />
        <NavItem to="/shop/employees" icon="GrUserWorker" label="Employees" />
        <NavItem to="/shop/users" icon="FaUsers" label="Customers" />
      </div>
      <div>
        <NavItem to="/shop/user/profile" icon="FaUser" label="Profile" />
      </div>
    </ul>
  );
}

export default ShopRoutes;
