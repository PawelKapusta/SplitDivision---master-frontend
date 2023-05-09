import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import authAxios from "../../api/axios/axios";
import { UpdateUserFormValues, User } from "../../types/user";

interface UserState {
    users: User[];
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUsersSuccess(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
            state.isLoading = false;
        },
        getUsersFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getUserStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUserSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoading = false;
        },
        getUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        createUserStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createUserSuccess(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
            state.isLoading = false;
        },
        createUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        updateUserStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        updateUserSuccess(state, action: PayloadAction<User>) {
            const index = state.users.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.users[index] = action.payload;
            state.isLoading = false;
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        deleteUserStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<string>) {
            state.users = state.users.filter((u) => u.id !== action.payload);
            state.isLoading = false;
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.users = [];
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
            console.log("action", action.payload);
            console.log("error", state.error);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state: AppState, action: AnyAction) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.auth,
            };
        });
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    userError,
} = userSlice.actions;

export const fetchUsers = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getUsersStart());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users`,
        );
        const data = response.data;
        dispatch(getUsersSuccess(data));
    } catch (error) {
        dispatch(getUsersFailure(error as string));
    }
};

export const fetchUser =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getUserStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/${id}`,
            );
            const data = response.data;
            dispatch(getUserSuccess(data));
        } catch (error) {
            dispatch(getUserFailure(error as string));
        }
    };

export const createUser =
    (user: Omit<User, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createUserStart());
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users`,
                user,
            );
            const data = response.data;
            dispatch(createUserSuccess(data));
        } catch (error) {
            dispatch(createUserFailure(error as string));
        }
    };

export const updateUser =
    (id: string, user: UpdateUserFormValues): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateUserStart());
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/${id}`,
                user,
            );
            const data = response.data;
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error as string));
        }
    };

export const deleteUser =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(deleteUserStart());
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/users/${id}`,
            );
            dispatch(deleteUserSuccess(id));
        } catch (error) {
            dispatch(deleteUserFailure(error as string));
        }
    };

export const selectUserState = (state: AppState) => state.user;

export { userSlice };
