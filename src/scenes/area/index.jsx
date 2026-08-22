import { useCallback, useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../../components/Header";
import areaService from "../../services/areaService";
import { getApiErrorMessage } from "../../utils/apiErrors";

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
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadAreas = useCallback(async () => {
        setLoading(true);
        setError("");

        try{
            const response = await areaService.list();
            setAreas(response.data.data ?? []);
        } catch(error){
            setError(
                getApiErrorMessage(error, "Unable to load areas.")
            );
        } finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAreas();
    }, [loadAreas]);

    return (
        <Box sx={{ m: "20px" }}>
            <Header
                title="AREA MANAGEMENT"
                subtitle="Create and manage employee areas"
            />
            {error && (
                <Alert severity="error" sx={{ mb:2 }}>
                    {error}
                </Alert>
            )}
            
            <Box sx={{ height:500 }}>
                <DataGrid
                    rows={areas}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10,25,50]}
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