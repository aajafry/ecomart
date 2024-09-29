import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { useWishlist } from "../contexts/WishlistContext";
import EmptyState from "../molecules/EmptyState";
import WishlistItem from "../molecules/WishlistItem";


function WishlistDrawer() {
  const { wishlistItems } = useWishlist();
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <WishlistItem key={item._id} item={item} />
          ))
        ) : (
          <EmptyState message="Your Wishlist Is Empty" btnLabel="Visit shop" />
        )}
      </div>

      <div className="px-4 my-6 w-full">
        <Link to="/wishlist">
          <Button
            type="button"
            label="View Wishlist"
            size="large"
            variant="Secondary"
            className="w-full block text-center"
          />
        </Link>
      </div>
    </>
  );
}

export default WishlistDrawer;
