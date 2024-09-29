/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Heading from "../atoms/Heading";
import TableGrid from "../atoms/TableGrid";
import { reviewCartColumns } from "../config/reviewCartColumns";
import OrderSnapshot from "./OrderSnapshot";
import PaymentDetails from "./PaymentDetails";
import ShippingDetails from "./ShippingDetails";


function OrderDetails({ order, onProductReview }) {
  const columns = useMemo(
    () => reviewCartColumns(onProductReview),
    [onProductReview]
  );

  if (!order) {
    return <div className="flex-center">Loading...</div>;
  }

  return (
    <>
      <OrderSnapshot
        id={order?._id}
        createdAt={order?.createdAt}
        deliveredAt={order?.deliveredAt}
        status={order?.status}
      />

      <TableGrid rows={order?.carts} columns={columns} />

      <div className="my-4 flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex-1 text-sm">
          <Heading
            label="Shipping Details"
            size="text-lg"
            weight="font-medium"
          />

          <ShippingDetails
            name={order?.shippingAddress?.name}
            email={order?.shippingAddress?.email}
            phone={order?.shippingAddress?.phone}
            address={order?.shippingAddress?.address}
            city={order?.shippingAddress?.city}
            state={order?.shippingAddress?.state}
            country={order?.shippingAddress?.country}
            zipCode={order?.shippingAddress?.zipCode}
            orderNote={order?.shippingAddress?.orderNote}
          />
        </div>

        <div className="flex-1 text-sm flex flex-col items-start md:items-end">
          <Heading
            label="Payment Details"
            size="text-lg"
            weight="font-medium"
            className="mb-1 w-full max-w-[380px]"
          />

          <PaymentDetails
            subTotal={order?.subTotal}
            discount={order?.discount}
            shippingCost={order?.shippingCost}
            finalTotal={order?.finalTotal}
            paymentStatus={order?.payment?.status}
          />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
