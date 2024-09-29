import { useCallback, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { shopColumns } from "../../config/shopColumns";
import { useShops } from "../../hooks/useShops";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import PageHeader from "../../molecules/PageHeader";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";

const SHOP_URL = import.meta.env.VITE_SHOP

function AdminShops() {
  const [shopToDelete, setShopToDelete] = useState(null);
  const { visibility, openVisibility, closeVisibility } = useVisibility();
  const { shops, setShops } = useShops(SHOP_URL);

  const handleDeleteShop = useCallback((id, name) => {
    setShopToDelete({ id, name });
    openVisibility("DELETE")
  }, [openVisibility, setShopToDelete]);

   const columns = useMemo(
     () => shopColumns(handleDeleteShop),
     [handleDeleteShop]
   );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Dialog
        isOpen={visibility.DELETE}
        onClose={() => closeVisibility("DELETE")}
      >
        <DeleteConfirmation
          onClose={() => closeVisibility("DELETE")}
          itemToDelete={shopToDelete}
          setItemToDelete={setShopToDelete}
          setItems={setShops}
          itemName="Shop"
          url={SHOP_URL}
        />
      </Dialog>
      

      <PageHeader heading="Orders" />

      <TableGrid rows={shops} columns={columns} />
    </div>
  );
}

export default AdminShops;
