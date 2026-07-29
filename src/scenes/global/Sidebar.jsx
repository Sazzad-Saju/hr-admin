import { useState } from "react";
import {
    Sidebar as ProSidebar,
    Menu,
    MenuItem,
    sidebarClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

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

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
            }}
        >
            <ProSidebar
                collapsed={isCollapsed}
                backgroundColor={colors.primary[400]}
                rootStyles={{
                    height: "100vh",
                    minHeight: "100vh",
                    border: "none",

                    [`.${sidebarClasses.container}`]: {
                        height: "100vh",
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
                                    HR ADMIN
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
                                    src={`../../assets/anonymous.png`}
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
                                    Joshef Smith
                                </Typography>
                                <Typography variant="h5" 
                                sx={{
                                    color: colors.greenAccent[500],
                                }}>
                                    Sattar Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>


        // <Box
        //     sx={{
        //         "& .pro-sidebar-inner": {
        //             background: `${colors.primary[400]} !important`,
        //         },
        //         "& .ps-icon-wrapper": {
        //             backgroundColor: "transparent !important",
        //         },
        //         "& .ps-inner-item": {
        //             padding: "5px 35px 5px 20px !important",
        //         },
        //         "& .ps-inner-item:hover": {
        //             color: "#868dfb !important",
        //         },
        //         "& .ps-menu-item.active": {
        //             color: "#6870fa !important",
        //         },
        //     }}
        // >
        //     <ProSidebar collapsed={isCollapsed}>
        //         <Menu iconShape="square">
        //             {/* LOGO AND MENU ICON */}
        //             <MenuItem
        //                 onClick={() => setIsCollapsed(!isCollapsed)}
        //                 icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
        //                 style={{
        //                     margin: "10px 0 20px 0",
        //                     color: colors.grey[100],
        //                 }}
        //             > 
        //             {!isCollapsed && (
        //                 <Box sx={{
        //                     display: "flex",
        //                     justifyContent: "space-between",
        //                     alignItems: "center",
        //                     ml: "15px",
        //                 }}>
        //                     <Typography variant="h3" color={colors.grey[100]}>
        //                         ADMINS
        //                     </Typography>
        //                     <IconButton>
        //                         <MenuOutlinedIcon />
        //                     </IconButton>
        //                 </Box>
        //             )}
        //             </MenuItem>

        //             {/* USER */}
        //             {!isCollapsed && (
        //                 <Box sx={{mb: "25px"}}>
        //                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        //                         <img
        //                             alt="profile-user"
        //                             width="100px"
        //                             height="100px"
        //                             src={`../../assets/anonymous.png`}
        //                             style={{ cursor: "pointer", borderRadius: "50%" }}
        //                         />
        //                     </Box>
        //                     <Box sx={{ textAlign: "center" }}>
        //                         <Typography
        //                             variant="h2"
        //                             color={colors.grey[100]}
        //                             fontWeight="bold"
        //                             sx={{ m: "10px 0 0 0" }}
        //                         >
        //                             Joshef Smith
        //                         </Typography>
        //                         <Typography variant="h5" color={colors.greenAccent[500]}>
        //                             Sattar Admin
        //                         </Typography>
        //                     </Box>
        //                 </Box>
        //             )}

        //             {/* MENU ITEMS */}
        //             <Box paddingLeft={isCollapsed ? undefined : "10%"}>
        //             </Box>
        //         </Menu>
        //     </ProSidebar>
        // </Box>
    );
};

export default Sidebar;