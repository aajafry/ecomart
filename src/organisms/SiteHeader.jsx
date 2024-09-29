/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import Heading from "../atoms/Heading";
import CartWishlistToggler from "../molecules/CartWishlistToggler";
import SearchForm from "../molecules/SearchForm";
import SignupNavigators from "../molecules/SignupNavigators";
import UserAvater from "../molecules/UserAvater";
import { getProfilePath } from "../utilities/getProfilePath";
import { getToken } from "../utilities/getToken";

// TODO: Implement search and category filtering functionality.

function SiteHeader({ onOpenCart, onOpenWishlist, onOpenMenu }) {
  const [user, setUser] = useState(false);
  const [decoded, setDecoded] = useState(null);


   useEffect(() => {
     const token = getToken();
     setUser(!!token);
     if (token) {
       setDecoded(jwtDecode(token));
     }
   }, []);

  return (
    <header>
      <div className="py-4 w-[90%] mx-auto flex items-center justify-between gap-6">
        <Link to="/">
          <Heading
            label="ecomart"
            size="text-3xl"
            weight="font-thin"
            className="tracking-wider pb-2"
          />
        </Link>

        <div className="flex-1 hidden lg:flex">
          <form className="flex items-center">
            <select
              name="category"
              id="category"
              className="py-[10px] px-3 rounded-l-md bg-black text-white text-sm border-[1px] outline-none border-black cursor-pointer"
            >
              <option value="">All</option>
              <option value="1">Electronics</option>
              <option value="2">Clothing</option>
              <option value="5">Books</option>
              <option value="6">Groceries</option>
              <option value="8">Health & Beauty</option>
              <option value="12">Other</option>
            </select>
          </form>
          <SearchForm position="header" />
        </div>

        {/* Icons and User Links */}
        <div className="flex gap-3 items-center">
          <CartWishlistToggler
            onOpenCart={onOpenCart}
            onOpenWishlist={onOpenWishlist}
          />
          {user ? (
            <Link to={getProfilePath(decoded?.role)}>
              <UserAvater size="small" className="!w-10 !h-10" />
            </Link>
          ) : (
            <div className="text-sm font-medium gap-3 hidden lg:flex">
              <SignupNavigators />
            </div>
          )}
          <CiMenuFries
            size="24"
            className="cursor-pointer block lg:hidden"
            aria-label="Open Menu"
            onClick={onOpenMenu}
          />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
