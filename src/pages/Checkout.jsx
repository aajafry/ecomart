import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { useOrders } from "../hooks/useOrders";
import CheckoutNavigation from "../molecules/CheckoutNavigation";
import OrderConfirmation from "../molecules/OrderConfirmation";
import ShippingForm from "../molecules/ShippingForm";
import OrderReview from "../organisms/OrderReview";
import PaymentForm from "../organisms/PaymentForm";
import Stepper from "../organisms/Stepper";
import { getToken } from "../utilities/getToken";


const steps = ["address", "review", "payment", "confirmation"];


function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({});
  const [payment, setPayment] = useState({});

  const token = getToken();
  const decoded = jwtDecode(token);

  const {
    cartItems,
    calculateTotals,
    shippingCost,
    setShippingCost,
    coupon,
  } = useCart();

  const { 
    finalTotal 
  } = calculateTotals();

  const { isDisable, createOrder } = useOrders();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = async (data) => {
    if (currentStep < steps.length) {
      if (currentStep === 1) {
        setShippingAddress(data);
        const shopSet = Array.from(new Set(cartItems.map((item) => item.shop)));

        setShippingCost(30 * shopSet.length);
        reset();
      } else if (currentStep === 3) {
        // TODO: handle payment request
        // console.log(payment.method);
        if (cartItems && shippingAddress && payment) {
          const order = {
            customer: {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
            },
            carts: cartItems,
            shippingAddress,
            payment: payment,
            couponCode: coupon?.code || null,
            shippingCost,
          };
          // Send order to server
          await createOrder(order);
        } else {
          toast.error("Please complete all required fields.");
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="w-[80%] mx-auto py-14">
        <form onSubmit={handleSubmit(handleNextStep)}>
          {/* address */}
          {currentStep === 1 && (
            <ShippingForm register={register} errors={errors} />
          )}
          {/* review */}
          {currentStep == 2 && (
            <OrderReview shippingAddress={shippingAddress} />
          )}
          {/* Payment */}
          {currentStep == 3 && (
            <PaymentForm payment={payment} onChange={setPayment}/>
          )}
          {/* confirmation */}
          {currentStep === 4 && <OrderConfirmation />}
          {/* navigation */}
          <CheckoutNavigation
            previous={handlePreviousStep}
            currentStep={currentStep}
            finalTotal={finalTotal}
            disabled={isDisable}
          />
        </form>
      </div>
    </>
  );
}


export default Checkout;