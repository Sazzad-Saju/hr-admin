import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useAuth } from "../../auth/AuthContext";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);

        try {
            await logout();
            navigate("/login", { replace: true });
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
            }}
        >
            {/* SEARCH BAR */}
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: colors.primary[400],
                    borderRadius: "3px",
                }}
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search"
                />

                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>

                <Tooltip title="Log out">
                    <span>
                        <IconButton
                            onClick={handleLogout}
                            disabled={loggingOut}
                            aria-label="Log out"
                        >
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Topbar;
