/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import { useCart } from "../contexts/CartContext";
import TagsCard from "../molecules/TagsCard";
import { renderStars } from "../utilities/renderStars";

function ProductDetails({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  handleAddToCart,
}) {
  const { isInCart, addToCart, removeFromCart } = useCart();

  const {
    _id,
    basePrice,
    category,
    description,
    name,
    offerPrice,
    ratings,
    reviews,
    shop,
    stock,
    tags,
  } = product || {};

  const inCart = isInCart(_id);

  const handleCartToggle = () => {
    if (inCart) {
      removeFromCart(_id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <Heading label={name} size="text-2xl" weight="font-medium" />
        <FaHeart
          size="24"
          onClick={handleCartToggle}
          className={`cursor-pointer ${
            inCart ? "text-amber-500" : ""
          } transition-all duration-200 ease-linear`}
        />
      </div>
      <div className="flex items-center mb-4">
        <p className="text-xl font-medium mr-2">${offerPrice} USD</p>
        <p className="text-sm font-medium line-through text-rose-500">
          ${basePrice} USD
        </p>
      </div>
      <div className="flex items-center gap-1 mb-4">
        {renderStars(ratings)}
        <p className="text-sm text-gray-500 ml-2">
          {ratings} Ratings | {reviews?.length} Reviews
        </p>
      </div>
      <div className="flex items-center gap-4 mb-4">
        {shop && (
          <p className="text-sm text-gray-500">
            Shop:{" "}
            <span className="text-amber-500 font-medium capitalize">
              {shop}
            </span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          Category:{" "}
          <span className="text-amber-500 font-medium capitalize">
            {category}
          </span>
        </p>
      </div>

      <TagsCard tags={tags} />

      <p className="text-sm mb-8">
        {description?.length > 150
          ? description.substring(0, 150) + "..."
          : description}
      </p>

      <div className="flex items-start md:items-center flex-col sm:flex-row gap-6 mb-4">
        <div className="flex items-center bg-transparent border-2 border-gray-300">
          <Button
            type="button"
            label="-"
            size="small"
            className="!w-14 !h-12 !text-2xl !rounded-none hover:bg-amber-400"
            onClick={decreaseQuantity}
          />

          <span className="px-4">{quantity}</span>

          <Button
            type="button"
            label="+"
            className="!w-14 !h-12 !text-2xl !rounded-none hover:bg-amber-400"
            onClick={increaseQuantity}
          />
        </div>

        <Button
          type="button"
          label="Add To Cart"
          variant="Secondary"
          className="py-3 px-5"
          onClick={handleAddToCart}
        />
      </div>
      <p className="text-sm text-gray-500">{stock} Pieces Available</p>
    </div>
  );
}

export default ProductDetails