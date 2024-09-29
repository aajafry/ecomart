import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Drawer from "../molecules/Drawer";
import CartDrawer from "../organisms/CartDrawer";
import MenuDrawer from "../organisms/MenuDrawer";
import SiteFooter from "../organisms/SiteFooter";
import SiteHeader from "../organisms/SiteHeader";
import WishlistDrawer from "../organisms/WishlistDrawer";

function Layout({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      openCart || openWishlist || openMenu ? "hidden" : "auto";
  }, [openCart, openMenu, openWishlist]);

  return (
    <>
      <SiteHeader
        onOpenCart={() => setOpenCart(true)}
        onOpenWishlist={() => setOpenWishlist(true)}
        onOpenMenu={() => setOpenMenu(true)}
      />

      {openCart && (
        <Drawer label="Shopping Cart" onClose={() => setOpenCart(false)}>
          <CartDrawer />
        </Drawer>
      )}
      {openWishlist && (
        <Drawer label="Wishlist" onClose={() => setOpenWishlist(false)}>
          <WishlistDrawer onClose={() => setOpenWishlist(false)} />
        </Drawer>
      )}
      {openMenu && (
        <Drawer label="Menu" onClose={() => setOpenMenu(false)}>
          <MenuDrawer onClose={() => setOpenMenu(false)} />
        </Drawer>
      )}

      <main className="bg-white">{children}</main>
      <SiteFooter />
    </>
  );
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
