/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useProducts } from "../hooks/useProducts";
import ImagesUploader from "../molecules/ImagesUploader";
import ImageUploader from "../molecules/ImageUploader";
import Input from "../molecules/Input";
import Select from "../molecules/Select";
import TagsInput from "../molecules/TagsInput";
import Textarea from "../molecules/Textarea";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT;


function EditProductForm({
  onClose,
  onUpdateProduct,
  productId,
  categories,
  shops,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    isDisable,
    tags,
    thumbnail,
    productImages,
    setTags,
    setThumbnail,
    setProductImages,
    getProducts,
    updateProduct,
    retrieveProduct,
  } = useProducts(PRODUCT_URL);

  const loadProductData = useCallback(async () => {
    const product = await retrieveProduct(productId);
    if(product) {
      setTags(product.tags || []);
      setThumbnail(product.thumbnail || null);
      setProductImages(product.previewImages || []);

      Object.keys(product).forEach((key) => {
        setValue(key, product[key]);
      });
    }
  }, [productId, retrieveProduct, setProductImages, setTags, setThumbnail, setValue])

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  const handleEditProductWithForm = async (data) => {
    const updatedProduct = await updateProduct(productId, data);
    if (updatedProduct) {
      onUpdateProduct(updatedProduct);
      reset();
      await getProducts();
      onClose();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditProductWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="name"
          placeholder="enter product name"
          required={false}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          name="basePrice"
          placeholder="enter product price"
          required={false}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          name="offerPrice"
          placeholder="enter product offer price"
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          name="stock"
          placeholder="enter product stock"
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
        <Select
          name="category"
          options={categories}
          required={false}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          name="sticker"
          placeholder="enter product sticker"
          required={false}
          register={register}
          errors={errors}
        />
      </div>

      <TagsInput required={false} initialTags={tags} onTagsChange={setTags} />

      <ImageUploader
        label="Upload Thumbnail"
        required={false}
        initialImage={thumbnail}
        onImageChange={setThumbnail}
      />

      <ImagesUploader
        required={false}
        initialImages={productImages}
        onImagesChange={setProductImages}
      />

      <Textarea
        name="description"
        placeholder="enter product description"
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Edit Product"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default EditProductForm;
