/* eslint-disable react/prop-types */
import Button from "../atoms/Button";

function ConfirmationButtons({
  isDisable,
  onConfirm,
  onClose,
  confirmLabel,
  confirmType,
}) {
  return (
    <div className="flex gap-4 justify-end">
      <Button
        type={confirmType}
        size="medium"
        label={isDisable ? "processing..." : confirmLabel}
        disabled={!!isDisable}
        onClick={onConfirm}
        className={`${
          isDisable
            ? "bg-rose-400 cursor-not-allowed"
            : "bg-rose-600 hover:bg-rose-700"
        } text-white`}
      />
      <Button
        type="button"
        size="medium"
        label="Cancel"
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 dark:bg-slate-800 dark:hover:bg-slate-900"
      />
    </div>
  );
}

export default ConfirmationButtons;
