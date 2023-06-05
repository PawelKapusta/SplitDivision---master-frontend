import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUser, selectUserState } from "@redux/slices/userSlice";

interface WithAdminProps {
    children: ReactElement;
}

const WithAdminComponent: NextPage<WithAdminProps> = ({ children }) => {
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const dispatch = useDispatch();
    const router = useRouter();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { user } = useSelector(selectUserState);
    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    useEffect(() => {
        if (user && user?.is_admin !== true) {
            router.replace("/");
            return;
        }
    }, [user]);

    if (!isAuthenticated) {
        router.replace("/auth/login");
        return null;
    }

    return children;
};

export const withAdmin = (
    PageComponent: NextPage<any>,
): NextPage<WithAdminProps> => {
    const WrappedComponent: NextPage<WithAdminProps> = (props) => {
        return (
            <WithAdminComponent>
                <PageComponent {...props} />
            </WithAdminComponent>
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
