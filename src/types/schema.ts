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

export const UpdateProfileSchema = {
    first_name: yup
        .string()
        .max(70, "First name cannot exceed more than 70 characters"),
    last_name: yup
        .string()
        .max(70, "Last name cannot exceed more than 70 characters"),
    password: yup
        .string()
        .min(4, "Password length should be at least 4 characters")
        .max(70, "Password cannot exceed more than 70 characters"),
    confirm_password: yup
        .string()
        .min(4, "Password length should be at least 4 characters")
        .max(70, "Password cannot exceed more than 70 characters")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    username: yup
        .string()
        .max(70, "Username cannot exceed more than 70 characters"),
    gender: yup.string(),
    email: yup
        .string()
        .email()
        .max(255, "Email cannot exceed more than 255 characters"),
    phone: yup.string().max(20, "Phone cannot exceed more than 20 characters"),
    birth_date: yup.string(),
    avatar_image: yup
        .string()
        .max(1024, "Avatar image cannot exceed more than 1024 characters"),
};

export const GroupSchema = yup.object().shape({
    name: yup
        .string()
        .max(50, "Group name cannot exceed more than 50 characters")
        .required("Group name is a required field"),
    description: yup
        .string()
        .max(1024, "Group description cannot exceed more than 1024 characters")
        .required("Group description is a required field"),
    data_created: yup
        .string()
        .required("Group date created is a required field"),
    usersIdList: yup.array().of(yup.string().required("Value is required")),
});

export const BillSchema = yup.object().shape({
    name: yup
        .string()
        .max(50, "Bill name cannot exceed more than 50 characters")
        .required("Bill name is a required field"),
    description: yup
        .string()
        .max(1024, "Bill description cannot exceed more than 1024 characters")
        .required("Description is a required field"),
    data_created: yup.string().required("Data created is a required field"),
    data_end: yup
        .string()
        .test(
            "date-range-validation",
            "Start date must be less than or equal to end date",
            function (value) {
                const startDate = this.parent.data_created
                    ? new Date(this.parent.data_created)
                    : null;
                const endDate = value ? new Date(value) : null;
                if (startDate && endDate) {
                    return startDate <= endDate;
                }
                return true;
            },
        )
        .test(
            "date-today-validation",
            "End date must at least must be from tomorrow",
            function (value) {
                const endDate = value ? new Date(value) : null;
                const today = new Date();
                if (endDate) {
                    const endDateTimestamp = endDate.getTime();
                    const todayTimestamp = today.getTime();
                    return endDateTimestamp > todayTimestamp;
                }
                return true;
            },
        )
        .required("Data end is a required field"),
    bill_image: yup.string(),
    currency_type: yup
        .string()
        .max(20, "Currency type cannot exceed more than 20 characters"),
    currency_code: yup
        .string()
        .max(5, "Currency code cannot exceed more than 5 characters"),
    debt: yup
        .number()
        .typeError("Debt must be a valid number")
        .min(0, "Debt must be at least 0")
        .required(),
    code_qr: yup.string(),
    owner_id: yup.string(),
    group_id: yup.string(),
    usersIdList: yup.array().of(yup.string()),
});
