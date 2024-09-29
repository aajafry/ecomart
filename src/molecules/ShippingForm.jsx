/* eslint-disable react/prop-types */
import Input from "./Input";
import Textarea from "./Textarea";

function ShippingForm({ register, errors }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <Input
          type="text"
          name="name"
          placeholder="name"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="email"
          name="email"
          placeholder="email"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="tel"
          name="phone"
          placeholder="phone"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="country"
          placeholder="country"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="state"
          placeholder="state"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="city"
          placeholder="city"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="zipCode"
          placeholder="zipCode"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="address"
          placeholder="address"
          required={true}
          register={register}
          errors={errors}
        />
      </div>

      <Textarea
        name="orderNote"
        placeholder="order note"
        required={false}
        register={register}
        errors={errors}
      />
    </>
  );
}

export default ShippingForm