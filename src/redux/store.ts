import {
    configureStore,
    combineReducers,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { faqSlice } from "@redux/slices/faqSlice";
import { groupSlice } from "@redux/slices/groupSlice";
import { billSlice } from "@redux/slices/billSlice";
import { currencySlice } from "@redux/slices/currencySlice";
import { commentSlice } from "@redux/slices/commentSlice";
import { subscriptionSlice } from "@redux/slices/subscriptionSlice";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [faqSlice.name]: faqSlice.reducer,
    [groupSlice.name]: groupSlice.reducer,
    [billSlice.name]: billSlice.reducer,
    [currencySlice.name]: currencySlice.reducer,
    [commentSlice.name]: commentSlice.reducer,
    [subscriptionSlice.name]: subscriptionSlice.reducer,
});

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

export const makeStore = () => {
    const isServer = typeof window === "undefined";

    if (isServer) {
        return makeConfiguredStore();
    } else {
        const persistConfig = {
            key: "nextjs",
            whitelist: ["auth"],
            storage,
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer);
        const store: any = configureStore({
            reducer: persistedReducer,
            devTools: process.env.NODE_ENV !== "production",
        });

        store.__persistor = persistStore(store);

        return store;
    }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
