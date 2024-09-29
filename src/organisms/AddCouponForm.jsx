/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useCoupons } from "../hooks/useCoupons";
import Checkbox from "../molecules/Checkbox";
import Input from "../molecules/Input";
import MultiSelect from "../molecules/MultiSelect";
import Select from "../molecules/Select";
import Textarea from "../molecules/Textarea";


function AddCouponForm({ 
  onClose, 
  onAddCoupon, 
  getCouponsUrl, 
  products: allProducts, 
  shops 
}) {
  const [products, setProducts] = useState(allProducts);
  const [selectedProductValues, setSelectedProductValues] = useState([]);

  const discountTypes = ["percentage", "fixed"];
  let productSet;
  let selectedShop;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    isDisable,
    getCoupons,
    createCoupon,
  } = useCoupons();

  const handleAddCouponWithForm = async (data) => {
    const newCoupon = await createCoupon(data);
    if (newCoupon) {
      onAddCoupon(newCoupon);
      reset();
      await getCoupons(getCouponsUrl);
      onClose();
    }
  }

  selectedShop = watch("shop");

  useEffect(() => {
    if (selectedShop) {
      const productsInShop = allProducts.filter(
        (product) => product.shop === selectedShop
      );
      setProducts(productsInShop);
    } else {
      setProducts(allProducts);
    }
  }, [allProducts, selectedShop]);

  productSet = Array.from(new Set(products.map((product) => product.name)));

  const productOptions = productSet.map((product) => ({
    value: product,
    label: product,
  }));

  const handleSelectChange = (name, selectedValues) => {
    setSelectedProductValues(selectedValues);
    setValue(name, selectedValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddCouponWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="code"
          placeholder="enter coupon code"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="usageLimit"
          placeholder="enter coupon usage limit"
          required={false}
          register={register}
          errors={errors}
        />

        <Select
          name="discountType"
          options={discountTypes}
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="discount"
          placeholder="enter coupon discount value"
          required={true}
          register={register}
          errors={errors}
        />

        <Input
          type="date"
          name="validFrom"
          placeholder="pick from date"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="date"
          name="validTo"
          placeholder="pick to date"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="minimumOrderValue"
          placeholder="enter minimum order amount"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="maxiumOrderValue"
          placeholder="enter maxium order amount"
          required={false}
          register={register}
          errors={errors}
        />

        {shops && (
          <Select
            name="shop"
            options={shops}
            required={false}
            register={register}
            errors={errors}
          />
        )}
      </div>

      <MultiSelect
        name="selectedProduct"
        options={productOptions}
        onChange={handleSelectChange}
        value={selectedProductValues}
      />

      <Checkbox
        label="Activated"
        name="isActive"
        required={false}
        register={register}
        errors={errors}
      />

      <Textarea
        name="description"
        placeholder="enter coupon description"
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "Uploading..." : "Add Coupon"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default AddCouponForm;
