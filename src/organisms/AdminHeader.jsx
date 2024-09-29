/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Heading from "../atoms/Heading";
import { useSidebar } from "../contexts/SidebarContext";
import LogoutNavigator from "../molecules/LogoutNavigator";
import SidebarNavigator from "../molecules/SidebarNavigator";
import ThemeNavigator from "../molecules/ThemeNavigator";
import UserAvater from "../molecules/UserAvater";


function AdminHeader({ navigateUrl }) {
  const { sidebarOpen } = useSidebar();

  return (
    <header
      className={`px-4 py-2 fixed z-10 ${
        sidebarOpen ? "w-[calc(100%-16rem)]" : "w-full"
      } flex items-center justify-between bg-white dark:bg-slate-900 dark:text-gray-300 transition-all duration-200 ease-linear`}
    >
      <div className="flex items-center gap-4">
        <SidebarNavigator />
        <Heading
          label={<Link to="/">ecomart</Link>}
          size="text-xl"
          weight="font-medium"
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-3">
        <ThemeNavigator />
        <UserAvater size="small" />
        <LogoutNavigator navigateUrl={navigateUrl} />
      </div>
    </header>
  );
}



export default AdminHeader;
