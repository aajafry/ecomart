/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utilities/getToken";

function UserAvater({className , size}) {
  const decoded = jwtDecode(getToken());
  const baseStyles = "object-fill rounded-full object-top cursor-pointer border-[1px] border-amber-500";

  const sizes = {
    small: "w-7 h-7",
    medium: "w-14 h-14",
  };

  const finalStyles = `${baseStyles} ${sizes[size]} ${className}`
  return (
    <img src={decoded?.avatar} alt={decoded?.name} className={finalStyles} />
  );
}

export default UserAvater;
