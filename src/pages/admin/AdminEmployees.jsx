import { jwtDecode } from "jwt-decode";
import { useCallback, useMemo, useState, useEffect } from "react";
import TableGrid from "../../atoms/TableGrid";
import { employeeColumns } from "../../config/employeeColumns";
import { useUsers } from "../../hooks/useUsers";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import AddEmployeeForm from "../../organisms/AddEmployeeForm";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";
import EditEmployeeForm from "../../organisms/EditEmployeeForm";
import PageHeader from "../../molecules/PageHeader";

const EMPLOYEE_URL = import.meta.env.VITE_EMPLOYEE;

function AdminEmployees() {
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const roles = ["admin", "administrator", "moderator", "supervisor"];

  const decoded = jwtDecode(localStorage.getItem("token"));
  const companyEmployeesUrl = `${EMPLOYEE_URL}/provider/${decoded.companyId}`;

  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const { users, setUsers, getUsers, handleAddUser, handleUpdateUser } =
    useUsers();

    useEffect(() => {
      getUsers(companyEmployeesUrl);
    }, [companyEmployeesUrl, getUsers])

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
          getEmployeesUrl={companyEmployeesUrl}
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
          getEmployeesUrl={companyEmployeesUrl}
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

export default AdminEmployees;