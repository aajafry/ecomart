/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { getStickerClass } from "../utilities/getStickerClass";



function ProductList({ product }) {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { _id, thumbnail, name, shop, sticker, offerPrice, basePrice } =
    product;

  const displayPrice = offerPrice ? `$${offerPrice}` : `$${basePrice}`;
  const originalPrice = offerPrice ? `$${basePrice}` : null;


  const inCart = isInCart(_id);
  const inWishlist = isInWishlist(_id);


  const handleCartToggle = () => {
    if (inCart) {
      removeFromCart(_id);
    } else {
      addToCart(product);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  }


  return (
    <div>
      <div className="group relative h-auto bg-gray-100">
        <Link to={`/product/${_id}`}>
          <img
            src={thumbnail}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-72 object-contain"
          />
        </Link>
        <div className="absolute top-0 left-0 z-20">
          <Button
            label={sticker}
            type="button"
            size="medium"
            className={`!rounded-none text-white ${getStickerClass(sticker)}`}
          />
        </div>
        <div className="absolute top-4 right-4 flex-col gap-y-2 hidden group-hover:flex transition-all duration-200 ease-linear">
          <Link to={`/product/${_id}`}>
            <Button
              label={<FaEye size="24" />}
              type="button"
              className="p-2 bg-white"
              title={`View ${name}`}
              aria-label={`View ${name}`}
            />
          </Link>
          <Button
            label={
              <IoBagOutline
                size="24"
                className={`${inCart ? "text-amber-500" : "text-black"}`}
              />
            }
            type="button"
            className="p-2 bg-white"
            onClick={handleCartToggle}
            title={inCart ? `Remove ${name} from cart` : `Add ${name} to cart`}
            aria-label={
              inCart ? `Remove ${name} from cart` : `Add ${name} to cart`
            }
          />
          <Button
            label={
              <CiHeart
                size="24"
                className={`${inWishlist ? "text-amber-500" : "text-black"}`}
              />
            }
            type="button"
            className="p-2 bg-white"
            onClick={handleWishlistToggle}
            title={
              inCart
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
            aria-label={
              inCart
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-10 hidden group-hover:block transition-all duration-200 ease-linear">
          <Button
            label="Add to Cart"
            type="button"
            size="medium"
            variant="Primary"
            onClick={() => addToCart(product)}
            title={`Add ${name} to cart`}
            aria-label={`Add ${name} to cart`}
            className="!bg-amber-400"
          />
        </div>
      </div>
      <div className="pt-6">
        <Heading label={name} weight="font-medium" />
        <Heading
          label={shop}
          weight="font-bold"
          color="text-amber-500"
          className="capitalize cursor-pointer"
        />
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{displayPrice} USD</p>
          {originalPrice && (
            <p className="text-md font-medium text-rose-500 line-through">
              {originalPrice} USD
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
