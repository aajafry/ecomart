/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Heading from "../atoms/Heading";
import TableGrid from "../atoms/TableGrid";
import { cartColumns } from "../config/cartColumns";
import { useCart } from "../contexts/CartContext";
import PaymentDetails from "../molecules/PaymentDetails";
import ShippingDetails from "../molecules/ShippingDetails";

function OrderReview({ shippingAddress }) {
  const {
    cartItems,
    shippingCost,
    calculateTotals,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const { subTotal, discount, finalTotal } = calculateTotals();

  const columns = useMemo(
    () => cartColumns(removeFromCart, updateQuantity),
     [removeFromCart, updateQuantity]
  )

  return (
    <>
      <Heading
        label="Review Shipping Address"
        size="text-lg"
        weight="font-medium"
        className="mb-4"
      />

      <ShippingDetails
        name={shippingAddress?.name}
        email={shippingAddress?.email}
        phone={shippingAddress?.phone}
        address={shippingAddress?.address}
        city={shippingAddress?.city}
        state={shippingAddress?.state}
        country={shippingAddress?.country}
        zipCode={shippingAddress?.zipCode}
        orderNote={shippingAddress?.orderNote}
      />

      <Heading
        label="Review Cart"
        size="text-lg"
        weight="font-medium"
        className="my-4"
      />
      <TableGrid rows={cartItems} columns={columns} />

      <Heading
        label="Payment Details"
        size="text-lg"
        weight="font-medium"
        className="py-4 mb-1 w-full max-w-[380px]"
      />
      <PaymentDetails
        subTotal={subTotal}
        discount={discount}
        shippingCost={shippingCost}
        finalTotal={finalTotal}
      />
    </>
  );
}

export default OrderReview