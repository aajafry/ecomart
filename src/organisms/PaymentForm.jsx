/* eslint-disable react/prop-types */

// TODO: due task stripe integration.

function PaymentForm({ payment, onChange }) {
  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <label
          htmlFor="stripe"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            value="Stripe"
            checked={payment.method === "Stripe"}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                method: e.target.value,
              }))
            }
            aria-label="Stripe"
          />
          <span className="text-sm text-gray-500 font-medium">
            Stripe Payment
          </span>
        </label>
        <label
          htmlFor="cashOnDelivery"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="paymentMethod"
            id="cashOnDelivery"
            value="Cash On Delivery"
            checked={payment.method === "Cash On Delivery"}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                method: e.target.value,
                status: "pending",
              }))
            }
            aria-label="Cash On Delivery"
          />
          <span className="text-sm text-gray-500 font-medium">
            Cash On Delivery
          </span>
        </label>
      </div>

      {payment.method === "Cash On Delivery" && (
        <div className="py-2 px-3 mt-6 w-full rounded-lg bg-transparent border-[1px] outline-none border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md focus:border-amber-400 focus:active:border-amber-400 transition-all duration-200 ease-linear caret-amber-500">
          <span className="text-sm text-gray-500 font-medium">
            Please make sure you have cash on hand when you are ready to
            deliver.
          </span>
        </div>
      )}
    </>
  );
}

export default PaymentForm