import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { createResource } from "../utilities/createResource";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";
import { updateResource } from "../utilities/updateResource";

const COUPON_URL = import.meta.env.VITE_COUPON;

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  const getCoupons = useCallback(async (couponsUrl) => {
    const token = getToken();
    try {
      const data = await getResource(couponsUrl, token)
      setCoupons(data.coupons)
    } catch (error) {
      console.error("Failed to fetch coupons : ", error);
      toast.error("Failed to fetch coupons. Please try again later.");
    }
  }, []);

  const createCoupon = useCallback(async (data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${COUPON_URL}/create`,
        data,
        token,
      );
      
      if (response.status === 201) {
        toast.success(response.data.message);
        return response.data.coupon;
      } else {
        toast.error(response.data.message || "Failed to add coupon")
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  },[]);

  const updateCoupon = useCallback(async (couponId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${COUPON_URL}/${couponId}`,
        data,
        token
      );
      
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.coupon;
      } else {
        toast.error(response.data.message || "Failed to update coupon");
      }
    } catch (error) {
      toast.error("An error occurred while updating the coupon.");
    } finally {
      setIsDisable(false);
    }
  }, []);

  const retrieveCoupon = useCallback(async (couponId) => {
    const token = getToken();
    try {
      const data = await getResource(`${COUPON_URL}/${couponId}`, token);
      return data.coupon;
    } catch (error) {
      console.error("Failed to retrieve coupon: ", error);
      toast.error("Failed to retrieve coupon. Please try again later.");
    }
  }, []);

  const handleAddCoupon = useCallback( async (newCoupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  }, []);

  const handleUpdateCoupon = useCallback((updatedCoupon) => {
    setCoupons((prev) => {
      return prev.map((coupon) =>
        coupon._id === updatedCoupon._id ? updatedCoupon : coupon
      );
    });
  }, []);

   return {
    coupons,
    isDisable,
    setCoupons,
    getCoupons,
    createCoupon,
    updateCoupon,
    retrieveCoupon,
    handleAddCoupon,
    handleUpdateCoupon,
   }
}
