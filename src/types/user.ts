export interface User {
    id: string;
    first_name: string;
    last_name: string;
    password: string;
    username: string;
    gender: string;
    service: string;
    email: string;
    phone: string;
    birth_date: string;
    is_admin: boolean;
    is_blocked: boolean;
    avatar_image: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
    username: string;
    gender: "male" | "female" | "other";
    service: "website" | "facebook" | "google" | "slack";
    email: string;
    phone: string;
    birth_date: string;
    avatar_image: string;
}

export interface UpdateUserFormValues {
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm_password?: string;
    username?: string;
    gender?: "male" | "female" | "other";
    email?: string;
    phone?: string;
    birth_date?: string;
    avatar_image?: string;
}

export interface AdminUpdateUserFormValues {
    is_blocked: boolean;
    is_admin: boolean;
}
