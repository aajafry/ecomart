import { useMemo } from "react";
import Button from "../atoms/Button";
import TableGrid from "../atoms/TableGrid";
import { wishlistColumns } from "../config/wishlistColumns";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

function Wishlist() {
  const { 
    wishlistItems, 
    clearWishlist, 
    removeFromWishlist 
  } = useWishlist();
  
  const { addToCart } = useCart();  

  const columns = useMemo(
    () => wishlistColumns(addToCart, removeFromWishlist),
    [addToCart, removeFromWishlist]
  );

  return (
    <div className="w-[90%] mx-auto py-14">
      <TableGrid rows={wishlistItems} columns={columns} />
      <div className="py-14">
        <Button
          type="button"
          size="medium"
          variant="Secondary"
          label="Clear Wishlist"
          onClick={() => clearWishlist()}
        />
      </div>
    </div>
  );
}

export default Wishlist;
