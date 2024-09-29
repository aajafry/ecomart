import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { createResource } from "../utilities/createResource";
import { getToken } from "../utilities/getToken";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT;


export function useReview() {
  const [isDisable, setIsDisable] = useState(false);

  const createRivew = useCallback(async (data) => {
     setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${PRODUCT_URL}/create-review`,
        data,
        token
      );
      if (response.status === 201) {
        toast.success(response.data.message);
       return response.data.review;
      } else {
        toast.error(response.data.message || "Failed to add review");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, [])

  return {
    isDisable,
    createRivew
  }
}
