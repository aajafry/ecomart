import { useCallback, useEffect, useMemo, useState } from "react";
import TableGrid from "../../atoms/TableGrid";
import { couponsColumns } from "../../config/couponsColumns";
import { useCoupons } from "../../hooks/useCoupons";
import { useProducts } from "../../hooks/useProducts";
import { useShops } from "../../hooks/useShops";
import { useVisibility } from "../../hooks/useVisibility";
import Dialog from "../../molecules/Dialog";
import Modal from "../../molecules/Modal";
import PageHeader from "../../molecules/PageHeader";
import AddCouponForm from "../../organisms/AddCouponForm";
import DeleteConfirmation from "../../organisms/DeleteConfirmation";
import EditCouponForm from "../../organisms/EditCouponForm";

const COUPON_URL = import.meta.env.VITE_COUPON;
const SHOP_URL = import.meta.env.VITE_SHOP;
const PRODUCT_URL = import.meta.env.VITE_PRODUCT;


function AdminCoupons() {
  const [couponIdToEdit, setCouponIdToEdit] = useState(null);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const {
    coupons,
    setCoupons,
    getCoupons,
    handleAddCoupon,
    handleUpdateCoupon,
  } = useCoupons();

  useEffect(() => {
    getCoupons(COUPON_URL);
  }, [getCoupons])

  const { shopsName } = useShops(SHOP_URL);
  const { products } = useProducts(PRODUCT_URL);

  const handleEditCoupon = useCallback(
    (updatedCategoryId) => {
      setCouponIdToEdit(updatedCategoryId);
      openVisibility("EDIT");
    },
    [openVisibility, setCouponIdToEdit]
  );

  const handleDeleteCoupon = useCallback(
    (id, name) => {
      setCouponToDelete({ id, name });
      openVisibility("DELETE");
    },
    [openVisibility, setCouponToDelete]
  );

  const columns = useMemo(
    () => couponsColumns(handleEditCoupon, handleDeleteCoupon),
    [handleEditCoupon, handleDeleteCoupon]
  );

  return (
    <div className="transition-all duration-500 ease-linear">
      <Modal
        label="Add Coupon"
        isOpen={visibility.ADD}
        onClose={() => closeVisibility("ADD")}
      >
        <AddCouponForm
          onClose={() => closeVisibility("ADD")}
          onAddCoupon={handleAddCoupon}
          getCouponsUrl={COUPON_URL}
          products={products}
          shops={shopsName}
        />
      </Modal>

      <Modal
        label="Edit Coupon"
        isOpen={visibility.EDIT}
        onClose={() => closeVisibility("EDIT")}
      >
        <EditCouponForm
          onClose={() => closeVisibility("EDIT")}
          onUpdateCoupon={handleUpdateCoupon}
          getCouponsUrl={COUPON_URL}
          couponId={couponIdToEdit}
          products={products}
          shops={shopsName}
        />
      </Modal>

      <Dialog
        isOpen={visibility.DELETE}
        onClose={() => closeVisibility("DELETE")}
      >
        <DeleteConfirmation
          onClose={() => closeVisibility("DELETE")}
          itemToDelete={couponToDelete}
          setItemToDelete={setCouponToDelete}
          setItems={setCoupons}
          itemName="Coupon"
          url={COUPON_URL}
        />
      </Dialog>
      
      <PageHeader
        heading="Coupons"
        btnLabel="Add Coupon"
        btnEvent={() => openVisibility("ADD")}
      />

      <TableGrid rows={coupons} columns={columns} />
    </div>
  );
}

export default AdminCoupons;
