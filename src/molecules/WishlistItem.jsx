/* eslint-disable react/prop-types */
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Heading from "../atoms/Heading";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";


function WishlistItem({ item }) {
  const { addToCart } = useCart(); 
  const { removeFromWishlist } = useWishlist(); 
  return (
    <div key={item._id} className="my-4 flex items-center justify-between">
      <div>
        <FaShoppingCart
          title={`add ${item.name} to cart`}
          aria-label={`add ${item.name} to cart`}
          onClick={() => addToCart(item)}
          size="20"
          className="text-amber-500 cursor-pointer"
        />
      </div>
      <div className="flex flex-col flex-1 mx-4">
        <Heading label={item.name} size="text-base" weight="font-medium" />
        <span className="font-medium text-sm">{item.price}$</span>
      </div>
      <div>
        <IoMdCloseCircleOutline
          title={`remove ${item.name} from wishlist`}
          aria-label={`remove ${item.name} from wishlist`}
          onClick={() => removeFromWishlist(item._id)}
          size="20"
          className="text-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default WishlistItem;
