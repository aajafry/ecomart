import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "./Input";


function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubscription = (data) => {
    // TODO: store subscription email in the database.
    console.log(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubscription)}
      className="flex flex-col gap-4"
    >
      <Input
        type="email"
        name="subscribe"
        placeholder="subscribe with email"
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        size="medium"
        variant="Secondary"
        label="Subscribe"
        className="cursor-pointer"
      />
    </form>
  );
}

export default SubscriptionForm;
