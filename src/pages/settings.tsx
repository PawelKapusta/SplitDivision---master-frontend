import Translation from "@components/translation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    SettingsPage,
    SettingRow,
    BuyPremiumButton,
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
import { checkout } from "../checkout";

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

    console.log("subscriptions", subscriptions);
    console.log("userSubscription", userSubscription);

    return (
        <div>
            {isLoading || isUserSubscriptionsLoading ? (
                <Spinner />
            ) : (
                <SettingsPage>
                    <h1>{t("screens.settings.title")}</h1>
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
                                checkout({
                                    lineItems: [
                                        {
                                            price: "price_1NHWGSCB01wgibIP6rSWKM8J",
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
                </SettingsPage>
            )}
        </div>
    );
};

export default Settings;
