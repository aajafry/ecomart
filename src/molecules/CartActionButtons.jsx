import { Link } from "react-router-dom";
import Button from "../atoms/Button";

function CartActionButtons() {
  return (
    <div className="px-4 my-6 w-full flex flex-col gap-4">
      <Link to="/carts">
        <Button
          type="button"
          label="View Cart"
          size="medium"
          variant="Secondary"
          className="w-full block text-center"
        />
      </Link>
      <Link to="/checkout">
        <Button
          type="button"
          label="Checkout"
          size="medium"
          variant="Secondary"
          className="w-full block text-center"
        />
      </Link>
    </div>
  );
}

export default CartActionButtons;
