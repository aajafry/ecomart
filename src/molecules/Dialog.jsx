/* eslint-disable react/prop-types */

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-gray-900 dark:bg-slate-800 opacity-50 transition-opacity duration-300"
      ></div>
      <div className="flex-center h-full">
        <div className="relative w-full max-w-md p-6 bg-white rounded-md dark:bg-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dialog