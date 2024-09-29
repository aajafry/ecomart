import NavItem from "../molecules/NavItem";

function UserRoutes() {
  return (
    <ul className="h-[calc(100%-68px)] flex flex-col justify-between gap-2 font-medium">
      <div className="flex flex-col">
        <NavItem to="/user/orders" icon="MdBorderColor" label="Orders" />
      </div>
      <div>
        <NavItem to="/user/profile" icon="FaUser" label="Profile" />
      </div>
    </ul>
  );
}

export default UserRoutes;