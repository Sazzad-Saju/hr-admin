import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const ProtectedRoute = () => {
  const location = useLocation();
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
