import { Link } from "react-router-dom";
import Button from "../atoms/Button";

function SignupNavigators() {
  return (
    <>
      <Link to="/user/signup">
        <Button
          type="button"
          label="Become Buyer"
          size="small"
          variant="Primary"
          className="w-full !rounded-none"
        />
      </Link>
      <Link to="/shop/signup">
        <Button
          type="button"
          label="Become Seller"
          size="small"
          variant="Secondary"
          className="w-full !rounded-none"
        />
      </Link>
    </>
  );
}

export default SignupNavigators;
