
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField,
    Tooltip,
    useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getApiErrorMessage } from "../../utils/apiErrors";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import departmentService from "../../services/departmentService";
import Header from "../../components/Header";
import DepartmentDialog from "./DepartmentDialog";

const Department = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [notice, setNotice] = useState({
        open: false,
        message: "",
    });
    const [departmentToDelete, setDepartmentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [search, setSearch] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const loadDepartments = useCallback(async (searchValue = "") => {
        setLoading(true);
        setPageError("");

        try {
            const response = await departmentService.list({
                search: searchValue.trim() || undefined,
            });

            setDepartments(response.data ?? []);
        } catch (error) {
            setPageError(
                getApiErrorMessage(error, "The departments could not be loaded.")
            );
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            loadDepartments(search);
        }, 300);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [loadDepartments, search]);

    const openCreateDialog = () => {
        setSelectedDepartment(null)
        setFormOpen(true);
    };

    const openEditDialog = (department) => {
        setSelectedDepartment(department);
        setFormOpen(true);
    }

    const closeFormDialog = () => {
        setFormOpen(false);
        setSelectedDepartment(null);
    };

    const handleSave = async (payload) => {
        const wasEditing = Boolean(selectedDepartment);
        const response = selectedDepartment
            ? await departmentService.update(selectedDepartment.id, payload)
            : await departmentService.create(payload);

        closeFormDialog();
        setNotice({
            open: true,
            message: 
                response.message || 
                (wasEditing
                    ? "Department updated successfully" 
                    : "Department created successfully"
                ),
        });
        await loadDepartments(search);

        return response;
    }

    const handleDelete = async () => {
        if(!departmentToDelete){
            return;
        }
        
        setDeleting(true);

        try{
            const response = await departmentService.remove(departmentToDelete.id);
            setNotice({
                open: true, 
                message: 
                    response.message || 
                    "Department deleted successfully"
            });
            setDepartmentToDelete(null);
            await loadDepartments(search);
        } catch(error){
            setDepartmentToDelete(null);

            setPageError(
                getApiErrorMessage(
                    error,
                    "The department could not be deleted."
                )
            );
        } finally{
            setDeleting(false);
        }
    };

    const columns = useMemo(
        () => [
            {
                field: "name",
                headerName: "Name",
                flex: 1,
                minWidth: 180,
                cellClassName: "name-column--cell",
            },
            {
                field: "description",
                headerName: "Description",
                flex: 2,
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
            {
                field: "actions",
                headerName: "Action",
                width: 120,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,

                renderCell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Tooltip title="Edit department">
                            <IconButton
                                aria-label={`Edit ${row.name}`}
                                color="info"
                                onClick={() => openEditDialog(row)}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete department">
                            <IconButton
                                aria-label={`Delete ${row.name}`}
                                color="error"
                                onClick={() => setDepartmentToDelete(row)}
                            >
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        ],
        []
    );

    return (
        <Box sx={{ m: "20px" }}>
            <Header
                title="DEPARTMENT MANAGEMENT"
                subtitle="Create and manage employee departments"
            />

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                }}
            >

                <TextField
                    size="small"
                    placeholder="Search department by name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{
                        width: { xs: "100%", sm: 340 },

                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
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

                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={openCreateDialog}
                >
                    Add New Department
                </Button>
            </Box>
            {pageError && (
                <Alert
                    severity="error"
                    onClose={() => setPageError("")}
                    sx={{ mb: 2 }}
                >
                    {pageError}
                </Alert>
            )}

            <Box sx={{ height: "65vh", minHeight: 430 }}>
                <DataGrid
                    rows={departments}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 25, 50]}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0,
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

                <DepartmentDialog
                    open={formOpen}
                    department={selectedDepartment}
                    onClose={closeFormDialog}
                    onSave={handleSave}
                />

                <Dialog
                    open={Boolean(departmentToDelete)}
                    onClose= {() => {
                        if(!deleting){
                            setDepartmentToDelete(null);
                        }
                    }}
                >
                    <DialogTitle>Delete Department</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete "{departmentToDelete?.name}" This
                            action is blocked if employees are assigned to the department.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick= {() => setDepartmentToDelete(null)}
                            disabled={deleting}
                            sx={{ color: "text.primary" }}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="error"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* snackbar */}
                <Snackbar
                    open={notice.open}
                    autoHideDuration={3500}
                    onClose={() => 
                        setNotice({
                            open: false,
                            message: "",
                        })
                    }
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        onClose={() => 
                            setNotice({
                                open: false,
                                message: "",
                            })
                        }
                    >
                        {notice.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}

export default Department;
