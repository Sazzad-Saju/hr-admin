import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Box,
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

const columns = [
    {
        field: "code",
        headerName: "Code",
        flex: 0.7,
        minWidth: 120,
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
        minWidth: 240,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 0.6,
        minWidth: 110,
    },
];

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
                    alignItems: {xs: "stretch", sm: "center"},
                    flexDirection: {xs: "column", sm: "row"},
                }}
            >
                <TextField
                    size="small"
                    placeholder="Search area by name or code"
                    value="search"
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{ 
                        width: { xs: "100%", sm: 340},

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
            <Box sx={{ height: 500 }}>
                <DataGrid
                    rows={areas}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 25, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 10,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Area;