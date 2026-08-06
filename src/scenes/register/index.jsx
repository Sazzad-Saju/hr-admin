import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { tokens } from "../../theme";

const validationSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .min(2, "First name must contain at least 2 characters.")
        .max(50, "First name cannot exceed 50 characters.")
        .required("First name is required."),

    lastName: yup
        .string()
        .trim()
        .min(2, "Last name must contain at least 2 characters.")
        .max(50, "Last name cannot exceed 50 characters.")
        .required("Last name is required."),

    email: yup
        .string()
        .trim()
        .email("Enter a valid email address.")
        .required("Email address is required."),

    phone: yup
        .string()
        .trim()
        .matches(
            /^[0-9+\-\s()]{7,20}$/,
            "Enter a valid phone number."
        )
        .required("Phone number is required."),

    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters.")
        .required("Password is required."),

    passwordConfirmation: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Password confirmation does not match."
        )
        .required("Please confirm your password."),
});

/**
 * Converts Laravel validation field names into the
 * field names used by Formik.
 */
const laravelFieldMap = {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
    phone: "phone",
    password: "password",
    password_confirmation: "passwordConfirmation",
};

const Register = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            passwordConfirmation: "",
        },

        validationSchema,

        onSubmit: async (values, actions) => {
            setServerError("");
            setSuccessMessage("");

            try {
                if (!apiBaseUrl) {
                    throw new Error(
                        "REACT_APP_API_BASE_URL is not configured."
                    );
                }

                const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");

                // Change "/register" when your Laravel route is different.
                const response = await axios.post(
                    `${normalizedBaseUrl}/register`,
                    {
                        first_name: values.firstName.trim(),
                        last_name: values.lastName.trim(),
                        email: values.email.trim(),
                        phone: values.phone.trim(),
                        password: values.password,
                        password_confirmation:
                            values.passwordConfirmation,
                    },
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

                setSuccessMessage(
                    response.data?.message ||
                    "Your account has been created successfully."
                );

                actions.resetForm();
            } catch (error) {
                const validationErrors =
                    error.response?.data?.errors;

                /*
                 * Laravel commonly returns:
                 *
                 * {
                 *   "errors": {
                 *     "email": ["The email has already been taken."]
                 *   }
                 * }
                 */
                if (validationErrors) {
                    const formErrors = {};

                    Object.entries(validationErrors).forEach(
                        ([fieldName, messages]) => {
                            const formikField =
                                laravelFieldMap[fieldName] || fieldName;

                            formErrors[formikField] = Array.isArray(messages)
                                ? messages[0]
                                : messages;
                        }
                    );

                    actions.setErrors(formErrors);

                    setServerError(
                        "Please correct the highlighted fields."
                    );
                } else {
                    setServerError(
                        error.response?.data?.message ||
                        error.message ||
                        "Registration failed. Please try again."
                    );
                }
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            backgroundColor: colors.primary[500],
            borderRadius: 2,

            "& fieldset": {
                borderColor: colors.grey[700],
            },

            "&:hover fieldset": {
                borderColor: colors.blueAccent[400],
            },

            "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
            },
        },

        "& .MuiInputLabel-root": {
            color: colors.grey[300],
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: colors.blueAccent[400],
        },
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: `linear-gradient(
                    135deg,
                    ${colors.primary[500]} 0%,
                    ${colors.primary[400]} 100%
                )`,

                px: {
                    xs: 2,
                    sm: 3,
                },

                py: 4,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "560px",
                    backgroundColor: colors.primary[400],
                    borderRadius: 3,

                    p: {
                        xs: 3,
                        sm: 5,
                    },

                    boxShadow: 8,
                }}
            >
                {/* Company mark */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 3,
                    }}
                >
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "24px",
                            fontWeight: 800,
                            letterSpacing: "1px",
                        }}
                    >
                        SM
                    </Box>
                </Box>

                <Typography
                    variant="h2"
                    textAlign="center"
                    fontWeight="700"
                    color={colors.grey[100]}
                >
                    Create Account
                </Typography>

                <Typography
                    variant="h5"
                    textAlign="center"
                    color={colors.grey[300]}
                    sx={{ mt: 1, mb: 4 }}
                >
                    Create your Sattar Metal HR account
                </Typography>

                {serverError && (
                    <Alert
                        severity="error"
                        onClose={() => setServerError("")}
                        sx={{ mb: 3 }}
                    >
                        {serverError}
                    </Alert>
                )}

                {successMessage && (
                    <Alert
                        severity="success"
                        onClose={() => setSuccessMessage("")}
                        sx={{ mb: 3 }}
                    >
                        {successMessage}
                    </Alert>
                )}

                <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                            },
                            gap: 2,
                        }}
                    >
                        {/* First name */}
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            autoComplete="given-name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                            }
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputSx}
                        />

                        {/* Last name */}
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            autoComplete="family-name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputSx}
                        />

                        {/* Email */}
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email &&
                                formik.errors.email
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "span 2",
                                },
                                ...inputSx,
                            }}
                        />

                        {/* Phone */}
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            autoComplete="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phone &&
                                Boolean(formik.errors.phone)
                            }
                            helperText={
                                formik.touched.phone &&
                                formik.errors.phone
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "span 2",
                                },
                                ...inputSx,
                            }}
                        />

                        {/* Password */}
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            edge="end"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            onClick={() =>
                                                setShowPassword((current) => !current)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOffOutlinedIcon />
                                            ) : (
                                                <VisibilityOutlinedIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "span 2",
                                },
                                ...inputSx,
                            }}
                        />

                        {/* Confirm password */}
                        <TextField
                            fullWidth
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type={
                                showPasswordConfirmation ? "text" : "password"
                            }
                            label="Confirm Password"
                            autoComplete="new-password"
                            value={formik.values.passwordConfirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.passwordConfirmation &&
                                Boolean(formik.errors.passwordConfirmation)
                            }
                            helperText={
                                formik.touched.passwordConfirmation &&
                                formik.errors.passwordConfirmation
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            edge="end"
                                            aria-label={
                                                showPasswordConfirmation
                                                    ? "Hide password confirmation"
                                                    : "Show password confirmation"
                                            }
                                            onClick={() =>
                                                setShowPasswordConfirmation(
                                                    (current) => !current
                                                )
                                            }
                                        >
                                            {showPasswordConfirmation ? (
                                                <VisibilityOffOutlinedIcon />
                                            ) : (
                                                <VisibilityOutlinedIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "span 2",
                                },
                                ...inputSx,
                            }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            minHeight: "48px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            backgroundColor: colors.blueAccent[700],

                            "&:hover": {
                                backgroundColor: colors.blueAccent[600],
                            },

                            "&.Mui-disabled": {
                                backgroundColor: colors.blueAccent[900],
                                color: colors.grey[400],
                            },
                        }}
                    >
                        {formik.isSubmitting ? (
                            <CircularProgress
                                size={23}
                                color="inherit"
                            />
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <Typography
                        textAlign="center"
                        color={colors.grey[300]}
                        sx={{ mt: 3 }}
                    >
                        Already have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                            sx={{
                                color: colors.greenAccent[400],
                                fontWeight: "bold",
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;