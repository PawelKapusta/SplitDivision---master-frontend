import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, AppThunk } from "../store";
import { Dispatch } from "redux";
import { Subscription } from "../../types/subscription";
import authAxios from "../../api/axios/axios";

interface SubscriptionState {
    subscriptions: Subscription[];
    userSubscription: Subscription[];
    isLoading: boolean;
    isUserSubscriptionsLoading: boolean;
    userSubscriptionsSuccess: boolean;
    error: string | null;
}

const initialState: SubscriptionState = {
    subscriptions: [],
    userSubscription: [],
    isLoading: false,
    isUserSubscriptionsLoading: false,
    userSubscriptionsSuccess: false,
    error: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        getSubscriptionsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getSubscriptionsSuccess(state, action: PayloadAction<Subscription[]>) {
            state.subscriptions = action.payload;
            state.isLoading = false;
        },
        getSubscriptionsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getUserSubscriptionsStart(state) {
            state.isUserSubscriptionsLoading = true;
            state.error = null;
        },
        getUserSubscriptionsSuccess(
            state,
            action: PayloadAction<Subscription[]>,
        ) {
            state.userSubscription = action.payload;
            state.isUserSubscriptionsLoading = false;
            state.userSubscriptionsSuccess = true;
        },
        getUserSubscriptionsFailure(state, action: PayloadAction<string>) {
            state.isUserSubscriptionsLoading = false;
            state.error = action.payload;
            state.userSubscriptionsSuccess = false;
        },

        createSubscriptionStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createSubscriptionSuccess(state, action: PayloadAction<Subscription>) {
            state.subscriptions.push(action.payload);
            state.isLoading = false;
        },
        createSubscriptionFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        updateSubscriptionStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        updateSubscriptionSuccess(state, action: PayloadAction<Subscription>) {
            const index = state.subscriptions.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.subscriptions[index] = action.payload;
            state.isLoading = false;
        },
        updateSubscriptionFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

        deleteSubscriptionStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteSubscriptionSuccess(state, action: PayloadAction<string>) {
            state.subscriptions = state.subscriptions.filter(
                (u) => u.id !== action.payload,
            );
            state.isLoading = false;
        },
        deleteSubscriptionFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        subscriptionError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.subscriptions = [];
            state.isLoading = false;
            state.error = action.payload;
            console.log("action", action.payload);
            console.log("error", state.error);
        },
    },
});

export const {
    getSubscriptionsStart,
    getSubscriptionsSuccess,
    getSubscriptionsFailure,
    getUserSubscriptionsStart,
    getUserSubscriptionsSuccess,
    getUserSubscriptionsFailure,
    createSubscriptionStart,
    createSubscriptionSuccess,
    createSubscriptionFailure,
    updateSubscriptionStart,
    updateSubscriptionSuccess,
    updateSubscriptionFailure,
    deleteSubscriptionStart,
    deleteSubscriptionSuccess,
    deleteSubscriptionFailure,
    subscriptionError,
} = subscriptionSlice.actions;

export const fetchSubscriptions =
    (): AppThunk => async (dispatch: Dispatch) => {
        try {
            dispatch(getSubscriptionsStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subscriptions`,
            );
            const data = response.data;
            dispatch(getSubscriptionsSuccess(data));
        } catch (error) {
            dispatch(getSubscriptionsFailure(error as string));
        }
    };

export const fetchUserSubscriptions =
    (userId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getUserSubscriptionsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subscriptions/user/${userId}`,
            );
            const data = response.data;
            dispatch(getUserSubscriptionsSuccess(data));
        } catch (error) {
            dispatch(getUserSubscriptionsFailure(error as string));
        }
    };

export const selectSubscriptionState = (state: AppState) => state.subscription;

export { subscriptionSlice };
