import { useEffect, useState } from "react";
import { menuLinks } from "../config/links";
import CartWishlistLinks from "../molecules/CartWishlistLinks";
import SearchForm from "../molecules/SearchForm";
import SignupNavigators from "../molecules/SignupNavigators";
import SocialLinks from "../molecules/SocialLinks";
import UserProfile from "../molecules/UserProfile";
import { getToken } from "../utilities/getToken";
import { renderLinks } from "../utilities/renderLinks";


function MenuDrawer() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(!!getToken());
  }, []);

  return (
    <>
      <div className="px-4 my-2">
        <SearchForm position="drawer" />
      </div>

      <ul className="px-6 my-2 flex flex-col gap-2 flex-1 overflow-y-auto">
        {renderLinks(menuLinks)}
      </ul>

      <div className="px-4 my-2 flex flex-col">
        {user ? (
          <UserProfile />
        ) : (
          <div className="px-4 text-sm font-medium flex flex-col text-center gap-2">
            <SignupNavigators />
          </div>
        )}
      </div>

      <ul className="px-4 my-2 flex items-center justify-start gap-3">
        <CartWishlistLinks />
      </ul>

      <ul className="px-4 my-2 flex items-center justify-end gap-3">
        <SocialLinks />
      </ul>
    </>
  );
}


export default MenuDrawer;
