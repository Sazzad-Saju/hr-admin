import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { useAuth } from "../../auth/AuthContext";
import { tokens } from "../../theme";

const validationSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email("Enter a valid email address.")
        .required("Email address is required."),

    password: yup
        .string()
        .required("Password is required."),
});

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },

        validationSchema,

        onSubmit: async (values, actions) => {
            setServerError("");

            try {
                await login(
                    {
                        email: values.email.trim(),
                        password: values.password,
                    },
                    values.remember
                );

                const from = location.state?.from;
                const redirectPath = from
                    ? `${from.pathname}${from.search || ""}${from.hash || ""}`
                    : "/";

                navigate(redirectPath, {
                    replace: true,
                });
            } catch (error) {
                const validationErrors =
                    error.response?.data?.errors;

                if (validationErrors) {
                    const formErrors = {};

                    Object.entries(validationErrors).forEach(
                        ([fieldName, messages]) => {
                            formErrors[fieldName] = Array.isArray(messages)
                                ? messages[0]
                                : messages;
                        }
                    );

                    actions.setErrors(formErrors);

                    setServerError(
                        "Please correct the highlighted fields."
                    );
                } else if (
                    error.response?.status === 401 ||
                    error.response?.status === 422
                ) {
                    setServerError(
                        error.response?.data?.message ||
                        "The provided email or password is incorrect."
                    );
                } else if (error.response?.status === 429) {
                    setServerError(
                        "Too many login attempts. Please try again later."
                    );
                } else {
                    setServerError(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to sign in. Please try again."
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
                    maxWidth: "460px",
                    backgroundColor: colors.primary[400],
                    borderRadius: 3,

                    p: {
                        xs: 3,
                        sm: 5,
                    },

                    boxShadow: 8,
                }}
            >
                {/* Company logo placeholder */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 3,
                    }}
                >
                    <Box component="img"
                        src="/assets/live_logo2.gif"
                        alt="Company logo"
                        sx={{
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                <Typography
                    variant="h2"
                    textAlign="center"
                    fontWeight="700"
                    color={colors.grey[100]}
                >
                    Welcome Back
                </Typography>

                <Typography
                    variant="h5"
                    textAlign="center"
                    color={colors.grey[300]}
                    sx={{
                        mt: 1,
                        mb: 4,
                    }}
                >
                    Sign in to continue to the HR administration panel
                </Typography>

                {serverError && (
                    <Alert
                        severity="error"
                        onClose={() => setServerError("")}
                        sx={{
                            mb: 3,
                        }}
                    >
                        {serverError}
                    </Alert>
                )}

                <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    {/* Email address */}
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
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
                            mb: 2,
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
                        autoComplete="current-password"
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
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                        }}
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
                        sx={inputSx}
                    />

                    {/* Remember me and forgot password */}
                    <Box
                        sx={{
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={formik.values.remember}
                                    onChange={formik.handleChange}
                                    sx={{
                                        color: colors.grey[400],

                                        "&.Mui-checked": {
                                            color: colors.blueAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Remember me"
                            sx={{
                                color: colors.grey[300],

                                "& .MuiFormControlLabel-label": {
                                    fontSize: {
                                        xs: "13px",
                                        sm: "14px",
                                    },
                                },
                            }}
                        />
                    </Box>

                    {/* Submit button */}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                        startIcon={
                            !formik.isSubmitting ? (
                                <LoginOutlinedIcon />
                            ) : null
                        }
                        sx={{
                            mt: 2,
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
                            "Sign In"
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
