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
  InputAdornment,
  Snackbar,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";

import Header from "../../components/Header";
import teamService from "../../services/teamService";
import { tokens } from "../../theme";
import { getApiErrorMessage } from "../../utils/apiErrors";
import TeamDialog from "./TeamDialog";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [notice, setNotice] = useState({ open: false, message: "" });

  const loadTeams = useCallback(async (searchValue = "") => {
    setLoading(true);
    setPageError("");

    try {
      const response = await teamService.list({
        search: searchValue.trim() || undefined,
      });
      setTeams(response.data ?? []);
    } catch (error) {
      setPageError(getApiErrorMessage(error, "The teams could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadTeams(search);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [loadTeams, search]);

  const openCreateDialog = () => {
    setSelectedTeam(null);
    setFormOpen(true);
  };

  const openEditDialog = (team) => {
    setSelectedTeam(team);
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
    setSelectedTeam(null);
  };

  const handleSave = async (payload) => {
    const response = selectedTeam
      ? await teamService.update(selectedTeam.id, payload)
      : await teamService.create(payload);

    closeFormDialog();
    setNotice({ open: true, message: response.message });
    await loadTeams(search);
  };

  const handleDelete = async () => {
    if (!teamToDelete) {
      return;
    }

    setDeleting(true);

    try {
      const response = await teamService.remove(teamToDelete.id);
      setTeamToDelete(null);
      setNotice({ open: true, message: response.message });
      await loadTeams(search);
    } catch (error) {
      setTeamToDelete(null);
      setPageError(getApiErrorMessage(error, "The team could not be deleted."));
    } finally {
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
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Tooltip title="Edit team">
              <IconButton
                aria-label={`Edit ${row.name}`}
                color="info"
                onClick={() => openEditDialog(row)}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete team">
              <IconButton
                aria-label={`Delete ${row.name}`}
                color="error"
                onClick={() => setTeamToDelete(row)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ m: "20px" }}>
      <Header title="TEAM MANAGEMENT" subtitle="Create and manage employee teams" />

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
          placeholder="Search team by name"
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
          slotProps={{
            htmlInput: {
              "aria-label": "Search team by name",
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="Clear team search"
                    onClick={() => setSearch("")}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={openCreateDialog}
        >
          Add New Team
        </Button>
      </Box>

      {pageError && (
        <Alert severity="error" onClose={() => setPageError("")} sx={{ mb: 2 }}>
          {pageError}
        </Alert>
      )}

      <Box sx={{ height: "65vh", minHeight: 430 }}>
        <DataGrid
          rows={teams}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          sx={{
            border: "none",
            backgroundColor: colors.primary[400],
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .name-column--cell": { color: colors.greenAccent[300] },
          }}
        />
      </Box>

      <TeamDialog
        open={formOpen}
        team={selectedTeam}
        onClose={closeFormDialog}
        onSave={handleSave}
      />

      <Dialog
        open={Boolean(teamToDelete)}
        onClose={() => !deleting && setTeamToDelete(null)}
      >
        <DialogTitle>Delete Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete “{teamToDelete?.name}”? This action
            is blocked if employees are assigned to the team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTeamToDelete(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notice.open}
        autoHideDuration={3500}
        onClose={() => setNotice({ open: false, message: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice({ open: false, message: "" })}
        >
          {notice.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Team;
