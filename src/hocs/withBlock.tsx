import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUser, selectUserState } from "@redux/slices/userSlice";
import Spinner from "@components/spinner";

interface WithBlockProps {
    children: ReactElement | null;
}

const WithBlockComponent: NextPage<WithBlockProps> = ({ children }) => {
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const dispatch = useDispatch();
    const router = useRouter();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { user } = useSelector(selectUserState);

    const exceptionsPathnames = [
        "/auth/login",
        "/auth/register",
        "/",
        "/contact",
        "/calculator",
        "/faq",
        "/settings",
    ];

    useEffect(() => {
        if (
            !isAuthenticated &&
            !exceptionsPathnames.includes(router.pathname)
        ) {
            router.replace("/auth/login");
        } else {
            dispatch(fetchUser(userId));
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (
            user &&
            user.is_blocked &&
            router.pathname !== "/contact" &&
            !exceptionsPathnames.includes(router.pathname)
        ) {
            router.replace("/contact");
        }
    }, [user]);

    if (
        (!isAuthenticated || !user) &&
        !exceptionsPathnames.includes(router.pathname)
    ) {
        return <Spinner />;
    }

    return children;
};

export const withBlock = (PageComponent: NextPage<any>): NextPage<any> => {
    const WrappedComponent: NextPage<WithBlockProps> = (props) => {
        return (
            <WithBlockComponent>
                <PageComponent {...props} />
            </WithBlockComponent>
        );
    };

    WrappedComponent.getInitialProps = async (
        context: NextPageContext,
    ): Promise<WithBlockProps> => {
        const componentProps = PageComponent.getInitialProps
            ? await PageComponent.getInitialProps(context)
            : {};

        return { ...componentProps, children: null };
    };

    return WrappedComponent;
};
