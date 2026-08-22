import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Chip,
    TextField,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import areaService from "../../services/areaService";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const Area = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [search, setSearch] = useState("");
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageError, setPageError] = useState("");

    const loadAreas = useCallback(async (searchValue = "") => {
        setLoading(true);
        setPageError("");

        try {
            const response = await areaService.list({
                search: searchValue.trim() || undefined,
            });
            setAreas(response.data ?? []);
        } catch (error) {
            setPageError(
                getApiErrorMessage(error, "The areas could not be loaded.")
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            loadAreas(search);
        }, 300);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [loadAreas, search]);

    const columns = useMemo(
        () => [
            {
                field: "code",
                headerName: "Code",
                flex: 0.7,
                minWidth: 150,
                cellClassName: "name-column--cell",
            },
            {
                field: "name",
                headerName: "Name",
                flex: 1,
                minWidth: 180,
            },
            {
                field: "description",
                headerName: "Description",
                flex: 1,
                minWidth: 260,
                valueGetter: (value) => value || "—",
            },
            {
                field: "status",
                headerName: "Status",
                width: 130,
                renderCell: ({ value }) => (
                    <Chip
                        size="small"
                        label={value === "active" ? "Active" : "Inactive"}
                        color={value === "active" ? "success" : "default"}
                        variant={value === "active" ? "filled" : "outlined"}
                    />
                ),
            },
        ],
        []
    );

    return (
        <Box sx={{ m: "20px" }}>
            <Header
                title="AREA MANAGEMENT"
                subtitle="Create and manage employee areas"
            />
            {pageError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setPageError("")}>
                    {pageError}
                </Alert>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    gap: 2,
                    alignItems: { xs: "stretch", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                }}
            >
                <TextField
                    size="small"
                    placeholder="Search area by name or code"
                    value="search"
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{
                        width: { xs: "100%", sm: 340 },

                        "& .MuiOutlinedInput-root": {
                            "& fieldSet": {
                                borderColor: colors.grey[100],
                            },
                            "&:hover fieldset": {
                                borderColor: colors.greenAccent[500],
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: colors.greenAccent[500],
                                borderWidth: "1px",
                            },
                        },
                    }}
                />
            </Box>
            <Box sx={{ height: "65vh", minHeight: 430 }}>
                <DataGrid
                    rows={areas}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 25, 50]}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 10,
                            },
                        },
                    }}
                    sx={{
                        border: "none",
                        backgroundColor: colors.primary[400],

                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: "none",
                        },

                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
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

export default Area;