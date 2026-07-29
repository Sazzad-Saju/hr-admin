import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mocData";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const pageBackground = theme.palette.background.default;

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "access",
            headerName: "Access Level",
            flex: 1,
            headerAlign: "center",
            cellClassName: "access-column--cell",

            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        sx={{
                            width: "60%",
                            py: "5px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "5px",
                            backgroundColor:
                                access === "admin"
                                    ? colors.greenAccent[600]
                                    : colors.greenAccent[700],
                            borderRadius: "4px",
                        }}
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography sx={{ color: colors.grey[100], ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box sx={{ m: "20px" }}>
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box
                sx={{
                    mt: "40px",
                    height: "75vh",
                }}
            >
                <DataGrid
                    rows={mockDataTeam}
                    columns={columns}
                    style={{
                        "--DataGrid-t-header-background-base": "transparent",
                        "--DataGrid-t-color-background-base": "transparent",
                        "--DataGrid-containerBackground": "transparent",
                        "--DataGrid-pinnedBackground": "transparent",
                    }}
                    sx={{
                        border: "none",
                        backgroundColor: "transparent",

                        "& .MuiDataGrid-root": {
                            border: "none",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },

                        "& .MuiDataGrid-virtualScroller": {
                            // backgroundColor: "transparent",
                            backgroundColor: colors.primary[400],
                        },

                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },

                        "& .access-column--cell": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },

                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Team;