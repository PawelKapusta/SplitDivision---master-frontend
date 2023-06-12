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

export type SortUserAttributeType =
    | "first_name"
    | "last_name"
    | "gender"
    | "email"
    | "is_admin"
    | "is_blocked"
    | "phone"
    | "service";

export const usersStatistics = {
    usersNumber: 0,
    adminUsers: 0,
    blockedUsers: 0,
    services: { website: 0, facebook: 0, google: 0, slack: 0 },
    gender: { male: 0, female: 0, other: 0 },
};

export interface UsersStatistics {
    usersNumber: number;
    adminUsers: number;
    blockedUsers: number;
    services: {
        [key: string]: number;
    };
    gender: {
        [key: string]: number;
    };
}

export interface UserStatisticsObj {
    id: string;
    first_name: string;
    last_name: string;
    password: string;
    username: string;
    gender: "male" | "female" | "other";
    service: "website" | "facebook" | "google" | "slack";
    email: string;
    phone: string;
    birth_date: string;
    is_admin: boolean;
    is_blocked: boolean;
    avatar_image: string;
}

export const singleUserStatistics = {
    groupsNumber: 0,
    billsNumber: 0,
    currencyBillTypesNumber: {},
    currencyBillCodesNumber: {},
    commentsNumber: 0,
    subcommentsNumber: 0,
    subscriptionsNumber: 0,
};

export interface SingleUserStatisticsInterface {
    groupsNumber: number;
    billsNumber: number;
    currencyBillTypesNumber: { [key: string]: number };
    currencyBillCodesNumber: { [key: string]: number };
    commentsNumber: number;
    subcommentsNumber: number;
    subscriptionsNumber: number;
}
