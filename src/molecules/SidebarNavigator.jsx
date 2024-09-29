import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { useSidebar } from "../contexts/SidebarContext";


function SidebarNavigator() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  return sidebarOpen ? (
    <RiMenuUnfold2Line
      size="24"
      title="close sidebar"
      aria-label="close sidebar"
      onClick={toggleSidebar}
      className="cursor-pointer text-amber-500"
    />
  ) : (
    <RiMenuFold2Line
      size="24"
      title="open sidebar"
      aria-label="open sidebar"
      onClick={toggleSidebar}
      className="cursor-pointer text-amber-500"
    />
  );
}

export default SidebarNavigator;
