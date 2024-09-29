import { useCallback, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { productColumns } from "../../config/productColumns";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import { useShops } from "../../hooks/useShops";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import PageHeader from "../../molecules/PageHeader";
import AddProductForm from "../../organisms/AddProductForm";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";
import EditProductForm from "../../organisms/EditProductForm";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT;
const CATEGORY_URL = import.meta.env.VITE_CATEGORY;
const SHOP_URL = import.meta.env.VITE_SHOP;

function AdminProducts() {
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const {
    products,
    setProducts,
    handleAddProduct,
    handleUpdateProduct,
  } = useProducts(PRODUCT_URL);

  const { categoriesName } = useCategories(CATEGORY_URL);
  const { shopsName } = useShops(SHOP_URL);

  const handleEditProduct = useCallback(
    (updatedProductId) => {
      setProductIdToEdit(updatedProductId);
      openVisibility("EDIT");
    },
    [openVisibility, setProductIdToEdit]
  );

  const handleDeleteProduct = useCallback(
    (id, name) => {
      setProductToDelete({ id, name });
      openVisibility("DELETE");
    },
    [openVisibility, setProductToDelete]
  );

  const columns = useMemo(
    () => productColumns(handleEditProduct, handleDeleteProduct),
    [handleDeleteProduct, handleEditProduct]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Add Product"
        isOpen={visibility.ADD}
        onClose={() => closeVisibility("ADD")}
      >
        <AddProductForm
          onClose={() => closeVisibility("ADD")}
          onAddProduct={handleAddProduct}
          categories={categoriesName}
          shops={shopsName}
        />
      </Modal>

      <Modal
        label="Edit Product"
        isOpen={visibility.EDIT}
        onClose={() => closeVisibility("EDIT")}
      >
        <EditProductForm
          onClose={() => closeVisibility("EDIT")}
          onUpdateProduct={handleUpdateProduct}
          productId={productIdToEdit}
          categories={categoriesName}
          shops={shopsName}
        />
      </Modal>

      <Dialog
        isOpen={visibility.DELETE}
        onClose={() => closeVisibility("DELETE")}
      >
        <DeleteConfirmation
          onClose={() => closeVisibility("DELETE")}
          itemToDelete={productToDelete}
          setItemToDelete={setProductToDelete}
          setItems={setProducts}
          itemName="Product"
          url={PRODUCT_URL}
        />
      </Dialog>

      <PageHeader
        heading="Products"
        btnLabel="Add Product"
        btnEvent={() => openVisibility("ADD")}
      />

      <TableGrid rows={products} columns={columns} />
    </div>
  );
}

export default AdminProducts;
