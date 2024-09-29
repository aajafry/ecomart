/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import { deleteFromCloudinary } from "../utilities/deleteFromCloudinary";
import { uploadToCloudinary } from "../utilities/uploadToCloudinary";

const ImagesUploader = ({ required, initialImages, onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const maxImages = 4;

  useEffect(() => {
    setPreviewImages(initialImages);
  }, [initialImages]);

  const handleImagesAdd = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + previewImages.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const urls = [];
    await Promise.all(
      files.map(async (file) => {
        const url = await uploadToCloudinary(file, "ecomart");
        if (url) urls.push(url);
      })
    );

    const updatedImages = [...previewImages, ...urls];
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages);
    toast.success("Images added.");
  };

  const handleImagesRemove = useCallback(
    async (index) => {
      const urlToRemove = previewImages[index];
      if (urlToRemove) {
        const publicId = urlToRemove.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);

        const updatedImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updatedImages);
        onImagesChange(updatedImages);
        toast.success("Image removed.");
      }
    },
    [previewImages, onImagesChange]
  );

  return (
    <div>
      <label htmlFor="previewImages" className="font-medium">
        Images (Max: {maxImages})
      </label>
      <div>
        {previewImages.length > 0 && (
          <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previewImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />
                <Button
                  type="button"
                  label="&times;"
                  onClick={() => handleImagesRemove(index)}
                  className="absolute top-1 right-1 w-4 h-4 !p-0 !pb-[2px] font-bold rounded-full flex-center bg-slate-800 border-[1px] border-amber-500 text-rose-700 dark:text-rose-300"
                />
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          id="previewImages"
          accept="image/*"
          multiple
          onChange={handleImagesAdd}
          disabled={previewImages.length >= maxImages}
          required={required}
          className="w-full py-2 px-3 rounded-lg bg-transparent border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500"
        />
      </div>
    </div>
  );
};

export default ImagesUploader;
