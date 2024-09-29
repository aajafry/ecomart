/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";
import { createResource } from "../utilities/createResource";

function LoginForm({postUrl, navigateUrl}) {
  const [isDisable, setIsDisable] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsDisable(true);
    try {
      const response = await createResource(`${postUrl}/login`, data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate(`${navigateUrl}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setIsDisable(false);
      reset();
    }
    reset();
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 mb-2"
      >
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
          label={isDisable ? "processing..." : "Login"}
          disabled={!!isDisable}
          className={`${isDisable && "cursor-not-allowed"}`}
        />
      </form>
    </div>
  );
}

export default LoginForm;
