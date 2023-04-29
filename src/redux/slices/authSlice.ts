import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppState } from "../store";
import { LoginFormData } from "../../types/user";
import { Dispatch } from "redux";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const getInitialState = (): AuthState => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return {
            token,
            isAuthenticated: Boolean(token),
            isLoading: false,
            error: null,
        };
    } else {
        return {
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
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
        registerSuccess: (state, action: PayloadAction<string>) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
            state.token = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
            console.log("auth state", state);
            console.log("action", action.payload);
            state.token = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        logoutSuccess: (state) => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        authError: (state, action: PayloadAction<string>) => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
            console.log("action", action.payload);
            console.log("error", state.error);
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

export const registerUser = (formData: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading());
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/register`,
            formData,
        );
        dispatch(registerSuccess(res.data.token));
    } catch (err) {
        let errorMessage = "An error occurred while registering";
        if (isAxiosError(err)) {
            errorMessage = err.response?.data?.error || errorMessage;
        }
        dispatch(authError(errorMessage));
    }
};

export const loginUser =
    (formData: LoginFormData) => async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading());
            console.log("formData", formData);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/login`,
                formData,
            );
            dispatch(loginSuccess(res.data.JWT));
        } catch (err) {
            let errorMessage = "An error occurred while logging in";
            if (isAxiosError(err)) {
                errorMessage = err.response?.data?.error || errorMessage;
            }
            dispatch(authError(errorMessage));
        }
    };

export const logoutUser = () => async (dispatch: any) => {
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