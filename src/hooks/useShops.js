import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";

export function useShops(shopsUrl) {
  const [shops, setShops] = useState();
  const [shopsName, setShopsName] = useState([]);
  

  const fetchShops = useCallback(async () => {
    const token = getToken();
    try {
      const data = await getResource(shopsUrl, token);
      setShops(data.shops);
    } catch (error) {
      console.error("Failed to fetch shops: ", error);
      toast.error("Failed to fetch shops. Please try again later.");
    }
  }, [shopsUrl]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  useEffect(() => {
    setShopsName(Array.from(new Set(shops?.map((shop) => shop.brand))));
  }, [shops]);

   return {
    shops,
    shopsName,
    setShops,
    setShopsName,
   }
}
