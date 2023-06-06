import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, AppThunk } from "../store";
import { Dispatch } from "redux";
import { fiatCurrencyNames, Currency } from "../../types/currency";

interface CurrencyState {
    fiatCurrencies: Currency[];
    convertedFiatAmount: number | null;
    isLoading: boolean;
    isFiatConvertLoading: boolean;
    error: string | null;
}

const initialState: CurrencyState = {
    fiatCurrencies: [],
    convertedFiatAmount: null,
    isLoading: false,
    isFiatConvertLoading: false,
    error: null,
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        getFiatCurrenciesStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getFiatCurrenciesSuccess(state, action: PayloadAction<Currency[]>) {
            console.log("action", action, action.payload);
            state.fiatCurrencies = action.payload;
            state.isLoading = false;
        },
        getFiatCurrenciesFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getFiatCurrencyConvertStart(state) {
            state.isFiatConvertLoading = true;
            state.error = null;
        },
        getFiatCurrencyConvertSuccess(
            state,
            action: PayloadAction<number | null>,
        ) {
            state.convertedFiatAmount = action.payload;
            state.isFiatConvertLoading = false;
        },
        getFiatCurrencyConvertFailure(state, action: PayloadAction<string>) {
            state.isFiatConvertLoading = false;
            state.error = action.payload;
        },
        currencyError: (state, action: PayloadAction<string>) => {
            console.log("auth state", state);
            console.log("auth eroror", state.error);
            state.fiatCurrencies = [];
            state.isLoading = false;
            state.error = action.payload;
            console.log("action", action.payload);
            console.log("error", state.error);
        },
    },
});

export const {
    getFiatCurrenciesStart,
    getFiatCurrenciesSuccess,
    getFiatCurrenciesFailure,
    getFiatCurrencyConvertStart,
    getFiatCurrencyConvertSuccess,
    getFiatCurrencyConvertFailure,
} = currencySlice.actions;

const getCurrencyName = (code: string) => {
    const currency = fiatCurrencyNames.find(
        (currency: Currency) => currency.code === code,
    );
    return currency ? currency.name : "";
};

export const fetchFiatCurrencies =
    (): AppThunk => async (dispatch: Dispatch) => {
        try {
            dispatch(getFiatCurrenciesStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_FIAT_CURRENCY_ENPOINT}`,
            );
            const allRates = response.data.rates;
            const codes = Object.keys(allRates);
            const data: Currency[] = codes.map((code: string) => ({
                code,
                name: getCurrencyName(code),
            }));
            dispatch(getFiatCurrenciesSuccess(data));
        } catch (error) {
            dispatch(getFiatCurrenciesFailure(error as string));
        }
    };

export const fetchFiatConvertedAmount =
    (from: Currency, to: Currency, amount: number): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getFiatCurrencyConvertStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_FIAT_CURRENCY_AMOUNT_ENPOINT}${from?.code}`,
            );
            const allRates = response.data.rates;
            const rate = allRates[to?.code];
            const currencyConverted = amount * rate;
            dispatch(getFiatCurrencyConvertSuccess(currencyConverted));
        } catch (error) {
            dispatch(getFiatCurrencyConvertFailure(error as string));
        }
    };

export const selectCurrencyState = (state: AppState) => state.currency;

export { currencySlice };
