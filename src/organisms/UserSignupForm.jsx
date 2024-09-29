import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useUsers } from "../hooks/useUsers";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";

const CUSTOMER_URL = import.meta.env.VITE_CUSTOMER;

function UserSignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const {isDisable, createUser } = useUsers();

  const handleUserSignupWithForm = async (data) => {
    const user = await createUser(`${CUSTOMER_URL}/signup`, data);
    if (user) {
      reset();
      navigate("/user/login");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUserSignupWithForm)}
      className="flex flex-col gap-4 mb-2"
    >
      <Input
        type="text"
        name="name"
        placeholder="enter your name"
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        type="email"
        name="email"
        placeholder="enter your email"
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

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "signup"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default UserSignupForm;
