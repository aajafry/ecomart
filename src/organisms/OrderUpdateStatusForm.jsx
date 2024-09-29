/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import { useOrders } from "../hooks/useOrders";
import Select from "../molecules/Select";

const status = ["pending", "shipped", "delivered"];


function OrderUpdateStatusForm({ onClose, orderId, onUpdateOrder }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, trackedOrder, applyUpdateStatus, getOrders, trackOrder } = useOrders();

  const loadTrackOrder = useCallback(async () => {
    const order = await trackOrder(orderId);
    if (order) {
      Object.keys(order).forEach((key) => {
        setValue(key, order[key]);
      });
    }
  }, [orderId, setValue, trackOrder]);

  useEffect(() => {
    loadTrackOrder();
  }, [loadTrackOrder]);

  const handleUpdateStatus = async (data) => {
    if (!orderId) {
      toast.error("No order ID provided.");
      return;
    }

    if (["delivered", "canceled", "refunded"].includes(trackedOrder.status)) {
      toast.error(
        "The order status cannot be updated as it is already marked as delivered, canceled, or refunded."
      );
      return;
    }
    const updatedOrder = await applyUpdateStatus(orderId, data);
    if (updatedOrder) {
      onUpdateOrder(updatedOrder);
      reset();
      await getOrders();
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateStatus)}
      className="flex flex-col gap-4 my-4"
    >
      <Select
        name="status"
        options={status}
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "Updating..." : "Change Status"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
      
    </form>
  );
}

export default OrderUpdateStatusForm