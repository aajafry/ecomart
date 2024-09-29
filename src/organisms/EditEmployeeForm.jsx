/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useUsers } from "../hooks/useUsers";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";
import Select from "../molecules/Select";

const EMPLOYEE_URL = import.meta.env.VITE_EMPLOYEE; 


function EditEmployeeForm({ onClose, onUpdateEmployee, getEmployeesUrl, employeeId, roles }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, getUsers, retrieveUser, updateUser } = useUsers();

  const loadEmployeeData = useCallback(async () => {
    const employee = await retrieveUser(EMPLOYEE_URL, employeeId);
    if(employee) {
      Object.keys(employee).forEach((key) => {
        setValue(key, employee[key]);
      });
    }
  }, [employeeId, retrieveUser, setValue]);

  useEffect(() => {
    loadEmployeeData();
  }, [loadEmployeeData]);


  const handleEditEmployeeWithForm = async (data) => {
    const updatedEmployee = await updateUser(EMPLOYEE_URL, employeeId, data);
    if(updatedEmployee) {
      onUpdateEmployee(updatedEmployee)
      reset();
      await getUsers(getEmployeesUrl);
      onClose();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditEmployeeWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <Input
        type="text"
        name="name"
        placeholder="enter employee name"
        required={false}
        register={register}
        errors={errors}
      />
      <Input
        type="email"
        name="email"
        placeholder="enter employee email"
        required={false}
        register={register}
        errors={errors}
      />

      <PasswordInput
        name="password"
        required={true}
        register={register}
        errors={errors}
      />

      <Select
        name="role"
        options={roles}
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Edit Employee"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default EditEmployeeForm;
