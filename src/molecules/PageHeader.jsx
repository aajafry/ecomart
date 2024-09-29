/* eslint-disable react/prop-types */
import { IoBagSharp } from "react-icons/io5";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";

const Icons = {
  IoBagSharp,
};

function PageHeader({ heading, headingIcon = null, btnLabel, btnEvent }) {
  const Icon = Icons[headingIcon];

  return (
    <div className="mb-2 flex items-center justify-between">
      <Heading
        size="text-lg"
        label={
          <div className="inline-flex gap-2 items-center">
            {Icon && (
              <Icon size="20" className="cursor-pointer text-amber-500" />
            )}
            {heading}
          </div>
        }
      />
      {btnLabel && (
        <Button
          type="button"
          size="small"
          variant="Primary"
          label={btnLabel}
          onClick={btnEvent}
        />
      )}
    </div>
  );
}

export default PageHeader;
