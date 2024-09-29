import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableGrid from "../../atoms/TableGrid";
import { consumerOrderColumns } from "../../config/consumerOrderColumns";
import { useOrders } from '../../hooks/useOrders';
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import ApplyRefundForm from "../../organisms/ApplyRefundForm";
import CancelOrderConfirmation from "../../organisms/CancelOrderConfirmation";
import PageHeader from "../../molecules/PageHeader";


function UserOrders() {
  const [orderIdToRefundRequest, setOrderIdToRefundRequest] = useState(null);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);
  
  const { visibility, openVisibility, closeVisibility } = useVisibility();

  const { orders, handleUpdateOrder } = useOrders();
  const navigate = useNavigate();

  const handleViewOrder = useCallback((viewId) => {
    navigate(`/user/order/${viewId}`, { replace: false });
  }, [navigate])

  const handleRefundRequest = useCallback((refundedOrderId) => {
    setOrderIdToRefundRequest(refundedOrderId);
    openVisibility("REFUND")
  }, [openVisibility])

  const handleCancelOrder = useCallback(
    (canceledId) => {
      setOrderIdToCancel(canceledId);
      openVisibility("CANCEL");
    },
    [openVisibility]
  );

  const columns = useMemo(
    () =>
      consumerOrderColumns(
        handleViewOrder,
        handleRefundRequest,
        handleCancelOrder
      ),
    [handleViewOrder, handleCancelOrder, handleRefundRequest]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Refund Request"
        isOpen={visibility.REFUND}
        onClose={() => closeVisibility("REFUND")}
      >
        <ApplyRefundForm
          onClose={() => closeVisibility("REFUND")}
          orderId={orderIdToRefundRequest}
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

export default UserOrders;
