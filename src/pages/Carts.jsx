import { useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import TableGrid from "../atoms/TableGrid";
import { cartColumns } from "../config/cartColumns";
import { useCart } from "../contexts/CartContext";
import PaymentDetails from "../molecules/PaymentDetails";
import ApplyCoupon from "../organisms/ApplyCoupon";

function Carts() {
  const {
    cartItems,
    clearCart,
    calculateTotals,
    shippingCost,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const { 
    subTotal, 
    discount, 
    finalTotal 
  } = calculateTotals();

  const columns = useMemo(
    () => cartColumns(removeFromCart, updateQuantity), 
    [removeFromCart, updateQuantity]
  )
  
  return (
    <div className="carts w-[90%] mx-auto py-14">
      <TableGrid rows={cartItems} columns={columns} />

      <div className="py-14 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
        <ApplyCoupon />

        <Button
          type="button"
          size="medium"
          variant="Secondary"
          label="Clear Cart"
          onClick={() => clearCart()}
        />
      </div>

      <div className="pb-14">
        <Heading
          label="Cart totals"
          size="text-2xl"
          weight="font-medium"
          className="mb-6"
        />
        <PaymentDetails
          subTotal={subTotal}
          discount={discount}
          shippingCost={shippingCost}
          finalTotal={finalTotal}
        />
      </div>
      <Link to="/checkout">
        <Button
          type="button"
          size="medium"
          variant="Secondary"
          label="Proceed to checkout"
        />
      </Link>
    </div>
  );
}

export default Carts;
