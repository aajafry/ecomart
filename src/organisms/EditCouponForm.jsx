/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Checkbox from "../molecules/Checkbox";
import Input from "../molecules/Input";
import Select from "../molecules/Select";
import Textarea from "../molecules/Textarea";
import { useCoupons } from "../hooks/useCoupons";
import MultiSelect from "../molecules/MultiSelect";
import Button from "../atoms/Button";


function EditCouponForm({
  onClose,
  onUpdateCoupon,
  getCouponsUrl,
  couponId,
  products: allProducts,
  shops,
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
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, getCoupons, retrieveCoupon, updateCoupon } = useCoupons();

  const loadCouponData = useCallback(async () => {
    const coupon = await retrieveCoupon(couponId);
    if (coupon) {
      setSelectedProductValues(coupon.selectedProduct || []);
      Object.keys(coupon).forEach((key) => {
        setValue(key, coupon[key]);
      });
    }
  }, [couponId, retrieveCoupon, setValue]);

  useEffect(() => {
    loadCouponData();
  }, [loadCouponData]);

  const handleEditCouponWithForm = async (data) => {
    const updatedCoupon = await updateCoupon(couponId, data);
    if (updatedCoupon) {
      onUpdateCoupon(updatedCoupon);
      reset();
      await getCoupons(getCouponsUrl);
      onClose();
    }
  };

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
      onSubmit={handleSubmit(handleEditCouponWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="code"
          placeholder="enter coupon code"
          required={false}
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
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="discount"
          placeholder="enter coupon discount value"
          required={false}
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
        register={register}
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
        label={isDisable ? "processing..." : "Edit Coupon"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default EditCouponForm;
