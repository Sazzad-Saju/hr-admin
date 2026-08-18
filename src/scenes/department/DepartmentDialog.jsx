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
import {
    getApiErrorMessage,
    getApiValidationErrors,
} from "../../utils/apiErrors";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .max(120, "Department name cannot exceed 120 characters.")
        .required("Department name is required."),

    description: yup
        .string()
        .trim()
        .nullable(),

    status: yup
        .string()
        .oneOf(["active", "inactive"], "Select a valid status.")
        .required("Status is required"),
});

const DepartmentDialog = ({ open, department, onClose, onSave }) => {
    const [submitError, setSubmitError] = useState("");

    const formik = useFormik({
        enableReinitialize: true,
        
        initialValues: {
            name: department?.name ?? "",
            description: department?.description ?? "",
            status: department?.status ?? "active",
        },

        validationSchema,

        onSubmit: async (values, actions) => {
            setSubmitError("");
            try {
                const payload = {
                    name: values.name.trim(),
                    description: values.description.trim() || null,
                    status: values.status,
                };
                await onSave(payload);

                actions.resetForm();
            } catch (error) {
                const validationErrors = getApiValidationErrors(error);

                if (Object.keys(validationErrors).length > 0) {
                    actions.setErrors(validationErrors);
                } else {
                    setSubmitError(
                        getApiErrorMessage(
                            error,
                            "The department could not be saved."
                        )
                    );
                }
            } finally {
                actions.setSubmitting(false)
            }
        },
    });

    useEffect(() => {
        if (open) {
            setSubmitError("");
        }
    }, [open, department]);

    const handleClose = () => {
        if (!formik.isSubmitting) {
            formik.resetForm();
            setSubmitError("");
            onClose();
        }
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{department ? "Edit Department": "Add New Department"} </DialogTitle>

            <DialogContent>
                {submitError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {submitError}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    name="name"
                    label="Department Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={
                        formik.touched.name && formik.errors.name
                            ? formik.errors.name
                            : ""
                    }
                    disabled={formik.isSubmitting}
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    margin="normal"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                        formik.touched.description && formik.errors.description
                    )}
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                    disabled={formik.isSubmitting}
                />
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    name="status"
                    label="Status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.status && formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    disabled={formik.isSubmitting}
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={handleClose}
                    disabled={formik.isSubmitting}
                    sx={{ color: "text.primary" }}>
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

export default DepartmentDialog;