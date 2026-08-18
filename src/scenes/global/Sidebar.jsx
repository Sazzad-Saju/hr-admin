import { useState } from "react";
import {
    Sidebar as ProSidebar,
    Menu,
    MenuItem,
    sidebarClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { tokens } from "../../theme";
import { backendUrl } from "../../utils/backendUrl";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            component={<Link to={to} />}
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
            style={{
                color: colors.grey[100],
            }}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { admin } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                position: "sticky",
                top: 0,
                alignSelf: "stretch",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
            }}
        >
            <ProSidebar
                collapsed={isCollapsed}
                backgroundColor={colors.primary[400]}
                rootStyles={{
                    height: "100%",
                    minHeight: "100%",
                    border: "none",
                    overflow: "auto",

                    [`.${sidebarClasses.container}`]: {
                        height: "100%",
                        overflow: "auto",
                    },
                }}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ active }) => ({
                            padding: "5px 35px 5px 20px",
                            color: active
                                ? "#6870fa"
                                : colors.grey[100],
                            backgroundColor: "transparent",

                            "&:hover": {
                                color: "#868dfb",
                                backgroundColor: "transparent",
                            },
                        }),

                        icon: {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                ml: "15px",
                            }}>
                                <Typography variant="h3" color={colors.grey[100]}>
                                    SATTAR HR
                                </Typography>
                                <IconButton>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box sx={{ mb: "25px" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={
                                        backendUrl(admin?.photo_url) ||
                                        "/assets/anonymous.png"
                                    }
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: colors.grey[100],
                                        fontWeight: 700,
                                        mt: "10px",
                                    }}
                                >
                                    {admin?.name || "HR Administrator"}
                                </Typography>
                                <Typography variant="h5"
                                    sx={{
                                        color: colors.greenAccent[500],
                                    }}>
                                    SATTAR HR
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box sx={{
                        pl: isCollapsed ? 0 : "10%",
                    }}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                            Organization
                        </Typography>
                        <Item
                            title="Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Department"
                            to="/department"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Designation"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Leave Type"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Holidays"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Payroll Months"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                            Employee
                        </Typography>
                        <Item
                            title="Employees"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}

                        />
                        <Item
                            title="Department Head"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                            Leave
                        </Typography>
                        <Item
                            title="Leave Requests"
                            to="/faq"
                            icon={<HelpOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Create Leave"
                            to="/faq"
                            icon={<HelpOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        
                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                            Salary
                        </Typography>
                        
                        <Item
                            title="Monthly Salaries"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Promotion/Demotion"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Salary Records"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
