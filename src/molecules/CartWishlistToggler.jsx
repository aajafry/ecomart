/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";


function CartWishlistToggler({onOpenCart, onOpenWishlist}) {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  

  return (
    <>
      <div className="relative">
        <IoBagOutline
          size="24"
          className="cursor-pointer"
          onClick={onOpenCart}
          aria-label="Open Cart"
          title="Open Cart"
        />
        <span className="absolute -top-2 -right-2 -z-10 px-[6px] rounded-full text-white bg-amber-500 text-sm font-medium">
          {cartItems.length}
        </span>
      </div>
      <div className="relative">
        <CiHeart
          size="24"
          className="cursor-pointer"
          onClick={onOpenWishlist}
          aria-label="Open Wishlist"
          title="Open Wishlist"
        />
        <span className="absolute -top-2 -right-2 -z-10 px-[6px] rounded-full text-white bg-amber-500 text-sm font-medium">
          {wishlistItems.length}
        </span>
      </div>
    </>
  );
}

export default CartWishlistToggler;
