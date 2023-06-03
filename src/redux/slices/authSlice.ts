import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppState } from "../store";
import { LoginFormData, RegisterFormValues } from "../../types/user";
import { Dispatch } from "redux";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    userId?: string;
    registerSuccess: boolean;
}

const getInitialState = (): AuthState => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return {
            token,
            isAuthenticated: Boolean(token),
            isLoading: false,
            error: null,
            registerSuccess: false,
        };
    } else {
        return {
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            registerSuccess: false,
        };
    }
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        registerSuccess: (state, action: PayloadAction<{ JWT: string }>) => {
            state.registerSuccess = true;
            state.isAuthenticated = false;
            state.isLoading = false;

            setTimeout(() => {
                state.registerSuccess = false;
            }, 5000);
        },
        loginSuccess: (
            state,
            action: PayloadAction<{ JWT: string; userId: string }>,
        ) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload.JWT);
            }
            state.token = action.payload.JWT;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.userId = action.payload.userId;
            state.registerSuccess = false;
        },
        logoutSuccess: (state) => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            state.registerSuccess = false;
        },
        authError: (state, action: PayloadAction<string>) => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
            state.registerSuccess = false;
        },
    },
});

export const {
    setLoading,
    registerSuccess,
    loginSuccess,
    logoutSuccess,
    authError,
} = authSlice.actions;

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

export const registerUser =
    (formData: RegisterFormValues) => async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/register`,
                formData,
            );
            dispatch(registerSuccess(res.data));
        } catch (err) {
            let errorMessage = "An error occurred while registering",
                mappedValidationError = "";
            if (isAxiosError(err)) {
                if (
                    err.response?.data.error.validationErrors &&
                    err.response?.data.error.validationErros?.length !== 0
                ) {
                    const message =
                        err.response?.data.error.validationErrors[0].message;
                    if (message === "Validation isEmail on email failed") {
                        mappedValidationError = "Your email is invalid";
                    } else if (message === "INVALID_COUNTRY") {
                        mappedValidationError =
                            "Invalid country in phone number";
                    } else if (message === "NOT_A_NUMBER") {
                        mappedValidationError = "Invalid phone number";
                    }
                    errorMessage = mappedValidationError || errorMessage;
                } else {
                    errorMessage = err.response?.data?.error || errorMessage;
                }
                dispatch(authError(errorMessage));
            }
            dispatch(authError(errorMessage));
        }
    };

export const loginUser =
    (formData: LoginFormData) => async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/login`,
                formData,
            );
            dispatch(loginSuccess(res.data));
        } catch (err) {
            let errorMessage = "An error occurred while logging in";
            if (isAxiosError(err)) {
                errorMessage = err.response?.data?.error || errorMessage;
            }
            dispatch(authError(errorMessage));
        }
    };

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading());
        dispatch(logoutSuccess());
    } catch (err) {
        let errorMessage = "An error occurred while logging out";
        if (isAxiosError(err)) {
            errorMessage = err.response?.data?.error || errorMessage;
        }
        dispatch(authError(errorMessage));
    }
};

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
