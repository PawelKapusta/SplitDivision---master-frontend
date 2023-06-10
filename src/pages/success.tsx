import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
    createUserSubscription,
    selectSubscriptionState,
} from "@redux/slices/subscriptionSlice";
import { UserSubscriptionFormData } from "../types/subscription";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { NextPage } from "next";
import { SuccessPage, SuccessPageBox } from "@styles/success.styles";
import { useTranslation } from "react-i18next";

const Success: NextPage = (): ReactElement => {
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const {
        isCreateUserSubscriptionLoading,
        createUsersSubscriptionSuccess,
        createUsersSubscriptionError,
    } = useSelector(selectSubscriptionState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const router = useRouter();
    const sessionId = router.query.session_id;
    const dispatch = useDispatch();
    const [isSubscriptionCreated, setSubscriptionCreated] = useState(() => {
        const storedValue = localStorage.getItem("isSubscriptionCreated");
        return sessionId && storedValue === "true";
    });
    const { t } = useTranslation();

    useEffect(() => {
        if (
            sessionId &&
            !createUsersSubscriptionSuccess &&
            !isSubscriptionCreated
        ) {
            const userSubscription: UserSubscriptionFormData = {
                subscription_id:
                    process.env.NEXT_PUBLIC_SUBSCRIPTION_ID_ALL_ACCESS ||
                    "temp_sub_id",
                user_id: userId,
            };
            dispatch(createUserSubscription(userSubscription));
            setSubscriptionCreated(true);
            localStorage.setItem("isSubscriptionCreated", "true");
        }
    }, [sessionId, isSubscriptionCreated]);

    useEffect(() => {
        const removeStorageItem = () => {
            localStorage.removeItem("isSubscriptionCreated");
        };
        window.addEventListener("beforeunload", removeStorageItem);
        return () => {
            window.removeEventListener("beforeunload", removeStorageItem);
            localStorage.removeItem("isSubscriptionCreated");
        };
    }, []);

    useEffect(() => {
        if (createUsersSubscriptionSuccess) {
            const redirectToMAinPAge = setTimeout(() => {
                router.replace("/");
            }, 3000);

            return () => {
                clearTimeout(redirectToMAinPAge);
            };
        }
    }, [createUsersSubscriptionSuccess]);

    return (
        <SuccessPage>
            {isCreateUserSubscriptionLoading ? (
                <SuccessPageBox isPending>
                    <h1>{t("screens.success.pending.title")}</h1>
                    <p>{t("screens.success.pending.description")}</p>
                </SuccessPageBox>
            ) : createUsersSubscriptionError ? (
                <SuccessPageBox isError>
                    <h1>{t("screens.success.error.title")}</h1>
                    <p>{t("screens.success.error.description")}</p>
                </SuccessPageBox>
            ) : (
                <SuccessPageBox>
                    <h1>{t("screens.success.success.title")}</h1>
                    <p>{t("screens.success.success.description")}</p>
                </SuccessPageBox>
            )}
        </SuccessPage>
    );
};

export default Success;
