import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "../store";
import { HYDRATE } from "next-redux-wrapper";
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
    subcomments: Subcomment[];
    billComments: Comment[];
    userCommentsAndSubcomments?: any;
    isLoading: boolean;
    isUpdateLoading: boolean;
    error: string | null;
    success: boolean;
    billCommentsSuccess: boolean;
    isCreateCommentLoading: boolean;
    isCreateSubcommentLoading: boolean;
    isDeleteSubcommentLoading: boolean;
    isSubcommentUpdateLoading: boolean;
    isDeleteCommentLoading: boolean;
    billSubcommentsSuccess: boolean;
    deleteCommentSuccess: boolean;
    createCommentSuccess: boolean;
    deleteSubcommentSuccess: boolean;
    createSubcommentSuccess: boolean;
    updateSubcommentSuccess: boolean;
}

const initialState: CommentState = {
    comments: [],
    subcomments: [],
    billComments: [],
    isLoading: false,
    isUpdateLoading: false,
    isCreateCommentLoading: false,
    isDeleteSubcommentLoading: false,
    isCreateSubcommentLoading: false,
    isSubcommentUpdateLoading: false,
    isDeleteCommentLoading: false,
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
        getSubcommentsStart(state) {
            state.isLoading = true;
            state.error = null;
            state.deleteCommentSuccess = false;
        },
        getSubcommentsSuccess(state, action: PayloadAction<Subcomment[]>) {
            state.subcomments = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getSubcommentsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getUserCommentsAndSubcommentsStart(state) {
            state.isLoading = true;
            state.error = null;
            state.deleteCommentSuccess = false;
        },
        getUserCommentsAndSubcommentsSuccess(
            state,
            action: PayloadAction<Comment[]>,
        ) {
            state.userCommentsAndSubcomments = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getUserCommentsAndSubcommentsFailure(
            state,
            action: PayloadAction<string>,
        ) {
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
            state.isDeleteCommentLoading = true;
            state.error = null;
        },
        deleteCommentSuccess(state, action: PayloadAction<string>) {
            state.comments = state.comments.filter(
                (u) => u.id !== action.payload,
            );
            state.isDeleteCommentLoading = false;
            state.deleteCommentSuccess = true;
        },
        deleteCommentFailure(state, action: PayloadAction<string>) {
            state.isDeleteCommentLoading = false;
            state.error = action.payload;
            state.deleteCommentSuccess = false;
        },

        deleteSubcommentStart(state) {
            state.isDeleteSubcommentLoading = true;
            state.error = null;
        },
        deleteSubcommentSuccess(state, action: PayloadAction<string>) {
            state.comments = state.comments.filter(
                (u) => u.id !== action.payload,
            );
            state.isDeleteSubcommentLoading = false;
            state.deleteSubcommentSuccess = true;
        },
        deleteSubcommentFailure(state, action: PayloadAction<string>) {
            state.isDeleteSubcommentLoading = false;
            state.error = action.payload;
            state.deleteSubcommentSuccess = false;
        },

        commentError: (state, action: PayloadAction<string>) => {
            state.comments = [];
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state: AppState, action: AnyAction) => {
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
    getSubcommentsStart,
    getSubcommentsSuccess,
    getSubcommentsFailure,
    getUserCommentsAndSubcommentsStart,
    getUserCommentsAndSubcommentsSuccess,
    getUserCommentsAndSubcommentsFailure,
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
    deleteSubcommentStart,
    deleteSubcommentSuccess,
    deleteSubcommentFailure,
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

export const fetchSubcomments = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getSubcommentsStart());
        const response = await authAxios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subcomments`,
        );
        const data = response.data;
        dispatch(getSubcommentsSuccess(data));
    } catch (error) {
        dispatch(getSubcommentsFailure(error as string));
    }
};

export const fetchUserCommentsAndSubcomments =
    (userId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getUserCommentsAndSubcommentsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comments/subcomments/user/${userId}`,
            );
            const data = response.data;

            dispatch(getUserCommentsAndSubcommentsSuccess(data));
        } catch (error) {
            dispatch(getUserCommentsAndSubcommentsFailure(error as string));
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

export const deleteSubcomment =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(deleteSubcommentStart());
            await authAxios.delete(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subcomments/${id}`,
            );
            dispatch(deleteSubcommentSuccess(id));
        } catch (error) {
            dispatch(deleteSubcommentFailure(error as string));
        }
    };

export const selectCommentState = (state: AppState) => state.comment;

export { commentSlice };
