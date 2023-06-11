import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Dispatch } from "redux";
import authAxios from "../../api/axios/axios";
import {
    Bill,
    BillFormData,
    BillsUsers,
    BillsUsersUpdateData,
} from "../../types/bill";
import { User } from "next-auth";

interface BillState {
    bills: Bill[];
    userBills: Bill[];
    groupBills: Bill[];
    billUsers: User[];
    bills_users: BillsUsers[];
    bill: Bill | null;
    isLoading: boolean;
    isLoadingBillsUsersLoading: boolean;
    success: boolean;
    createBillSuccess: boolean;
    billsUsersSuccess: boolean;
    userBillsSuccess: boolean;
    groupBillsSuccess: boolean;
    billUsersSuccess: boolean;
    deleteBillSuccess: boolean;
    error: string | null;
    billsUsersError: string | null;
}

const initialState: BillState = {
    bills: [],
    userBills: [],
    groupBills: [],
    billUsers: [],
    bills_users: [],
    bill: null,
    isLoading: false,
    isLoadingBillsUsersLoading: false,
    success: false,
    userBillsSuccess: false,
    billsUsersSuccess: false,
    createBillSuccess: false,
    groupBillsSuccess: false,
    billUsersSuccess: false,
    deleteBillSuccess: false,
    error: null,
    billsUsersError: null,
};

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        getBillsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBillsSuccess(state, action: PayloadAction<Bill[]>) {
            state.bills = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getBillsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getUserBillsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUserBillsSuccess(state, action: PayloadAction<Bill[]>) {
            state.userBills = action.payload;
            state.isLoading = false;
            state.userBillsSuccess = true;
        },
        getUserBillsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.userBillsSuccess = false;
        },
        getGroupBillsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getGroupBillsSuccess(state, action: PayloadAction<Bill[]>) {
            state.groupBills = action.payload;
            state.isLoading = false;
            state.groupBillsSuccess = true;
        },
        getGroupBillsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.groupBillsSuccess = false;
        },
        getBillUsersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBillUsersSuccess(state, action: PayloadAction<User[]>) {
            state.billUsers = action.payload;
            state.isLoading = false;
            state.billUsersSuccess = true;
        },
        getBillUsersFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.billUsersSuccess = false;
        },

        getBillStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBillSuccess(state, action: PayloadAction<Bill>) {
            state.bill = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        getBillFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        createBillStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        createBillSuccess(state, action: PayloadAction<Bill>) {
            state.bills.push(action.payload);
            state.isLoading = false;
            state.createBillSuccess = true;
        },
        createBillFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.createBillSuccess = false;
        },

        updateBillStart(state) {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        updateBillSuccess(state, action: PayloadAction<Bill>) {
            const index = state.bills.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.bills[index] = action.payload;
            state.isLoading = false;
            state.success = true;
        },
        updateBillFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },

        updateBillsUsersStart(state) {
            state.isLoadingBillsUsersLoading = true;
            state.billsUsersError = null;
            state.billsUsersSuccess = false;
        },
        updateBillsUsersSuccess(state, action: PayloadAction<BillsUsers>) {
            const index = state.bills_users.findIndex(
                (u) => u.id === action.payload.id,
            );
            state.bills_users[index] = action.payload;
            state.isLoadingBillsUsersLoading = false;
            state.billsUsersSuccess = true;
        },
        updateBillsUsersFailure(state, action: PayloadAction<string>) {
            state.isLoadingBillsUsersLoading = false;
            state.billsUsersError = action.payload;
            state.billsUsersSuccess = false;
        },

        deleteBillStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteBillSuccess(state, action: PayloadAction<string>) {
            state.bills = state.bills.filter((u) => u.id !== action.payload);
            state.isLoading = false;
            state.deleteBillSuccess = true;
        },
        deleteBillFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
            state.deleteBillSuccess = false;
        },
        billError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.bills = [];
            state.bill = null;
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
                ...action.payload.bill,
            };
        });
    },
});

export const {
    getBillsStart,
    getBillsSuccess,
    getBillsFailure,
    getUserBillsStart,
    getUserBillsSuccess,
    getUserBillsFailure,
    getGroupBillsStart,
    getGroupBillsSuccess,
    getGroupBillsFailure,
    getBillUsersStart,
    getBillUsersSuccess,
    getBillUsersFailure,
    getBillStart,
    getBillSuccess,
    getBillFailure,
    createBillStart,
    createBillSuccess,
    createBillFailure,
    updateBillStart,
    updateBillSuccess,
    updateBillFailure,
    updateBillsUsersStart,
    updateBillsUsersSuccess,
    updateBillsUsersFailure,
    deleteBillStart,
    deleteBillSuccess,
    deleteBillFailure,
    billError,
} = billSlice.actions;

export const fetchBills = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(getBillsStart());
        const response = await authAxios.get(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills`,
        );
        const data = response.data;
        dispatch(getBillsSuccess(data));
    } catch (error) {
        dispatch(getBillsFailure(error as string));
    }
};

export const fetchUserBills =
    (userId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getUserBillsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/user/${userId}`,
            );
            const data = response.data;
            dispatch(getUserBillsSuccess(data));
        } catch (error) {
            dispatch(getUserBillsFailure(error as string));
        }
    };

export const fetchGroupBills =
    (groupId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getGroupBillsStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/group/${groupId}`,
            );
            console.log("data", response);
            const data = response.data;
            dispatch(getGroupBillsSuccess(data));
        } catch (error) {
            dispatch(getGroupBillsFailure(error as string));
        }
    };

export const fetchBillUsers =
    (billId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getBillUsersStart());
            const path =
                process.env.NEXT_PUBLIC_API_GATEWAY_URL +
                "/bills/" +
                billId +
                "/users";
            const response = await authAxios.get(`${path}`);
            const data = response.data;
            dispatch(getBillUsersSuccess(data));
        } catch (error) {
            dispatch(getBillUsersFailure(error as string));
        }
    };

export const fetchBill =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getBillStart());
            const response = await authAxios.get(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/${id}`,
            );
            const data = response.data;
            console.log("data", data);
            dispatch(getBillSuccess(data));
        } catch (error) {
            dispatch(getBillFailure(error as string));
        }
    };

export const createBill =
    (bill: Omit<BillFormData, "id">): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(createBillStart());
            const response = await authAxios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills`,
                bill,
            );
            const data = response.data;
            dispatch(createBillSuccess(data));
        } catch (error) {
            dispatch(createBillFailure(error as string));
        }
    };

export const updateBill =
    (id: string, bill: Bill): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateBillStart());
            const response = await authAxios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/${id}`,
                bill,
            );
            const data = response.data;
            dispatch(updateBillSuccess(data));
        } catch (error) {
            dispatch(updateBillFailure(error as string));
        }
    };

export const updateBillsUsers =
    (id: string, bills_users: BillsUsersUpdateData): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(updateBillsUsersStart());
            const response = await authAxios.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/user/${id}`,
                bills_users,
            );
            const data = response.data;
            dispatch(updateBillsUsersSuccess(data));
        } catch (error) {
            dispatch(updateBillsUsersFailure(error as string));
        }
    };

export const deleteBill =
    (id: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(deleteBillStart());
            await authAxios.delete(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/bills/${id}`,
            );
            dispatch(deleteBillSuccess(id));
        } catch (error) {
            dispatch(deleteBillFailure(error as string));
        }
    };

export const selectBillState = (state: AppState) => state.bill;

export { billSlice };
