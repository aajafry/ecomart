import UserLayout from "./UserLayout";
import UserProtectedRoute from "./UserProtectedRoute";

function withUserProtected(Component) {
  return (
    <UserProtectedRoute>
      <UserLayout>
        <Component />
      </UserLayout>
    </UserProtectedRoute>
  );
}

export default withUserProtected;