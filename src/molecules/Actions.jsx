/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function Actions({ params, onEdit, onDelete, onPreview }) {
  return (
    <div className="h-full flex items-center gap-3 cursor-pointer">
      {onPreview && (
        <IoEye
          size="22"
          key={`${params.id}-preview`}
          onClick={onPreview}
          title="preview"
          aria-label="preview"
        />
      )}
      {onEdit && (
        <FaEdit
          size="22"
          key={`${params.id}-edit`}
          onClick={onEdit}
          title="edit"
          aria-label="edit"
        />
      )}
      {onDelete && (
        <MdDelete
          size="22"
          key={`${params.id}-delete`}
          onClick={onDelete}
          title="delete"
          aria-label="delete"
        />
      )}
    </div>
  );
}

export default Actions