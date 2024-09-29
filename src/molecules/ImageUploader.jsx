/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import { deleteFromCloudinary } from "../utilities/deleteFromCloudinary";
import { uploadToCloudinary } from "../utilities/uploadToCloudinary";


function ImageUploader({
  label,
  required,
  initialImage,
  onImageChange,
}) {
  const handleImageAdd = useCallback(
    async (event) => {
      if (initialImage) {
        toast.error("Remove the existing image before adding a new one.");
        return;
      }

      const file = event.target.files[0];
      if (file) {
        const url = await uploadToCloudinary(file, "ecomart");
        if (url) {
          onImageChange(url);
          toast.success("Image added.");
        }
      }
    },
    [initialImage, onImageChange]
  );

  const handleImageRemove = useCallback(async () => {
    if (initialImage) {
      const publicId = initialImage.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
      onImageChange(null);
      toast.success("Images removed.");
    }
  }, [initialImage, onImageChange]);


  return (
    <div>
      <label htmlFor="thumbnail" className="font-medium">
        {label}
      </label>
      <div className="flex items-end gap-2">
        {initialImage && (
          <div className="relative border-[1px] border-gray-400">
            <img
              src={initialImage}
              alt="Thumbnail Preview"
              className="w-40 h-32 object-cover"
            />
            <Button
              type="button"
              label="&times;"
              onClick={handleImageRemove}
              className="absolute top-1 right-1 w-4 h-4 !p-0 !pb-[2px] font-bold rounded-full flex-center bg-slate-800 border-[1px] border-amber-500 text-rose-700 dark:text-rose-300"
            />
          </div>
        )}
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleImageAdd}
          disabled={!!initialImage}
          required={required}
          className="w-full py-2 px-3 rounded-lg bg-transparent border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500"
        />
      </div>
    </div>
  );
}

export default ImageUploader;