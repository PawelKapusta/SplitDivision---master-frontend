import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, AppThunk } from "../store";
import { Dispatch } from "redux";
import { FAQ } from "../../types/faq";

interface FAQState {
    faqs: FAQ[];
    isLoading: boolean;
    error: string | null;
}

const initialState: FAQState = {
    faqs: [],
    isLoading: false,
    error: null,
};

const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {
        getFaqsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getFaqsSuccess(state, action: PayloadAction<FAQ[]>) {
            state.faqs = action.payload;
            state.isLoading = false;
        },
        getFaqsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        createFaqStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createFaqSuccess(state, action: PayloadAction<FAQ>) {
            state.faqs.push(action.payload);
            state.isLoading = false;
        },
        createFaqFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        updateFaqStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        updateFaqSuccess(state, action: PayloadAction<FAQ>) {
            const index = state.faqs.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.faqs[index] = action.payload;
            state.isLoading = false;
        },
        updateFaqFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        deleteFaqStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteFaqSuccess(state, action: PayloadAction<string>) {
            state.faqs = state.faqs.filter((u) => u.id !== action.payload);
            state.isLoading = false;
        },
        deleteFaqFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        faqError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.faqs = [];
            state.isLoading = false;
            state.error = action.payload;
            console.log("action", action.payload);
            console.log("error", state.error);
        },
    },
});

export const {
    getFaqsStart,
    getFaqsSuccess,
    getFaqsFailure,
    createFaqStart,
    createFaqSuccess,
    createFaqFailure,
    updateFaqStart,
    updateFaqSuccess,
    updateFaqFailure,
    deleteFaqStart,
    deleteFaqSuccess,
    deleteFaqFailure,
    faqError,
} = faqSlice.actions;

export const fetchFaqs = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getFaqsStart());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/faqs`,
        );
        const data = response.data;
        dispatch(getFaqsSuccess(data));
    } catch (error) {
        dispatch(getFaqsFailure(error as string));
    }
};

export const selectFaqState = (state: AppState) => state.faq;

export { faqSlice };
