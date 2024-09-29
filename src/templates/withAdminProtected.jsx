import AdminLayout from "./AdminLayout";
import AdminProtectedRoute from "./AdminProtectedRoute";

function withAdminProtected(Component) {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <Component />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}


export default withAdminProtected;