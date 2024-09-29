/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useOrders } from "../hooks/useOrders";
import ConfirmationButtons from "../molecules/ConfirmationButtons";


function CancelOrderConfirmation({ onClose, orderId, onUpdateOrder }) {
  const { isDisable, trackedOrder, trackOrder, cancelOrder } = useOrders();

  const loadTrackOrder = useCallback(async () => {
    await trackOrder(orderId);
  }, [orderId, trackOrder]);

  useEffect(() => {
    loadTrackOrder();
  }, [loadTrackOrder]);

  const handleCancelOrderRequest = async () => {
    if (!orderId) {
      toast.error("No order ID provided.");
      return;
    }

    if (["delivered", "canceled", "refunded"].includes(trackedOrder.status)) {
      toast.error(
        "The order status cannot be cancelled. it is already marked as delivered, canceled, or refunded."
      );
      return;
    }

    const canceledOrder = await cancelOrder(orderId);
    if (canceledOrder) {
        onUpdateOrder(canceledOrder);
        onClose();
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Confirm Cancelation</h2>
      <p className="mb-6"> Are you sure you want to Cancel the Order</p>

      <ConfirmationButtons
        isDisable={isDisable}
        onConfirm={handleCancelOrderRequest}
        onClose={onClose}
        confirmLabel="Apply Cancel Request"
        confirmType="button"
      />
    </div>
  );
}

export default CancelOrderConfirmation;
