import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    SubscriptionBoughtStatisticsObj,
    subscriptionsStatistics,
    SubscriptionsStatistics,
    SubscriptionStatisticsObj,
} from "../../types/subscription";
import { useTranslation } from "react-i18next";

export type TSubscriptionsStatisticsProp = {
    subscriptions: SubscriptionStatisticsObj[];
    subscriptionsBought: SubscriptionBoughtStatisticsObj[];
};

const SubscriptionsStatistics = ({
    subscriptions,
    subscriptionsBought,
}: TSubscriptionsStatisticsProp) => {
    const [subscriptionsStatisticsData, setSubscriptionsStatisticsData] =
        useState<SubscriptionsStatistics>(subscriptionsStatistics);
    const { t } = useTranslation();
    useEffect(() => {
        let subscriptionsNumber = 0;
        let subscriptionsBoughtNumber = 0;

        subscriptions.forEach((subscription) => {
            if (subscription) {
                subscriptionsNumber += 1;
            }
        });

        subscriptionsBought.forEach((subscriptionBought) => {
            if (subscriptionBought) {
                subscriptionsBoughtNumber += 1;
            }
        });

        setSubscriptionsStatisticsData({
            subscriptionsNumber: subscriptionsNumber,
            subscriptionsBoughtNumber: subscriptionsBoughtNumber,
        });
    }, []);

    return (
        <StatisticsPageScreens>
            <h1>{t("screens.statistics.components.subscription.title")}</h1>
            <h3>
                {t("screens.statistics.components.subscription.subscriptions")}
                <p>{subscriptionsStatisticsData.subscriptionsNumber}</p>
            </h3>
            <h3>
                {t(
                    "screens.statistics.components.subscription.subscriptionsBought",
                )}
                <p>{subscriptionsStatisticsData.subscriptionsBoughtNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default SubscriptionsStatistics;
