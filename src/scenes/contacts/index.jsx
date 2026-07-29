import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mocData";
import Header from "../../components/Header";


const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "Registrar ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "city", headerName: "City", flex: 1 },
        { field: "zipCode", headerName: "Zip Code", flex: 1 },
    ];

    return (
        <Box sx={{ m: "20px" }}>
            <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
            <Box
                sx={{
                    mt: "40px",
                    height: "75vh",
                }}
            >
                <DataGrid
                    rows={mockDataContacts}
                    columns={columns}
                    showToolbar
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

                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
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

export default Contacts;