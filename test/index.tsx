import React, { ReactElement, ReactNode } from "react";
import {
    render as baseRender,
    RenderOptions,
    RenderResult,
} from "@testing-library/react";

import { Provider } from "react-redux";
import store from "@redux/store";

interface RenderProps {
    children?: ReactNode;
}

export const AllTheProviders = ({ children }: RenderProps) => {
    return (
        <>
            <Provider store={store}>{children}</Provider>
        </>
    );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
    baseRender(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

export * from "@testing-library/react";

export { render };
