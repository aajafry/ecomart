import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import UserAvater from "../molecules/UserAvater";
import { getProfilePath } from "../utilities/getProfilePath";
import { getToken } from "../utilities/getToken";


function UserProfile() {
  const decoded = jwtDecode(getToken());

    return (
      <div className="flex items-center gap-4">
        <UserAvater size="medium" />
        <div className="flex flex-col gap-2">
          <Heading label={decoded.name} className="capitalize" />
          <NavLink to={getProfilePath(decoded.role)}>
            <Button
              type="button"
              label="View Profile"
              size="small"
              variant="Primary"
            />
          </NavLink>
        </div>
      </div>
    );
}

export default UserProfile;
