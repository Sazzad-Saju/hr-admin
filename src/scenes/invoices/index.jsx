import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mocData";
import Header from "../../components/Header";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const pageBackground = theme.palette.background.default;

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "cost", headerName: "Cost", flex: 1, renderCell: (params) => (
                <Typography color={colors.greenAccent[500]}>
                    ${params.row.cost}
                </Typography>
            )
        },
        { field: "date", headerName: "Date", flex: 1 },
    ];

    return (
        <Box sx={{ m: "20px" }}>
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
            <Box
                sx={{
                    mt: "40px",
                    height: "75vh",
                }}
            >
                <DataGrid
                    rows={mockDataInvoices}
                    columns={columns}
                    checkboxSelection
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
                            backgroundColor: colors.primary[400],
                        },

                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },

                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
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

export default Invoices;