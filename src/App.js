import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/TopBar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Login from "./scenes/login";

const DashboardLayout = () => {
  return (
    <div className="app">
      <Sidebar />

      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

const AuthLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Outlet />
    </Box>
  );
};


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/geography" element={<Geography />} />
          </Route>

          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
