/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import { useCategories } from "../hooks/useCategories";
import ImageUploader from "../molecules/ImageUploader";
import Input from "../molecules/Input";
import Textarea from "../molecules/Textarea";

const CATEGORY_URL = import.meta.env.VITE_CATEGORY;

function AddCategoryForm({ onClose, onAddCategory }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    isDisable,
    thumbnail,
    setThumbnail,
    createCategory,
    getCategories,
  } = useCategories(CATEGORY_URL);


  const handleAddCategoryWithForm = async (data) => {
    const newCategory = await createCategory(data);
    if (newCategory) {
      onAddCategory(newCategory);
      reset();
      await getCategories();
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddCategoryWithForm)}
      className="flex flex-col gap-4 my-4"
    >
      <Input
        type="text"
        name="name"
        placeholder="enter category name"
        required={true}
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
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "uploading..." : "Add Category"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default AddCategoryForm