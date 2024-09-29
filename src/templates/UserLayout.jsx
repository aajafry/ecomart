import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { useSidebar } from "../contexts/SidebarContext";
import AdminFooter from "../organisms/AdminFooter";
import AdminHeader from "../organisms/AdminHeader";
import SettingDrawer from "../organisms/SettingDrawer";
import UserRoutes from "../organisms/UserRoutes";
import LeftSidebar from "../molecules/LeftSidebar";

function UserLayout({ children }) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openSettings ? "hidden" : "auto";
  }, [openSettings]);

  return (
    <div className="relative">
      <LeftSidebar
        openSidebar={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      >
        <UserRoutes />
      </LeftSidebar>

      <div
        className={` ${
          sidebarOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-0 w-full"
        } relative transition-all duration-200 ease-linear`}
      >
        <AdminHeader navigateUrl="/user/login" />

        <div className="pt-[48px] bg-[f5f5f5] dark:bg-slate-800 dark:text-gray-200 min-h-dvh h-full flex flex-col">
          <main className="p-4 flex-1 relative">
            {openSettings && (
              <SettingDrawer onClose={() => setOpenSettings(false)} />
            )}
            {children}
            <IoMdSettings
              size="32"
              className="text-amber-500 cursor-pointer fixed bottom-4 right-4 z-50"
              title="Settings"
              onClick={() => setOpenSettings(true)}
            />
          </main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
