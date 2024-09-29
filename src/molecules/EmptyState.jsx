/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../atoms/Button";

function EmptyState({ message, btnLabel }) {
  return (
    <div className="flex-center flex-col flex-1 h-full">
      <p className="text-sm text-gray-400">{message}</p>
      <Link to="/">
        <Button
          type="button"
          label={btnLabel}
          size="small"
          variant="Primary"
          className="mt-2"
        />
      </Link>
    </div>
  );
}

export default EmptyState;
