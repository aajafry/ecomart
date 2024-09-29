/* eslint-disable react/prop-types */
import { IoMdCloseCircleOutline } from "react-icons/io";
import Heading from "../atoms/Heading";

function Drawer({ label, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
        role="presentation"
        aria-label="Close menu"
      ></div>
      <div className="fixed top-0 right-0 h-dvh w-80 py-4 flex flex-col bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-300 dark:border-gray-600">
          <Heading label={label} size="text-lg" weight="font-medium" />

          <IoMdCloseCircleOutline
            size="26"
            title="Close drawer"
            aria-label="Close drawer"
            onClick={onClose}
            className="text-amber-500 cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Drawer