import { Box, CircularProgress } from "@mui/material";

const FullPageLoader = () => {
  return (
    <Box
      role="status"
      aria-label="Loading application"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullPageLoader;
