/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import { useCart } from "../contexts/CartContext";


function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const decreaseQuantity = useCallback(
    (id, quantity) => {
      updateQuantity(id, Math.max(0, quantity - 1));
    },
    [updateQuantity]
  );

  const increaseQuantity = useCallback(
    (id, quantity) => {
      updateQuantity(id, quantity + 1);
    },
    [updateQuantity]
  );

  return (
    <div className="my-4 flex items-start justify-between">
      <div className="flex items-center flex-col gap-1">
        <Button
          type="button"
          label="+"
          size="small"
          variant="Tertiary"
          className="!rounded-full"
          onClick={() => increaseQuantity(item._id, item.quantity)}
          aria-label={`Increase quantity of ${item.name}`}
        />
        <span>{item.quantity}</span>
        <Button
          type="button"
          label="-"
          size="small"
          variant="Tertiary"
          className="!rounded-full"
          onClick={() => decreaseQuantity(item._id, item.quantity)}
          aria-label={`Decrease quantity of ${item.name}`}
        />
      </div>
      <div className="flex flex-col flex-1 mx-4">
        <Heading label={item.name} size="text-base" weight="font-medium" />
        <span className="text-gray-400 text-sm">{`${item.price} * ${item.quantity}`}</span>
        <span className="font-medium text-sm">
          {item.price * item.quantity}$
        </span>
      </div>
      <div>
        <IoMdCloseCircleOutline
          size="20"
          title="Remove from cart"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => removeFromCart(item._id)}
          className="text-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CartItem;
