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
    birth_date: Date;
    is_admin: boolean;
    is_blocked: boolean;
    avatar_image: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}
