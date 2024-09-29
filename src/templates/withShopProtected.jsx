import ShopLayout from "./ShopLayout";
import ShopProtectedRoute from "./ShopProtectedRoute";

function withShopProtected(Component) {
  return (
    <ShopProtectedRoute>
      <ShopLayout>
        <Component />
      </ShopLayout>
    </ShopProtectedRoute>
  );
}

export default withShopProtected;