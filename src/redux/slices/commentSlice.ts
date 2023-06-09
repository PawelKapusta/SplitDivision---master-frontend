import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import authAxios from "../../api/axios/axios";
import {
    Comment,
    CommentFormData,
    Subcomment,
    SubcommentFormData,
    UpdateCommentFormData,
} from "../../types/comment";

interface CommentState {
    comments: Comment[];
    billComments: Comment[];
    isLoading: boolean;
    isUpdateLoading: boolean;
    error: string | null;
    success: boolean;
    billCommentsSuccess: boolean;
    isCreateCommentLoading: boolean;
    isCreateSubcommentLoading: boolean;
    isSubcommentUpdateLoading: boolean;
    billSubcommentsSuccess: boolean;
    deleteCommentSuccess: boolean;
    createCommentSuccess: boolean;
    deleteSubcommentSuccess: boolean;
    createSubcommentSuccess: boolean;
    updateSubcommentSuccess: boolean;
}

const initialState: CommentState = {
    comments: [],
    billComments: [],
    isLoading: false,
    isUpdateLoading: false,
    isCreateCommentLoading: false,
    isCreateSubcommentLoading: false,
    isSubcommentUpdateLoading: false,
    error: null,
    success: false,
    billCommentsSuccess: false,
    billSubcommentsSuccess: false,
    createCommentSuccess: false,
    deleteCommentSuccess: false,
    deleteSubcommentSuccess: false,
    createSubcommentSuccess: false,
    updateSubcommentSuccess: false,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getCommentsStart(state) {
            state.isLoading = true;
            state.error = null;
            state.deleteCommentSuccess = false;
        },
        getCommentsSuccess(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getCommentsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getBillCommentsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBillCommentsSuccess(state, action: PayloadAction<Comment[]>) {
            state.billComments = action.payload;
            state.isLoading = false;
            state.billCommentsSuccess = true;
        },
        getBillCommentsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.billCommentsSuccess = false;
        },
        createCommentStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createCommentSuccess(state, action: PayloadAction<Comment>) {
            state.comments.push(action.payload);
            state.isCreateCommentLoading = false;
            state.createCommentSuccess = true;
        },
        createCommentFailure(state, action: PayloadAction<string>) {
            state.isCreateCommentLoading = false;
            state.error = action.payload;
            state.createCommentSuccess = false;
        },
        createSubcommentStart(state) {
            state.isCreateSubcommentLoading = true;
            state.error = null;
        },
        createSubcommentSuccess(state, action: PayloadAction<Subcomment>) {
            state.comments.push(action.payload);
            state.isCreateSubcommentLoading = false;
            state.createSubcommentSuccess = true;
        },
        createSubcommentFailure(state, action: PayloadAction<string>) {
            state.isCreateSubcommentLoading = false;
            state.error = action.payload;
            state.createSubcommentSuccess = false;
        },

        updateCommentStart(state) {
            state.isUpdateLoading = true;
            state.error = null;
            state.success = false;
        },
        updateCommentSuccess(state, action: PayloadAction<Comment>) {
            const index = state.comments.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.comments[index] = action.payload;
            state.isUpdateLoading = false;
            state.success = true;
        },
        updateCommentFailure(state, action: PayloadAction<string>) {
            state.isUpdateLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        updateSubcommentStart(state) {
            state.isSubcommentUpdateLoading = true;
            state.error = null;
            state.updateSubcommentSuccess = false;
        },
        updateSubcommentSuccess(state, action: PayloadAction<Subcomment>) {
            const index = state.comments.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.comments[index] = action.payload;
            state.isSubcommentUpdateLoading = false;
            state.updateSubcommentSuccess = true;
        },
        updateSubcommentFailure(state, action: PayloadAction<string>) {
            state.isSubcommentUpdateLoading = false;
            state.error = action.payload;
            state.updateSubcommentSuccess = false;
        },

        deleteCommentStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteCommentSuccess(state, action: PayloadAction<string>) {
            state.comments = state.comments.filter(
                (u) => u.id !== action.payload,
            );
            state.isLoading = false;
            state.deleteCommentSuccess = true;
        },
        deleteCommentFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.deleteCommentSuccess = false;
        },
        commentError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.comments = [];
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
                ...action.payload.comment,
            };
        });
    },
});

export const {
    getCommentsStart,
    getCommentsSuccess,
    getCommentsFailure,
    getBillCommentsStart,
    getBillCommentsSuccess,
    getBillCommentsFailure,
    createCommentStart,
    createCommentSuccess,
    createCommentFailure,
    createSubcommentStart,
    createSubcommentSuccess,
    createSubcommentFailure,
    updateCommentStart,
    updateCommentSuccess,
    updateCommentFailure,
    updateSubcommentStart,
    updateSubcommentSuccess,
    updateSubcommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure,
    commentError,
} = commentSlice.actions;

export const fetchComments = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getCommentsStart());
        const response = await authAxios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments`,
        );
        const data = response.data;
        dispatch(getCommentsSuccess(data));
    } catch (error) {
        dispatch(getCommentsFailure(error as string));
    }
};

export const fetchBillComments =
    (billId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getBillCommentsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments/bill/${billId}`,
            );
            const data = response.data;
            dispatch(getBillCommentsSuccess(data));
        } catch (error) {
            dispatch(getBillCommentsFailure(error as string));
        }
    };

export const createComment =
    (comment: Omit<CommentFormData, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createCommentStart());
            const response = await authAxios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments`,
                comment,
            );
            const data = response.data;
            dispatch(createCommentSuccess(data));
        } catch (error) {
            dispatch(createCommentFailure(error as string));
        }
    };

export const createSubcomment =
    (subcomment: Omit<SubcommentFormData, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createSubcommentStart());
            const response = await authAxios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subcomments`,
                subcomment,
            );
            const data = response.data;
            dispatch(createSubcommentSuccess(data));
        } catch (error) {
            dispatch(createSubcommentFailure(error as string));
        }
    };

export const updateComment =
    (id: string, comment: Partial<UpdateCommentFormData>): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateCommentStart());
            const response = await authAxios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments/${id}`,
                comment,
            );
            const data = response.data;
            dispatch(updateCommentSuccess(data));
        } catch (error) {
            dispatch(updateCommentFailure(error as string));
        }
    };

export const updateSubcomment =
    (id: string, subcomment: Partial<UpdateCommentFormData>): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateSubcommentStart());
            const response = await authAxios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subcomments/${id}`,
                subcomment,
            );
            const data = response.data;
            dispatch(updateSubcommentSuccess(data));
        } catch (error) {
            dispatch(updateSubcommentFailure(error as string));
        }
    };

export const deleteComment =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(deleteCommentStart());
            await authAxios.delete(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments/${id}`,
            );
            dispatch(deleteCommentSuccess(id));
        } catch (error) {
            dispatch(deleteCommentFailure(error as string));
        }
    };

export const selectCommentState = (state: AppState) => state.comment;

export { commentSlice };
