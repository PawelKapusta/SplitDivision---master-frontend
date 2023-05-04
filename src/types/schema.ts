import * as yup from "yup";

export const RegisterSchema = {
    first_name: yup
        .string()
        .max(70, "First name cannot exceed more than 70 characters")
        .required("First name is required"),
    last_name: yup
        .string()
        .max(70, "Last name cannot exceed more than 70 characters")
        .required("Last name is required"),
    password: yup
        .string()
        .min(4, "Password length should be at least 4 characters")
        .max(70, "Password cannot exceed more than 70 characters")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .min(4, "Password length should be at least 4 characters")
        .max(70, "Password cannot exceed more than 70 characters")
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
    username: yup
        .string()
        .max(70, "Username cannot exceed more than 70 characters")
        .required("Username is required"),
    gender: yup
        .string()
        .oneOf(["male", "female", "other"], "Choose one gender")
        .required(),
    service: yup
        .string()
        .oneOf(["website", "facebook", "google", "slack"])
        .default("website"),
    email: yup
        .string()
        .email()
        .max(255, "Email cannot exceed more than 255 characters")
        .required("Email is required"),
    phone: yup
        .string()
        .max(20, "Phone cannot exceed more than 20 characters")
        .required("Phone is required"),
    birth_date: yup.string(),
    avatar_image: yup
        .string()
        .max(1024, "Avatar image cannot exceed more than 1024 characters"),
};
