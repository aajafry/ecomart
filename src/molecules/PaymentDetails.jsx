/* eslint-disable react/prop-types */
import { formatCurrency } from "../utilities/formatCurrency";

function PaymentDetails({
  subTotal,
  discount,
  shippingCost,
  finalTotal,
  paymentStatus,
}) {
  return (
    <ul className="flex flex-col gap-2 w-full max-w-[380px]">
      <li className="flex items-center justify-between pb-2 px-1 border-b border-gray-300">
        <p>Subtotal</p>
        <span>{formatCurrency(subTotal)}</span>
      </li>
      <li className="flex items-center justify-between pb-2 px-1 border-b border-gray-300">
        <p>Discount</p>
        <span>{formatCurrency(discount)}</span>
      </li>
      <li className="flex items-center justify-between pb-2 px-1 border-b border-gray-300">
        <p>Shipping Cost</p>
        <span>{formatCurrency(shippingCost)}</span>
      </li>
      <li className="flex items-center justify-between pb-2 px-1 border-b border-gray-300">
        <p>Gross Total</p>
        <span>{formatCurrency(finalTotal)}</span>
      </li>
      {paymentStatus && (
        <li className="flex items-center justify-between pb-2 px-1 border-b border-gray-300">
          <p>Payment Status</p>
          <span className="text-amber-500 font-medium">{paymentStatus}</span>
        </li>
      )}
    </ul>
  );
}

export default PaymentDetails