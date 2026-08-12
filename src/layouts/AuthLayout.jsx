import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box component="main" sx={{ minHeight: "100vh", width: "100%" }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
