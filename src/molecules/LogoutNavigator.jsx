/* eslint-disable react/prop-types */
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutNavigator({ navigateUrl }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(navigateUrl, { replace: true });
    toast.success("successfully logged out");
  };

  return (
    <MdOutlineLogout
      size="24"
      className="cursor-pointer text-amber-500"
      onClick={handleLogout}
      title="Logout"
      aria-label="Logout"
    />
  );
}

export default LogoutNavigator;
