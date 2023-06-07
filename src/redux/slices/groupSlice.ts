import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import authAxios from "../../api/axios/axios";
import { Group, GroupFormData } from "../../types/group";
import { User } from "../../types/user";

interface GroupState {
    groups: Group[];
    userGroups: Group[];
    groupUsers: User[];
    group: Group | null;
    isLoading: boolean;
    error: string | null;
    success: boolean;
    userGroupsSuccess: boolean;
    groupUsersSuccess: boolean;
    deleteGroupSuccess: boolean;
}

const initialState: GroupState = {
    groups: [],
    userGroups: [],
    groupUsers: [],
    group: null,
    isLoading: false,
    error: null,
    success: false,
    userGroupsSuccess: false,
    groupUsersSuccess: false,
    deleteGroupSuccess: false,
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        getGroupsStart(state) {
            state.isLoading = true;
            state.error = null;
            state.deleteGroupSuccess = false;
        },
        getGroupsSuccess(state, action: PayloadAction<Group[]>) {
            state.groups = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getGroupsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getUserGroupsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUserGroupsSuccess(state, action: PayloadAction<Group[]>) {
            state.userGroups = action.payload;
            state.isLoading = false;
            state.userGroupsSuccess = true;
        },
        getUserGroupsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.userGroupsSuccess = false;
        },
        getGroupUsersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getGroupUsersSuccess(state, action: PayloadAction<User[]>) {
            state.groupUsers = action.payload;
            state.isLoading = false;
            state.groupUsersSuccess = true;
        },
        getGroupUsersFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.groupUsersSuccess = false;
        },

        getGroupStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getGroupSuccess(state, action: PayloadAction<Group>) {
            state.group = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getGroupFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        createGroupStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createGroupSuccess(state, action: PayloadAction<Group>) {
            state.groups.push(action.payload);
            state.isLoading = false;
            state.success = true;
        },
        createGroupFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        updateGroupStart(state) {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        updateGroupSuccess(state, action: PayloadAction<Group>) {
            const index = state.groups.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.groups[index] = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        updateGroupFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        deleteGroupStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteGroupSuccess(state, action: PayloadAction<string>) {
            state.groups = state.groups.filter((u) => u.id !== action.payload);
            state.isLoading = false;
            state.deleteGroupSuccess = true;
        },
        deleteGroupFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.deleteGroupSuccess = false;
        },
        groupError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.groups = [];
            state.group = null;
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
            console.log("action", action.payload);
            console.log("error", state.error);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state: AppState, action: AnyAction) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.group,
            };
        });
    },
});

export const {
    getGroupsStart,
    getGroupsSuccess,
    getGroupsFailure,
    getUserGroupsStart,
    getUserGroupsSuccess,
    getUserGroupsFailure,
    getGroupUsersStart,
    getGroupUsersSuccess,
    getGroupUsersFailure,
    getGroupStart,
    getGroupSuccess,
    getGroupFailure,
    createGroupStart,
    createGroupSuccess,
    createGroupFailure,
    updateGroupStart,
    updateGroupSuccess,
    updateGroupFailure,
    deleteGroupStart,
    deleteGroupSuccess,
    deleteGroupFailure,
    groupError,
} = groupSlice.actions;

export const fetchGroups = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getGroupsStart());
        const response = await authAxios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups`,
        );
        const data = response.data;
        dispatch(getGroupsSuccess(data));
    } catch (error) {
        dispatch(getGroupsFailure(error as string));
    }
};

export const fetchUserGroups =
    (userId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getUserGroupsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups/user/${userId}`,
            );
            const data = response.data;
            dispatch(getUserGroupsSuccess(data));
        } catch (error) {
            dispatch(getUserGroupsFailure(error as string));
        }
    };

export const fetchGroupUsers =
    (groupId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getGroupUsersStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups/${groupId}/users`,
            );
            const data = response.data;
            dispatch(getGroupUsersSuccess(data));
        } catch (error) {
            dispatch(getGroupUsersFailure(error as string));
        }
    };

export const fetchGroup =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getGroupStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups/${id}`,
            );
            const data = response.data;
            dispatch(getGroupSuccess(data));
        } catch (error) {
            dispatch(getGroupFailure(error as string));
        }
    };

export const createGroup =
    (group: Omit<GroupFormData, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createGroupStart());
            const response = await authAxios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups`,
                group,
            );
            const data = response.data;
            dispatch(createGroupSuccess(data));
        } catch (error) {
            dispatch(createGroupFailure(error as string));
        }
    };

export const updateGroup =
    (id: string, group: Group): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateGroupStart());
            const response = await authAxios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups/${id}`,
                group,
            );
            const data = response.data;
            dispatch(updateGroupSuccess(data));
        } catch (error) {
            dispatch(updateGroupFailure(error as string));
        }
    };

export const deleteGroup =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(deleteGroupStart());
            await authAxios.delete(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/groups/${id}`,
            );
            dispatch(deleteGroupSuccess(id));
        } catch (error) {
            dispatch(deleteGroupFailure(error as string));
        }
    };

export const selectGroupState = (state: AppState) => state.group;

export { groupSlice };
