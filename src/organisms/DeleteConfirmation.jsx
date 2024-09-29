/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationButtons from "../molecules/ConfirmationButtons";
import { deleteResource } from "../utilities/deleteResource";
import { getToken } from "../utilities/getToken";

function DeleteConfirmation({
  onClose,
  itemToDelete,
  setItemToDelete,
  setItems,
  itemName,
  url,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    const token = getToken();
    try {
      const response = await deleteResource(`${url}/${itemToDelete.id}`, token);
      
      if (response.status === 200) {
        toast.success(response.data.message);
        setItems((prev) => prev.filter((item) => item._id !== itemToDelete.id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`An error occurred while deleting the ${itemName}.`);
    } finally {
      setIsDeleting(false);
      onClose();
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-6">
        Are you sure you want to delete the {itemName} &ldquo;
        <span className="font-semibold">{itemToDelete?.name}</span>
        &rdquo;?
      </p>

      <ConfirmationButtons
        isDisable={isDeleting}
        onConfirm={handleDelete}
        onClose={onClose}
        confirmLabel="Delete"
        confirmType="button"
      />
    </div>
  );
}

export default DeleteConfirmation