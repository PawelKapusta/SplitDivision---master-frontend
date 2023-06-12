import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, AppThunk } from "../store";
import { Dispatch } from "redux";
import { Currency, fiatCurrencyNames, TCrypto } from "../../types/currency";

interface CurrencyState {
    fiatCurrencies: Currency[];
    cryptoCurrencies: TCrypto[];
    cryptoCurrenciesToChart: TCrypto[];
    cryptoCurrencyData: TCrypto[];
    cryptoCurrenciesRatesToFiatCurrencies: any;
    supportedFiatCurrenciesWithCryptoCurrencies: [];
    convertedFiatTotal: number | null;
    isLoading: boolean;
    isFiatConvertLoading: boolean;
    isCryptoCurrencyDataLoading: boolean;
    isCryptoCurrenciesToChartLoading: boolean;
    isFetchCryptoCurrenciesLoading: boolean;
    isSupportedFiatCurrenciesWithCryptoCurrenciesLoading: boolean;
    isCryptoCurrenciesRatesToFiatCurrenciesLoading: boolean;
    error: string | null;
}

const initialState: CurrencyState = {
    fiatCurrencies: [],
    cryptoCurrencies: [],
    cryptoCurrenciesToChart: [],
    cryptoCurrencyData: [],
    cryptoCurrenciesRatesToFiatCurrencies: {},
    supportedFiatCurrenciesWithCryptoCurrencies: [],
    convertedFiatTotal: null,
    isLoading: false,
    isCryptoCurrenciesToChartLoading: false,
    isCryptoCurrencyDataLoading: false,
    isFiatConvertLoading: false,
    isFetchCryptoCurrenciesLoading: false,
    isSupportedFiatCurrenciesWithCryptoCurrenciesLoading: false,
    isCryptoCurrenciesRatesToFiatCurrenciesLoading: false,
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
        getCryptoCurrenciesStart(state) {
            state.isFetchCryptoCurrenciesLoading = true;
            state.error = null;
        },
        getCryptoCurrenciesSuccess(state, action: PayloadAction<TCrypto[]>) {
            console.log("action", action, action.payload);
            state.cryptoCurrencies = action.payload;
            state.isFetchCryptoCurrenciesLoading = false;
        },
        getCryptoCurrenciesFailure(state, action: PayloadAction<string>) {
            state.isFetchCryptoCurrenciesLoading = false;
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
            state.convertedFiatTotal = action.payload;
            state.isFiatConvertLoading = false;
        },
        getFiatCurrencyConvertFailure(state, action: PayloadAction<string>) {
            state.isFiatConvertLoading = false;
            state.error = action.payload;
        },
        getSupportedFiatCurrenciesWithCryptoCurrenciesStart(state) {
            state.isSupportedFiatCurrenciesWithCryptoCurrenciesLoading = true;
            state.error = null;
        },
        getSupportedFiatCurrenciesWithCryptoCurrenciesSuccess(
            state,
            action: PayloadAction<[]>,
        ) {
            state.supportedFiatCurrenciesWithCryptoCurrencies = action.payload;
            state.isSupportedFiatCurrenciesWithCryptoCurrenciesLoading = false;
        },
        getSupportedFiatCurrenciesWithCryptoCurrenciesFailure(
            state,
            action: PayloadAction<string>,
        ) {
            state.isSupportedFiatCurrenciesWithCryptoCurrenciesLoading = false;
            state.error = action.payload;
        },
        getCryptoCurrenciesRatesToFiatCurrenciesStart(state) {
            state.isCryptoCurrenciesRatesToFiatCurrenciesLoading = true;
            state.error = null;
        },
        getCryptoCurrenciesRatesToFiatCurrenciesSuccess(
            state,
            action: PayloadAction<any>,
        ) {
            state.cryptoCurrenciesRatesToFiatCurrencies = action.payload;
            state.isCryptoCurrenciesRatesToFiatCurrenciesLoading = false;
        },
        getCryptoCurrenciesRatesToFiatCurrenciesFailure(
            state,
            action: PayloadAction<string>,
        ) {
            state.isCryptoCurrenciesRatesToFiatCurrenciesLoading = false;
            state.error = action.payload;
        },

        getCryptoCurrenciesToChartStart(state) {
            state.isCryptoCurrenciesToChartLoading = true;
            state.error = null;
        },
        getCryptoCurrenciesToChartSuccess(state, action: PayloadAction<any>) {
            state.cryptoCurrenciesToChart = action.payload;
            state.isCryptoCurrenciesToChartLoading = false;
        },
        getCryptoCurrenciesToChartFailure(
            state,
            action: PayloadAction<string>,
        ) {
            state.isCryptoCurrenciesToChartLoading = false;
            state.error = action.payload;
        },

        getCryptoCurrencyDataStart(state) {
            state.isCryptoCurrencyDataLoading = true;
            state.error = null;
        },
        getCryptoCurrencyDataSuccess(state, action: PayloadAction<any>) {
            state.cryptoCurrencyData = action.payload;
            state.isCryptoCurrencyDataLoading = false;
        },
        getCryptoCurrencyDataFailure(state, action: PayloadAction<string>) {
            state.isCryptoCurrencyDataLoading = false;
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
    getCryptoCurrenciesStart,
    getCryptoCurrenciesSuccess,
    getCryptoCurrenciesFailure,
    getFiatCurrencyConvertStart,
    getFiatCurrencyConvertSuccess,
    getFiatCurrencyConvertFailure,
    getSupportedFiatCurrenciesWithCryptoCurrenciesStart,
    getSupportedFiatCurrenciesWithCryptoCurrenciesSuccess,
    getSupportedFiatCurrenciesWithCryptoCurrenciesFailure,
    getCryptoCurrenciesRatesToFiatCurrenciesStart,
    getCryptoCurrenciesRatesToFiatCurrenciesSuccess,
    getCryptoCurrenciesRatesToFiatCurrenciesFailure,
    getCryptoCurrenciesToChartStart,
    getCryptoCurrenciesToChartSuccess,
    getCryptoCurrenciesToChartFailure,
    getCryptoCurrencyDataStart,
    getCryptoCurrencyDataSuccess,
    getCryptoCurrencyDataFailure,
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

export const fetchCryptoCurrencies =
    (): AppThunk => async (dispatch: Dispatch) => {
        try {
            dispatch(getCryptoCurrenciesStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_CRYPTO_CURRENCY_ENPOINT}`,
            );
            dispatch(getCryptoCurrenciesSuccess(response.data));
        } catch (error) {
            dispatch(getCryptoCurrenciesFailure(error as string));
        }
    };

export const fetchFiatConvertedTotal =
    (from: Currency, to: Currency, total: number): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getFiatCurrencyConvertStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_FIAT_CURRENCY_TOTAL_ENPOINT}${from?.code}`,
            );
            const currencyConverted = total * response.data.rates[to?.code];
            dispatch(getFiatCurrencyConvertSuccess(currencyConverted));
        } catch (error) {
            dispatch(getFiatCurrencyConvertFailure(error as string));
        }
    };

export const fetchSupportedFiatCurrenciesWithCryptoCurrencies =
    (): AppThunk => async (dispatch: Dispatch) => {
        try {
            dispatch(getSupportedFiatCurrenciesWithCryptoCurrenciesStart());
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SUPPORTED_FIAT_CURRENCIES_WITH_CRYPTO_CURRENCIES_ENPOINT}`,
            );
            const most100popularCurrencies = response.data.slice(0, 100);
            dispatch(
                getSupportedFiatCurrenciesWithCryptoCurrenciesSuccess(
                    most100popularCurrencies,
                ),
            );
        } catch (error) {
            dispatch(
                getSupportedFiatCurrenciesWithCryptoCurrenciesFailure(
                    error as string,
                ),
            );
        }
    };

export const fetchCryptoCurrenciesRatesToFiatCurrencies =
    (cryptoCurrencies: TCrypto[], allCurrencies: string[]): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getCryptoCurrenciesRatesToFiatCurrenciesStart());

            const response = await axios.get(
                `${
                    process.env
                        .NEXT_PUBLIC_CRYPTO_CURRENCIES_RATES_TO_FIAT_CURRENCIES_ENPOINT
                }${cryptoCurrencies
                    .map((cryptoCurrency: TCrypto) => cryptoCurrency.id)
                    .join(",")}&vs_currencies=${allCurrencies.join(",")}`,
            );
            dispatch(
                getCryptoCurrenciesRatesToFiatCurrenciesSuccess(response.data),
            );
        } catch (error) {
            dispatch(
                getCryptoCurrenciesRatesToFiatCurrenciesFailure(
                    error as string,
                ),
            );
        }
    };

export const fetchCryptoCurrenciesToChart =
    (cryptoCurrencyId: string, days: number): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getCryptoCurrenciesToChartStart());

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_CRYPTO_CURRENCIES_CHARTS}${cryptoCurrencyId}/market_chart?vs_currency=usd&days=${days}`,
            );
            dispatch(getCryptoCurrenciesToChartSuccess(response.data));
        } catch (error) {
            dispatch(getCryptoCurrenciesToChartFailure(error as string));
        }
    };

export const fetchCryptoCurrencyData =
    (cryptoCurrencyId: string): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(getCryptoCurrencyDataStart());

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_CRYPTO_CURRENCIES_CHARTS}${cryptoCurrencyId}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`,
            );
            console.log("response data", response.data);
            dispatch(getCryptoCurrencyDataSuccess(response.data));
        } catch (error) {
            dispatch(getCryptoCurrencyDataFailure(error as string));
        }
    };

export const selectCurrencyState = (state: AppState) => state.currency;

export { currencySlice };
