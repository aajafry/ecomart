/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useOrders } from "../hooks/useOrders";
import ConfirmationButtons from "../molecules/ConfirmationButtons";
import Textarea from "../molecules/Textarea";

function ApplyRefundForm({ onClose, orderId, onUpdateOrder }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { isDisable, trackedOrder, applyRefund, getOrders, trackOrder } =
    useOrders();

  const loadTrackOrder = useCallback(async () => {
    const order = await trackOrder(orderId);
    // optional
    if (order) {
      Object.keys(order).forEach((key) => {
        setValue(key, order[key]);
      });
    }
  }, [orderId, setValue, trackOrder]);

  useEffect(() => {
    loadTrackOrder();
  }, [loadTrackOrder]);

  const handleApplyRefund = async (data) => {
    if (!orderId) {
      toast.error("No order ID provided.");
      return;
    }
    if (
      trackedOrder.payment.status !== "paid" &&
      trackedOrder.payment.status === "refunded"
    ) {
      toast.error(
        "Refund cannot be processed: The order must be paid and not already refunded."
      );
      return;
    }
    const refundOrder = await applyRefund(orderId, data);
    if (refundOrder) {
      onUpdateOrder(refundOrder);
      reset();
      await getOrders();
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleApplyRefund)}
      className="flex flex-col gap-4 my-4"
    >
      <Textarea
        name="refundReason"
        placeholder="Please provide a detailed reason for the refund"
        required={true}
        register={register}
        errors={errors}
      />

      <ConfirmationButtons
        isDisable={isDisable}
        onConfirm={handleSubmit(handleApplyRefund)}
        onClose={onClose}
        confirmLabel="Apply Refund"
        confirmType="submit"
      />
    </form>
  );
}

export default ApplyRefundForm