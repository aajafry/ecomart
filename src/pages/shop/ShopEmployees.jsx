import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { employeeColumns } from "../../config/employeeColumns";
import { useUsers } from "../../hooks/useUsers";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import PageHeader from "../../molecules/PageHeader";
import AddEmployeeForm from "../../organisms/AddEmployeeForm";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";
import EditEmployeeForm from "../../organisms/EditEmployeeForm";

const EMPLOYEE_URL = import.meta.env.VITE_EMPLOYEE;

function ShopEmployees() {
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const roles = [
    "shop-admin",
    "shop-administrator",
    "shop-moderator",
    "shop-supervisor",
  ];

  const decoded = jwtDecode(localStorage.getItem("token"));
  const shopEmployeesUrl = `${EMPLOYEE_URL}/provider/${decoded.shopId}`;

  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const {
    users,
    setUsers,
    getUsers,
    handleAddUser,
    handleUpdateUser,
  } = useUsers();

  useEffect(() => {
    getUsers(shopEmployeesUrl)
  }, [getUsers, shopEmployeesUrl])

  const handleEditEmployee = useCallback(
    (updatedEmployeeId) => {
      setEmployeeIdToEdit(updatedEmployeeId);
      openVisibility("EDIT");
    },
    [openVisibility]
  );

  const handleDeleteEmployee = useCallback(
    (id, name) => {
      setEmployeeToDelete({ id, name });
      openVisibility("DELETE");
    },
    [openVisibility]
  );

  const columns = useMemo(
    () => employeeColumns(handleEditEmployee, handleDeleteEmployee),
    [handleEditEmployee, handleDeleteEmployee]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Add Employee"
        isOpen={visibility.ADD}
        onClose={() => closeVisibility("ADD")}
      >
        <AddEmployeeForm
          onClose={() => closeVisibility("ADD")}
          onAddEmployee={handleAddUser}
          getEmployeesUrl={shopEmployeesUrl}
          roles={roles}
        />
      </Modal>

      <Modal
        label="Edit Employee"
        isOpen={visibility.EDIT}
        onClose={() => closeVisibility("EDIT")}
      >
        <EditEmployeeForm
          onClose={() => closeVisibility("EDIT")}
          onUpdateEmployee={handleUpdateUser}
          getEmployeesUrl={shopEmployeesUrl}
          employeeId={employeeIdToEdit}
          roles={roles}
        />
      </Modal>

      <Dialog
        isOpen={visibility.DELETE}
        onClose={() => closeVisibility("DELETE")}
      >
        <DeleteConfirmation
          onClose={() => closeVisibility("DELETE")}
          itemToDelete={employeeToDelete}
          setItemToDelete={setEmployeeToDelete}
          setItems={setUsers}
          itemName="Employee"
          url={EMPLOYEE_URL}
        />
      </Dialog>
      
      <PageHeader 
        heading="Employees" 
        btnLabel="Add Employee" 
        btnEvent={() => openVisibility("ADD")} 
      />

      <TableGrid rows={users} columns={columns} />
    </div>
  );
}

export default ShopEmployees;
