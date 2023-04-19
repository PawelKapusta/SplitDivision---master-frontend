import React from "react";
import { Container, Wrapper, Row, Column, Link, Title } from "./footer.styles";

export type TFooterProps = {
    children?: React.ReactNode;
    href?: string;
};

export default function Footer({ children, ...restProps }: TFooterProps) {
    return <Container {...restProps}>{children}</Container>;
}

Footer.Wrapper = function FooterWrapper({
    children,
    ...restProps
}: TFooterProps) {
    return <Wrapper {...restProps}>{children}</Wrapper>;
};

Footer.Row = function FooterRow({ children, ...restProps }: TFooterProps) {
    return <Row {...restProps}>{children}</Row>;
};

Footer.Column = function FooterColumn({
    children,
    ...restProps
}: TFooterProps) {
    return <Column {...restProps}>{children}</Column>;
};

Footer.Link = function FooterLink({ children, ...restProps }: TFooterProps) {
    return <Link {...restProps}>{children}</Link>;
};

Footer.Title = function FooterTitle({ children, ...restProps }: TFooterProps) {
    return <Title {...restProps}>{children}</Title>;
};
