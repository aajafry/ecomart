import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { useVisibility } from "../../hooks/useVisibility";
import Modal from "../../molecules/Modal";
import OrderDetails from "../../molecules/OrderDetails";
import PageHeader from "../../molecules/PageHeader";
import ReviewForm from "../../organisms/ReviewForm";


function UserOrder() {
  const [order, setOrder] = useState({});
  const [productIdToReview, setProductIdToReview] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();

  const { trackOrder } = useOrders();
  const { visibility, openVisibility, closeVisibility } = useVisibility();

  const loadTrackOrder = useCallback(async() => {
    const fetchedOrder = await trackOrder(id);
    setOrder(fetchedOrder);
  }, [id, trackOrder]);

  useEffect(() => {
    loadTrackOrder();
  }, [loadTrackOrder]);

  const handleProductReview = useCallback((productId) => {
    setProductIdToReview(productId);
    openVisibility("REVIEW");
  }, [openVisibility]);

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Drop Your Review"
        isOpen={visibility.REVIEW}
        onClose={() => closeVisibility("REVIEW")}
      >
        <ReviewForm
          orderId={id}
          productId={productIdToReview}
          onClose={() => closeVisibility("REVIEW")}
        />
      </Modal>

      <PageHeader
        heading="Order Details"
        headingIcon="IoBagSharp"
        btnLabel="Back"
        btnEvent={() => navigate(-1)}
      />

      {order && (
        <OrderDetails order={order} onProductReview={handleProductReview} />
      )}
    </div>
  );
}



export default UserOrder;
