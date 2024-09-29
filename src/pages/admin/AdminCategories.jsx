import { useCallback, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { categoryColumns } from "../../config/categoryColumns";
import { useCategories } from "../../hooks/useCategories";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import PageHeader from "../../molecules/PageHeader";
import AddCategoryForm from "../../organisms/AddCategoryForm";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";
import EditCategoryForm from "../../organisms/EditCategoryForm";

const CATEGORY_URL = import.meta.env.VITE_CATEGORY;

function AdminCategories() {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);
  
  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const {
    categories,
    setCategories,
    handleAddCategory,
    handleUpdateCategory,
  } = useCategories(CATEGORY_URL);

  const handleEditCategory = useCallback((updatedCategoryId) => {
    setCategoryIdToEdit(updatedCategoryId);
    openVisibility("EDIT");
  }, [openVisibility, setCategoryIdToEdit]);

  const handleDeleteCategory = useCallback((id, name) => {
    setCategoryToDelete({ id, name });
    openVisibility("DELETE");
  }, [openVisibility, setCategoryToDelete]);

  const columns = useMemo(
    () => categoryColumns(handleEditCategory, handleDeleteCategory),
    [handleEditCategory, handleDeleteCategory]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Add Category"
        isOpen={visibility.ADD}
        onClose={() => closeVisibility("ADD")}
      >
        <AddCategoryForm
          onClose={() => closeVisibility("ADD")}
          onAddCategory={handleAddCategory}
        />
      </Modal>

      <Modal
        label="Edit Category"
        isOpen={visibility.EDIT}
        onClose={() => closeVisibility("EDIT")}
      >
        <EditCategoryForm
          onClose={() => closeVisibility("EDIT")}
          onUpdateCategory={handleUpdateCategory}
          categoryId={categoryIdToEdit}
        />
      </Modal>

      <Dialog
        isOpen={visibility.DELETE}
        onClose={() => closeVisibility("DELETE")}
      >
        <DeleteConfirmation
          onClose={() => closeVisibility("DELETE")}
          itemToDelete={categoryToDelete}
          setItemToDelete={setCategoryToDelete}
          setItems={setCategories}
          itemName="Category"
          url={CATEGORY_URL}
        />
      </Dialog>

      <PageHeader
        heading="Categories"
        btnLabel="Add Category"
        btnEvent={() => openVisibility("ADD")}
      />

      <TableGrid rows={categories} columns={columns} />
    </div>
  );
}

export default AdminCategories;