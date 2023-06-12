import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, AppThunk } from "../store";
import { Dispatch } from "redux";
import {
    Subscription,
    SubscriptionsUsers,
    UserSubscriptionFormData,
} from "../../types/subscription";
import authAxios from "../../api/axios/axios";

interface SubscriptionState {
    subscriptions: Subscription[];
    userSubscription: Subscription[];
    subscriptionsBought: SubscriptionsUsers[];
    subscriptionsUsers: SubscriptionsUsers[];
    isLoading: boolean;
    isUserSubscriptionsLoading: boolean;
    isCreateUserSubscriptionLoading: boolean;
    userSubscriptionsSuccess: boolean;
    createUsersSubscriptionSuccess: boolean;
    error: string | null;
    createUsersSubscriptionError: string | null;
}

const initialState: SubscriptionState = {
    subscriptions: [],
    userSubscription: [],
    subscriptionsBought: [],
    subscriptionsUsers: [],
    isLoading: false,
    isUserSubscriptionsLoading: false,
    isCreateUserSubscriptionLoading: false,
    userSubscriptionsSuccess: false,
    createUsersSubscriptionSuccess: false,
    error: null,
    createUsersSubscriptionError: null,
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

        getSubscriptionsBoughtStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getSubscriptionsBoughtSuccess(
            state,
            action: PayloadAction<SubscriptionsUsers[]>,
        ) {
            state.subscriptionsBought = action.payload;
            state.isLoading = false;
        },
        getSubscriptionsBoughtFailure(state, action: PayloadAction<string>) {
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

        createUserSubscriptionStart(state) {
            state.isCreateUserSubscriptionLoading = true;
            state.createUsersSubscriptionSuccess = false;
            state.createUsersSubscriptionError = null;
        },
        createUserSubscriptionSuccess(
            state,
            action: PayloadAction<SubscriptionsUsers>,
        ) {
            state.subscriptionsUsers.push(action.payload);
            state.isCreateUserSubscriptionLoading = false;
            state.createUsersSubscriptionSuccess = true;
        },
        createUserSubscriptionFailure(state, action: PayloadAction<string>) {
            state.isCreateUserSubscriptionLoading = false;
            state.createUsersSubscriptionError = action.payload;
            state.createUsersSubscriptionSuccess = false;
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
    getSubscriptionsBoughtStart,
    getSubscriptionsBoughtSuccess,
    getSubscriptionsBoughtFailure,
    getUserSubscriptionsStart,
    getUserSubscriptionsSuccess,
    getUserSubscriptionsFailure,
    createUserSubscriptionStart,
    createUserSubscriptionSuccess,
    createUserSubscriptionFailure,
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

export const fetchSubscriptionsBought =
    (): AppThunk => async (dispatch: Dispatch) => {
        try {
            dispatch(getSubscriptionsBoughtStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subscriptions/bought`,
            );
            const data = response.data;
            dispatch(getSubscriptionsBoughtSuccess(data));
        } catch (error) {
            dispatch(getSubscriptionsBoughtFailure(error as string));
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

export const createUserSubscription =
    (userSubscription: Omit<UserSubscriptionFormData, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createUserSubscriptionStart());
            const response = await authAxios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/subscriptions/user`,
                userSubscription,
            );
            const data = response.data;
            dispatch(createUserSubscriptionSuccess(data));
        } catch (error) {
            dispatch(createUserSubscriptionFailure(error as string));
        }
    };

export const selectSubscriptionState = (state: AppState) => state.subscription;

export { subscriptionSlice };
