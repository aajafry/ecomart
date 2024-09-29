/* eslint-disable react/prop-types */
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";

function Modal({ label, isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-gray-900 dark:bg-slate-800 opacity-50 transition-opacity duration-300"
      ></div>
      <div className="flex items-center justify-center h-full">
        <div className="relative w-full max-h-[90%] overflow-y-auto max-w-md p-6 bg-white rounded-md dark:bg-slate-700">
          <div className="flex items-center justify-between">
            <Heading
              label={label}
              size="text-lg"
              weight="font-bold"
              color="text-gray-800 dark:text-gray-200"
            />

            <Button
              type="button"
              label="&times;"
              onClick={onClose}
              className="!text-2xl !p-0 font-bold text-gray-700 dark:text-gray-300"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal