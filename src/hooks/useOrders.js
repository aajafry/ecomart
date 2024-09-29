import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { createResource } from "../utilities/createResource";
import { getResource } from "../utilities/getResource";
import { getToken } from "../utilities/getToken";
import { updateResource } from "../utilities/updateResource";

const ORDER_URL = import.meta.env.VITE_ORDER;

export function useOrders() {
  const [isDisable, setIsDisable] =useState(false);
  const [orders, setOrders] = useState([]);
  const [trackedOrder, setTrackedOrder] = useState({});
  const { clearCart } =  useCart()

  const getOrders = useCallback(async () => {
    const token = getToken();
    try {
      const data = await getResource(ORDER_URL, token)
      setOrders(data.orders)
    } catch (error) {
      console.error("Failed to fetch orders : ", error);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  },[])

  useEffect(() => {
    getOrders();
  }, [getOrders])

  const trackOrder = useCallback(async (orderId) => {
    const token = getToken();
    try {
      const data = await getResource(`${ORDER_URL}/tracking/${orderId}`, token);
      if(data.order){
        setTrackedOrder(data.order);
        return data.order;
      } else {
        toast.error("Failed to retrieve order tracking information.");
      }
    } catch (error) {
      console.error("Failed to trak order: ", error);
      toast.error("Failed to trak order. Please try again later.");
    }
  }, []);

  const createOrder = useCallback(async (data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await createResource(
        `${ORDER_URL}/create`,
        data,
        token
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        return response.data.orders;
      } else {
        toast.error(response.data.message || "Failed to create orders");
      }
    } catch (error) {
       toast.error(`An error occurred: ${error.message}`);
    } finally{
      setIsDisable(false);
      clearCart()
    }
  }, [clearCart]);


  const applyRefund = useCallback(async (orderId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${ORDER_URL}/applyRefund/${orderId}`,
        data,
        token
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.order;
      } else {
        toast.error(response.data.message || "Failed to applying refund order request");
      }
    } catch (error) {
       toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, []);


  const applyUpdateStatus = useCallback(async (orderId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${ORDER_URL}/updateStatus/${orderId}`,
        data,
        token
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.order;
      } else {
        toast.error(response.data.message || "Failed to updating order status");
      }
    } catch (error) {
       toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, []);


  const acceptRefund = useCallback(async (orderId, data) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const response = await updateResource(
        `${ORDER_URL}/acceptRefund/${orderId}`,
        data,
        token
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.order;
      } else {
        toast.error(response.data.message || "Failed to accepting refund order");
      }
    } catch (error) {
       toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, []);


  const cancelOrder = useCallback( async(orderId) => {
    setIsDisable(true);
    const token = getToken();
    try {
      const data = await getResource(`${ORDER_URL}/canceledOrder/${orderId}`, token)
      if(data.message && data.order) {
        toast.success(data.message);
        return data.order;
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsDisable(false);
    }
  }, [])


  const handleUpdateOrder = useCallback((updatedOrder) => {
    setOrders((prev) => { 
      return prev.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    });
  }, []);


  return {
    isDisable,
    trackedOrder,
    orders,
    setOrders,
    getOrders,
    createOrder,
    applyRefund,
    applyUpdateStatus,
    acceptRefund,
    handleUpdateOrder,
    trackOrder,
    cancelOrder
  }
}
