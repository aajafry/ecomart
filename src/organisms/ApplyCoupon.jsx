import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useCart } from "../contexts/CartContext";
import Input from "../molecules/Input";

function ApplyCoupon() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { applyCoupon } = useCart();

  const handleCoupon = async (data) => {
    await applyCoupon(data?.code)
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleCoupon)}
      className="w-full sm:w-auto flex items-center justify-between gap-4"
    >
      <Input
        type="text"
        name="code"
        placeholder="enter coupon code"
        required={true}
        register={register}
        errors={errors}
        className="py-2 px-3 w-full sm:w-64 rounded-lg bg-transparent border-[1px] outline-none border-amber-400 hover:border-amber-500 focus:border-amber-500 focus:active:border-amber-500 caret-amber-500 transition-all duration-300 ease-linear"
      />

      <Button
        type="submit"
        size="medium"
        variant="Secondary"
        label="Apply Coupon"
      />
    </form>
  );
}

export default ApplyCoupon;
