import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";

interface WithAuthProps {
    children: ReactElement;
}

const WithAuthComponent: NextPage<WithAuthProps> = ({ children }) => {
    const { isAuthenticated } = useSelector(selectAuthState);
    const router = useRouter();

    if (!isAuthenticated) {
        router.replace("/auth/login");
        return null;
    }

    return children;
};

export const withAuth = (
    PageComponent: NextPage<any>,
): NextPage<WithAuthProps> => {
    const WrappedComponent: NextPage<WithAuthProps> = (props) => {
        return (
            <WithAuthComponent>
                <PageComponent {...props} />
            </WithAuthComponent>
        );
    };

    WrappedComponent.getInitialProps = async (ctx: NextPageContext) => {
        const componentProps = PageComponent.getInitialProps
            ? await PageComponent.getInitialProps(ctx)
            : {};

        return { ...componentProps };
    };

    return WrappedComponent;
};
