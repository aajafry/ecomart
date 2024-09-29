import { useCallback, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { sellerOrderColumns } from "../../config/sellerOrderColumns";
import { useOrders } from "../../hooks/useOrders";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import PageHeader from "../../molecules/PageHeader";
import AcceptRefundOrderForm from "../../organisms/AcceptRefundOrderForm";
import CancelOrderConfirmation from "../../organisms/CancelOrderConfirmation";
import OrderUpdateStatusForm from "../../organisms/OrderUpdateStatusForm";


function ShopOrders() {
  const [orderIdToUpdateStatus, setOrderIdToUpdateStatus] = useState(null);
  const [orderIdToAcceptRefund, setOrderIdToacceptRefund] = useState(null);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);

  const { visibility, openVisibility, closeVisibility } = useVisibility();

  const { orders, handleUpdateOrder } = useOrders();

  const handleUpdateOrderStatus = useCallback(
    (updatedOrderId) => {
      setOrderIdToUpdateStatus(updatedOrderId);
      openVisibility("UPDATE");
    },
    [openVisibility]
  );

  const handleAcceptRefundOrder = useCallback(
    (refundedOrderId) => {
      setOrderIdToacceptRefund(refundedOrderId);
      openVisibility("REFUND");
    },
    [openVisibility]
  );

  const handleCancelOrder = useCallback(
    (canceledId) => {
      setOrderIdToCancel(canceledId);
      openVisibility("CANCEL");
    },
    [openVisibility]
  );

  const columns = useMemo(
    () =>
      sellerOrderColumns(
        handleUpdateOrderStatus,
        handleAcceptRefundOrder,
        handleCancelOrder
      ),
    [handleUpdateOrderStatus, handleAcceptRefundOrder, handleCancelOrder]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Update Order Status"
        isOpen={visibility.UPDATE}
        onClose={() => closeVisibility("UPDATE")}
      >
        <OrderUpdateStatusForm
          onClose={() => closeVisibility("UPDATE")}
          orderId={orderIdToUpdateStatus}
          onUpdateOrder={handleUpdateOrder}
        />
      </Modal>

      <Modal
        label="Accept Refund Order"
        isOpen={visibility.REFUND}
        onClose={() => closeVisibility("REFUND")}
      >
        <AcceptRefundOrderForm
          onClose={() => closeVisibility("REFUND")}
          orderId={orderIdToAcceptRefund}
          onUpdateOrder={handleUpdateOrder}
        />
      </Modal>

      <Dialog
        isOpen={visibility.CANCEL}
        onClose={() => closeVisibility("CANCEL")}
      >
        <CancelOrderConfirmation
          onClose={() => closeVisibility("CANCEL")}
          orderId={orderIdToCancel}
          onUpdateOrder={handleUpdateOrder}
        />
      </Dialog>

      <PageHeader heading="Orders" />

      <TableGrid rows={orders} columns={columns} />
    </div>
  );
}



export default ShopOrders;