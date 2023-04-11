import React from "react";
import styles from "./index.module.scss";

export type IButton = React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

export const Button: React.FC<IButton> = ({ children, ...props }) => {
    return (
        <a
            {...props}
            target="_blank"
            href="@components/button/index"
            rel="noopener noreferrer"
            className={styles.button}
            data-testid="btn"
        >
            {children}
        </a>
    );
};
