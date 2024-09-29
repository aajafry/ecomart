import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


const IconNavLinkStyle =
  "hover:text-amber-500 focus:text-amber-500 active:text-amber-500 transition-colors duration-200 ease-linear";


function CartWishlistLinks() {
  return (
    <>
      <li>
        <NavLink to="/carts" className={IconNavLinkStyle}>
          <IoBagOutline size="24" title="goto cart" aria-label="goto cart" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/wishlist" className={IconNavLinkStyle}>
          <CiHeart size="24" title="goto wishlist" aria-label="goto wishlist" />
        </NavLink>
      </li>
    </>
  );
}

export default CartWishlistLinks;
