import axios from "axios";
import { toast } from "react-toastify";

// helper function to delete images from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_CLOUDINARY}/delete-image`,
      { publicId: `ecomart/${publicId}` },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error("error removing image from cloudinary: ", error);
    toast.error("error removing image from cloudinary.");
  }
};