/* eslint-disable react/prop-types */
import Button from "../atoms/Button";
import { formatCurrency } from "../utilities/formatCurrency";

function CheckoutNavigation({ previous, currentStep, finalTotal, disabled }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        type="button"
        size="medium"
        variant="Primary"
        label="Previous"
        onClick={previous}
        className={`${
          (currentStep === 1 || currentStep === 4) && "opacity-0 invisible"
        }`}
      />

      <Button
        type="submit"
        size="medium"
        variant="Primary"
        label={currentStep === 3 ? `Pay ${formatCurrency(finalTotal)}` : "Next"}
        className={`${currentStep === 4 && "opacity-0 invisible"} ${
          disabled && "cursor-not-allowed animate-pulse"
        }`}
        aria-label={currentStep === 3 ? `pay ${finalTotal}` : "next"}
        disabled={disabled}
      />
    </div>
  );
}

export default CheckoutNavigation;
