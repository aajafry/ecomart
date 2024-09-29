/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import { useOrders } from "../hooks/useOrders";
import Input from "../molecules/Input";


function AcceptRefundOrderForm({ onClose, orderId, onUpdateOrder }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, trackedOrder, acceptRefund, getOrders, trackOrder } = useOrders();

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

  const handleAcceptRefundOrder = async (data) => {
    if (!orderId) {
      toast.error("No order ID provided.");
      return;
    }
    if (
      trackedOrder.payment.status !== "paid" &&
      trackedOrder.payment.status === "refunded"
    ) {
      toast.error(
        "The order payment status cannot be updated as it is not marked as paid and has already been refunded."
      );
      return;
    }
    const AcceptRefundedOrder = await acceptRefund(orderId, data);
    if (AcceptRefundedOrder) {
      onUpdateOrder(AcceptRefundedOrder);
      reset();
      await getOrders();
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAcceptRefundOrder)}
      className="flex flex-col gap-4 my-4"
    >
      <Input
        type="number"
        name="refundAmount"
        placeholder="enter refund amount"
        required={true}
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        variant="Tertiary"
        label={isDisable ? "processing..." : "Accept Refund Request"}
        disabled={!!isDisable}
        className={`${isDisable && "cursor-not-allowed"}`}
      />
    </form>
  );
}

export default AcceptRefundOrderForm