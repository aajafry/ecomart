import { useCallback, useEffect, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { customersColumns } from "../../config/customersColumns";
import { useUsers } from "../../hooks/useUsers";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import PageHeader from "../../molecules/PageHeader";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";

const CUSTOMER_URL = import.meta.env.VITE_CUSTOMER;

function AdminUsers() {
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();
  
  const {
    users,
    setUsers,
    getUsers
  } = useUsers();

  useEffect(() => {
    getUsers(CUSTOMER_URL);
  }, [getUsers]);

  const handleDeleteCustomer = useCallback((id, name) => {
    setCustomerToDelete({ id, name });
    openVisibility("EDIT");
  }, [openVisibility]);


  const columns = useMemo(
    () => customersColumns(handleDeleteCustomer),
    [handleDeleteCustomer]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Dialog isOpen={visibility.EDIT} onClose={() => closeVisibility("EDIT")}>
        <DeleteConfirmation
          onClose={() => closeVisibility("EDIT")}
          itemToDelete={customerToDelete}
          setItemToDelete={setCustomerToDelete}
          setItems={setUsers}
          itemName="Customer"
          url={CUSTOMER_URL}
        />
      </Dialog>

      <PageHeader heading="Customers" />
      <TableGrid rows={users} columns={columns} />
    </div>
  );
}

export default AdminUsers;
