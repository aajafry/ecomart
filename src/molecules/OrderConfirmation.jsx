import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";

function OrderConfirmation() {
  return (
    <div className="flex items-center flex-col gap-y-3">
      <Heading label="THANK YOU" />
      <p>Payment Is Successfully Processsed And Your Order Is On The Way</p>
      <Link to="/">
        <Button
          type="button"
          label="continue shopping"
          size="small"
          variant="Primary"
          className="mt-2"
        />
      </Link>
    </div>
  );
}

export default OrderConfirmation;
