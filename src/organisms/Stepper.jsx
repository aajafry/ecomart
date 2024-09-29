/* eslint-disable react/prop-types */
import StepIndicator from "../molecules/StepIndicator";


function Stepper({steps, currentStep}) {
  return (
    <div className="w-[80%] mx-auto pt-14">
      <div className="flex items-center justify-between gap-4">
        {steps.map((step, index) => (
          <StepIndicator
            key={index}
            isActive={currentStep}
            stepNo={index + 1}
            stepName={step}
          />
        ))}
      </div>
    </div>
  );
}

export default Stepper