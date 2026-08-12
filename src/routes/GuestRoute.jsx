import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const GuestRoute = () => {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
