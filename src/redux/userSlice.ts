import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

interface User {
    id: number;
    name: string;
    email: string;
}

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
        // Get all users
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

        // Get one user
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

        // Create user
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

        // Update user
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

        // Delete user
        deleteUserStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<number>) {
            state.users = state.users.filter((u) => u.id !== action.payload);
            state.isLoading = false;
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.auth,
            };
        },
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
} = userSlice.actions;

// Thunks

export const fetchUsers = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getUsersStart());
        const response = await axios.get("http://localhost:5000/users");
        const data = response.data;
        dispatch(getUsersSuccess(data));
    } catch (error) {
        dispatch(getUsersFailure(error.message));
    }
};

// export const fetchUser = (id: number): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getUser

export const selectUserState = (state: AppState) => state.user;

export { userSlice };
