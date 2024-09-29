/* eslint-disable react/prop-types */
import Heading from "../atoms/Heading";

function StepIndicator({ isActive, stepNo, stepName }) {
  return (
    <div
      className={`flex-1 py-6 pl-4 bg-gray-100 font-medium text-gray-500 border-t-2 ${
        isActive === stepNo ? "border-amber-300" : "border-gray-300"
      } transition-all duration-300 ease-linear`}
    >
      <Heading
        label={`Step ${stepNo}`}
        className={`${
          isActive === stepNo && "text-amber-500"
        } transition-all duration-300 ease-linear`}
      />
      <span className="text-sm capitalize">{stepName}</span>
    </div>
  );
}

export default StepIndicator;
