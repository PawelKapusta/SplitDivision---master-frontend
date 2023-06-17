import Translation from "@components/translation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    BuyPremiumButton,
    MessageForNotPremiumUsers,
    MoreFeaturesSoon,
    SettingRow,
    SettingsPage,
} from "@styles/pages/settings.styles";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import {
    fetchSubscriptions,
    fetchUserSubscriptions,
    selectSubscriptionState,
} from "@redux/slices/subscriptionSlice";
import Spinner from "@components/spinner";
import { selectAuthState } from "@redux/slices/authSlice";
import useAlert from "../hocs/useAlert";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { goToCheckout } from "../checkout";
import { ALL_ACCESS, Subscription } from "../types/subscription";
import { withAuth } from "../hocs/withAuth";

const Settings: NextPage = () => {
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        isLoading,
        subscriptions,
        userSubscription,
        isUserSubscriptionsLoading,
    } = useSelector(selectSubscriptionState);

    const { AlertWrapper } = useAlert();

    useEffect(() => {
        dispatch(fetchSubscriptions());
        dispatch(fetchUserSubscriptions(userId as string));
    }, []);

    const hasFullAccess = (userSubscription: Subscription[]) => {
        return userSubscription.find(
            (subscription: Subscription) => subscription?.type === ALL_ACCESS,
        );
    };
    const hasUserAnySubscriptions =
        userSubscription && userSubscription?.length > 0;
    return (
        <div>
            {isLoading || isUserSubscriptionsLoading ? (
                <Spinner />
            ) : (
                <SettingsPage>
                    <h1>{t("screens.settings.title")}</h1>
                    {hasUserAnySubscriptions &&
                    hasFullAccess(userSubscription) ? (
                        <SettingRow>
                            <Image
                                src="/icons/language-icon.svg"
                                width={40}
                                height={50}
                                alt="Language-icon.svg"
                            />
                            <h3>{t("screens.settings.chooseLanguageText")}</h3>
                            <Translation />
                        </SettingRow>
                    ) : null}
                    {!hasUserAnySubscriptions &&
                    !hasFullAccess(userSubscription) ? (
                        <SettingRow>
                            <Image
                                src="/icons/premium-diamond-icon.svg"
                                width={40}
                                height={50}
                                alt="Premium-diamond--icon.svg"
                            />
                            <h3>{t("screens.settings.buyPremium")}</h3>
                            <BuyPremiumButton
                                onClick={() => {
                                    goToCheckout({
                                        subscriptions: [
                                            {
                                                price: "price_1NHXEpCB01wgibIPiCFpUSzx",
                                                quantity: 1,
                                            },
                                        ],
                                    });
                                }}
                            >
                                <Image
                                    src="/icons/buy-icon.svg"
                                    alt="Buy-premium-icon.svg"
                                    width="30"
                                    height="30"
                                />
                                {t("screens.settings.buttonBuyText")}
                            </BuyPremiumButton>
                        </SettingRow>
                    ) : null}
                    {!hasUserAnySubscriptions &&
                    !hasFullAccess(userSubscription) ? (
                        <SettingRow>
                            <MessageForNotPremiumUsers>
                                {t(
                                    "screens.settings.messageForNotPremiumUsers",
                                )}
                            </MessageForNotPremiumUsers>
                        </SettingRow>
                    ) : null}
                    <MoreFeaturesSoon>
                        {t("screens.settings.moreFeaturesText")}
                    </MoreFeaturesSoon>
                </SettingsPage>
            )}
        </div>
    );
};

export default withAuth(Settings);
