/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useCategories } from "../hooks/useCategories";
import ImageUploader from "../molecules/ImageUploader";
import Input from "../molecules/Input";
import Textarea from "../molecules/Textarea";

const CATEGORY_URL = import.meta.env.VITE_CATEGORY;

function EditCategoryForm({ onClose, onUpdateCategory, categoryId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    isDisable,
    thumbnail,
    setThumbnail,
    getCategories,
    updateCategory,
    retrieveCategory,
  } = useCategories(CATEGORY_URL);

  const loadCategoryData = useCallback(async () => {
    const category = await retrieveCategory(categoryId);
    if(category) {
      setThumbnail(category.thumbnail || null);

      Object.keys(category).forEach((key) => {
        setValue(key, category[key]);
      });
    }
  }, [categoryId, retrieveCategory, setThumbnail, setValue]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData])


  const handleEditCategoryWithForm = async (data) => {
    const updatedCategory = await updateCategory(categoryId, data);
    if (updatedCategory) {
      onUpdateCategory(updatedCategory);
      reset();
      await getCategories();
      onClose();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditCategoryWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <Input
        type="text"
        name="name"
        placeholder="enter category name"
        required={false}
        register={register}
        errors={errors}
      />

      <ImageUploader
        label="Upload Thumbnail"
        required={false}
        initialImage={thumbnail}
        onImageChange={setThumbnail}
      />

      <Textarea
        name="description"
        placeholder="enter category description"
        required={false}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Edit Category"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default EditCategoryForm