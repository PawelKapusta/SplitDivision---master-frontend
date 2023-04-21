import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    palette: {
        common: {
            black: "#222831",
            white: "#ffffff",
        },
        primary: {
            main: "#726a95",
            contrastText: "#ffffff",
        },
        secondary: {
            background: {
                main: "radial-gradient(circle, rgba(92,39,251,1) 0%, rgba(112,71,247,1) 100%)",
            },
            contrastText: "#ffffff",
        },
    },
    colors: {
        primary: "#fff",
        background1: "#0F1624",
        accent1: "hsl(34.9,98.6%,72.9%)",
        button: "hsl(205.1,100%,36.1%)",
        background2: "hsl(232.7,27.3%,23.7%)",
    },
    breakpoints: {
        sm: "screen and (max-width: 640px)",
        md: "screen and (max-width: 768px)",
        lg: "screen and (max-width: 1024px)",
        xl: "screen and (max-width: 1280px)",
    },
};
