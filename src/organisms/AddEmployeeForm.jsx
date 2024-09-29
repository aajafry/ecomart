/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useUsers } from "../hooks/useUsers";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";
import Select from "../molecules/Select";

const EMPLOYEE_URL = import.meta.env.VITE_EMPLOYEE;

function AddEmployeeForm({ onClose, onAddEmployee, getEmployeesUrl, roles }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isDisable, getUsers, createUser } = useUsers();

  const handleAddEmployeeWithForm = async (data) => {
    const newEmployee = await createUser(`${EMPLOYEE_URL}/create`, data);
    if (newEmployee) {
      onAddEmployee(newEmployee);
      reset();
      await getUsers(getEmployeesUrl);
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddEmployeeWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <Input
        type="text"
        name="name"
        placeholder="enter employee name"
        required={true}
        register={register}
        errors={errors}
      />

      <Input
        type="email"
        name="email"
        placeholder="enter employee email"
        required={true}
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
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "Uploading..." : "Add Employee"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default AddEmployeeForm;
