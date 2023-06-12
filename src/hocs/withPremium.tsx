import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { selectUserState } from "@redux/slices/userSlice";
import {
    fetchUserSubscriptions,
    selectSubscriptionState,
} from "@redux/slices/subscriptionSlice";
import { ALL_ACCESS, Subscription } from "../types/subscription";

interface WithPremiumProps {
    children: ReactElement | null;
}

const WithPremiumComponent: NextPage<WithPremiumProps> = ({ children }) => {
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { isLoading, userSubscription, isUserSubscriptionsLoading } =
        useSelector(selectSubscriptionState);
    const dispatch = useDispatch();
    const router = useRouter();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { user } = useSelector(selectUserState);
    useEffect(() => {
        dispatch(fetchUserSubscriptions(userId as string));
    }, [isAuthenticated]);

    const hasFullAccess = (userSubscription: Subscription[]) => {
        return userSubscription.find(
            (subscription: Subscription) => subscription?.type === ALL_ACCESS,
        );
    };

    const hasUserAnySubscriptions =
        userSubscription && userSubscription?.length > 0;

    useEffect(() => {
        if (
            !isUserSubscriptionsLoading &&
            user &&
            userSubscription &&
            !hasFullAccess(userSubscription) &&
            !hasUserAnySubscriptions
        ) {
            router.replace("/");
            return;
        }
    }, [user, userSubscription, hasUserAnySubscriptions]);

    if (!isAuthenticated) {
        router.replace("/auth/login");
        return null;
    }

    return children;
};

export const withPremium = (
    PageComponent: NextPage,
): NextPage<WithPremiumProps> => {
    const WrappedComponent: NextPage<WithPremiumProps> = (props) => {
        return (
            <WithPremiumComponent>
                <PageComponent {...props} />
            </WithPremiumComponent>
        );
    };

    WrappedComponent.getInitialProps = async (
        context: NextPageContext,
    ): Promise<WithPremiumProps> => {
        const componentProps = PageComponent.getInitialProps
            ? await PageComponent.getInitialProps(context)
            : {};

        return { ...componentProps, children: null };
    };

    return WrappedComponent;
};
