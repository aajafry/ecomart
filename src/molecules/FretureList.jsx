/* eslint-disable react/prop-types */
import Heading from "../atoms/Heading";
import supportIcon from "../atoms/icons/headphone.svg";
import paymentSecurityIcon from "../atoms/icons/payment-security.svg";
import returnIcon from "../atoms/icons/return.svg";
import shippingIcon from "../atoms/icons/scooter.svg";

const icons = {
    supportIcon,
    paymentSecurityIcon,
    returnIcon,
    shippingIcon
}

function FretureList({icon, title, subtitle }) {
  const src = icons[icon]
  return (
    <li className="flex items-center gap-4 p-4 w-full md:w-1/2 lg:w-1/4">
      <img src={src} alt={title} />
      <div>
        <Heading 
            label={title} 
            size="text-lg" 
            weight="font-medium" 
        />
        <p className="text-sm">{subtitle}</p>
      </div>
    </li>
  );
}

export default FretureList;
