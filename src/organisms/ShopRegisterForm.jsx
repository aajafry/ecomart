import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";
import Textarea from "../molecules/Textarea";
import { createResource } from "../utilities/createResource";

const SHOP_URL = import.meta.env.VITE_SHOP;

function ShopRegisterForm() {
  const [isDisable, setIsDisable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleShopSignup = async (data) => {
    setIsDisable(true);
    try {
      const response = await createResource(`${SHOP_URL}/register`, data);
      
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/shop/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
    } finally {
      setIsDisable(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleShopSignup)}
      className="flex flex-col gap-4 mb-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="brand"
          placeholder="enter shop name"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="email"
          name="email"
          placeholder="enter shop email"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="tel"
          name="phone"
          placeholder="enter shop phone"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="userName"
          placeholder="enter user name"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="email"
          name="userEmail"
          placeholder="enter user email"
          required={true}
          register={register}
          errors={errors}
        />

        <PasswordInput
          name="userPassword"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="country"
          placeholder="enter shop country"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="state"
          placeholder="enter shop state"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="city"
          placeholder="enter shop city"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="zipCode"
          placeholder="enter shop zip code"
          required={true}
          register={register}
          errors={errors}
        />
      </div>

      <Input
        type="text"
        name="address"
        placeholder="enter shop address"
        required={true}
        register={register}
        errors={errors}
      />

      <Textarea
        name="overview"
        placeholder="enter product overview"
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Register"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default ShopRegisterForm;
