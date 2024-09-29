/* eslint-disable react/prop-types */
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Heading from "../atoms/Heading";

function LeftSidebar({ openSidebar, closeSidebar, children }) {
  return (
    <aside
      className={`h-dvh ${
        openSidebar ? "w-64" : "w-0"
      }  pb-4 fixed top-0 left-0 overflow-y-auto bg-white dark:bg-slate-900 dark:text-gray-300 transition-all duration-200 ease-linear`}
    >
      <div className="my-4 px-4 flex justify-between items-center">
        <Heading
          label={<Link to="/">echomart</Link>}
          size="text-xl"
          weight="font-medium"
          className="cursor-pointer"
        />
        <IoMdCloseCircleOutline
          size="26"
          onClick={closeSidebar}
          title="Close sidebar"
          aria-label="Close sidebar"
          className="text-amber-500 cursor-pointer md:hidden"
        />
      </div>
      {children}
    </aside>
  );
}

export default LeftSidebar