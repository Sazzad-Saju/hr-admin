import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  getApiErrorMessage,
  getApiValidationErrors,
} from "../../utils/apiErrors";

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(120, "Team name cannot exceed 120 characters.")
    .required("Team name is required."),
  description: yup.string().trim().nullable(),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Select a valid status.")
    .required("Status is required."),
});

const TeamDialog = ({ open, team, onClose, onSave }) => {
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: team?.name ?? "",
      description: team?.description ?? "",
      status: team?.status ?? "active",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      setSubmitError("");

      try {
        await onSave({
          name: values.name.trim(),
          description: values.description.trim() || null,
          status: values.status,
        });
        actions.resetForm();
      } catch (error) {
        const validationErrors = getApiValidationErrors(error);

        if (Object.keys(validationErrors).length > 0) {
          actions.setErrors(validationErrors);
        } else {
          setSubmitError(
            getApiErrorMessage(error, "The team could not be saved.")
          );
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (open) {
      setSubmitError("");
    }
  }, [open, team]);

  const handleClose = () => {
    if (!formik.isSubmitting) {
      formik.resetForm();
      setSubmitError("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{team ? "Edit Team" : "Add New Team"}</DialogTitle>

      <DialogContent>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <TextField
          autoFocus
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Team Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          disabled={formik.isSubmitting}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          margin="normal"
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          disabled={formik.isSubmitting}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          id="status"
          name="status"
          label="Status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          disabled={formik.isSubmitting}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={formik.isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamDialog;
