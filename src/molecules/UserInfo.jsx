/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Heading from "../atoms/Heading";
import Button from "../atoms/Button";


const userInfoListStyle =
  "py-2 px-3 w-full border-[1px] border-gray-400 hover:border-amber-500 rounded-md bg-white dark:bg-slate-900 transition-all duration-200 ease-linear";


function UserInfo({user, onEvent }) {
  return (
    <>
      <div className="h-32 mb-16 relative border-[1px] border-gray-400 bg-white dark:bg-slate-900 rounded-md">
        <Button
          type="button"
          size="small"
          variant="Tertiary"
          label="Edit Profile"
          onClick={onEvent}
          className="absolute right-3 top-3"
        />
        
        <img
          src={user?.avatar}
          alt={user?.name}
          className="h-24 w-24 object-cover rounded-full border-2 border-amber-500 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
        />
      </div>

      <ul className="flex flex-col gap-3">
        <li className={userInfoListStyle}>
          <Heading label="Name" size="text-base" weight="font-medium" />
          <p className="text-sm">{user?.name}</p>
        </li>
        <li className={userInfoListStyle}>
          <Heading label="Email" size="text-base" weight="font-medium" />
          <Link to={`mailto:${user?.email}`}>
            <p className="text-sm">{user?.email}</p>
          </Link>
        </li>
        <li className={userInfoListStyle}>
          <Heading label="Phone" size="text-base" weight="font-medium" />
          <Link to={`tel:${user?.phone}`}>
            <p className="text-sm">
              {user?.phone
                ? `${user?.phone.substring(0, 3)}-${user?.phone.substring(
                    3,
                    6
                  )}-${user?.phone.substring(6, 10)}`
                : "Phone number not provided"}
            </p>
          </Link>
        </li>
        <li className={userInfoListStyle}>
          <Heading label="Address" size="text-base" weight="font-medium" />
          <p className="text-sm">
            {user?.address && user?.city && user?.state && user?.zipCode
              ? `${user?.address}, ${user?.city}, ${user?.state}, ${user?.zipCode}`
              : "Address not provided"}
          </p>
        </li>
      </ul>
    </>
  );
}

export default UserInfo