import { useCart } from "../contexts/CartContext";
import CartActionButtons from "../molecules/CartActionButtons";
import CartItem from "../molecules/CartItem";
import EmptyState from "../molecules/EmptyState";

function CartDrawer() {
  const { cartItems } = useCart();
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item._id} item={item} />)
        ) : (
          <EmptyState
            message="Your Shopping Cart Is Empty"
            btnLabel="Continue Shopping"
          />
        )}
      </div>
      <CartActionButtons />
    </>
  );
}

export default CartDrawer;
